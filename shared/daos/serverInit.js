import xml2js from 'xml2js'
import axios from 'axios'

const aws = require('aws-sdk')
const s3 = new aws.S3()

const proposalsDocs = new aws.DynamoDB.DocumentClient()

const baseapi = process.env.BASE_API || 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/prod'

import { convert_items_to_json } from './episodes'

export function get_contributors() {
  console.log('-[Refreshing Contributors]-')
  const uri = baseapi + '/blog/contributors/list'
  return axios
    .get(uri)
    .then(function(result) {
      const contributors = result.data
      return contributors
    })
    .catch(err => {
      console.log('Could not load contributors')
      console.log(err)
    })
}

function populate_one(cm, blog) {
  var src_file = blog['src_file']
  var env = ''
  if (global.env != 'prod') {
    env = global.env + '.'
  }
  var bucket = env + 'dataskeptic.com'
  var s3key = src_file
  var params = { Bucket: bucket, Key: s3key }
  var prettyname = blog['prettyname']
  s3.getObject(params, function(errr, d) {
    var content = d.Body.toString('utf-8')
    cm[prettyname] = content
  })
  cm[prettyname] = ''
}

export function populate_content_map(blogs, data) {
  var cm = data['content_map']
  var n = blogs.length
  n = 4
  for (var i = 0; i < n; i++) {
    var blog = blogs[i]
    populate_one(cm, blog)
  }
}

export function get_podcasts_by_guid(dispatch, guid) {
    axios
      .get(baseapi + '/podcast/episodes/get?guid=' + guid)
      .then(function(result) {
        console.log('Return of ' + guid)
        var episode = result['data']
        dispatch({ type: 'ADD_EPISODES', payload: [episode] })
      })
      .catch(err => {
        console.log(err)
      })
}
export function load_blogs(prefix, limit, offset, dispatch) {
  var url =
    baseapi +
    '/blog/list?limit=' +
    limit +
    '&offset=' +
    offset +
    '&prefix=' +
    prefix
  axios
    .get(url)
    .then(function(result) {
      var blogs = result['data']
      var guids = []
      for (var blog of blogs) {
        if (blog.guid) {
          guids.push(blog.guid)
        }
      }
      if (blogs.length == 1) {
        var src_file = blogs[0]['src_file']
        var payload = { src_file, dispatch }
        dispatch({ type: 'CMS_LOAD_BLOG_CONTENT', payload: payload })
      }
      if (guids.length == 1) {
        var guid = guids[0]
        get_podcasts_by_guid(dispatch, guid)
      } else if (guids.length > 1) {
        // TODO: grab them all and do something nice on the blog list page
      }
      var payload = { blogs, prefix }
      dispatch({ type: 'CMS_SET_RECENT_BLOGS', payload: payload })
    })
    .catch(err => {
      console.log(err)
      var errorMsg = JSON.stringify(err)
      var payload = { blogs: [], prefix: prefix }
      dispatch({ type: 'CMS_SET_RECENT_BLOGS', payload: payload })
    })
}

function get_member_feed_replacements() {
  var url = baseapi + '/members/feedreplacements/list'
  return axios
    .get(url)
    .then(function(result) {
      var replacements = result['data']
      return replacements
    })
    .catch(err => {
      console.log(`get_member_feed_replacements ERROR:`)
      console.error(err)
    })
}

export function loadYearRange() {

  var url = baseapi + '/podcast/episodes/range'
  return axios
    .get(url)
    .then(function(result) {
      var yearRanges = result['data']
      return yearRanges
    })
    .catch(err => {
      console.log(`loadYearRange ERROR:`)
      console.error(err)
    })
  
}
export async function loadEpisodes() {
  console.log('-[Refreshing episodes]-')
  var feed_uri = 'http://dataskeptic.libsyn.com/rss'
  var replacements = []

  try {
    replacements = await get_member_feed_replacements()
  } catch (err) {}

  return get_and_process_feed(replacements, feed_uri)
}

function xml_to_list(xml) {
  var parser = new xml2js.Parser()
  var domain = 'dataskeptic.com'

  var episodes_map = {}
  var episodes_blog_map = {}
  var episodes_content = {}
  var episodes_list = []
  var member_feed =
    '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:cc="http://web.resource.org/cc/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"></rss>'
  var guid_to_media_link = {}
  parser.parseString(xml, function(err, rss) {
    if (err) {
      console.log('Error on rss')
      console.log(err)
    } else {
      var items = rss['rss']['channel'][0]['item']
      var episodes = convert_items_to_json(items)
      for (var i = 0; i < episodes.length; i++) {
        var episode = episodes[i]
        episode.img = episode.img.replace('http://', 'https://')
        episode.mp3 = episode.mp3.replace('http://', 'https://')
        var link = episode['link']
        var prettyname = link
          .replace('http://' + domain, '')
          .replace('https://' + domain, '')
          .replace('.php', '')
          .replace('/blog/', '/')
        var guid = episode.guid
        guid_to_media_link[guid] = link
        episodes_map[guid] = episode
        episodes_content[prettyname] = episode
        episodes_list.push(episode.guid)
      }
    }
  })

  return {
    episodes_map,
    episodes_blog_map,
    episodes_content,
    episodes_list,
    member_feed,
    guid_to_media_link
  }
}

const getEpisodesData = guids => {
  const uri = baseapi + '/api/episodes/get'
  return axios.post(uri, { guids }).then(res => res.data)
}

function get_and_process_feed(replacements, feed_uri) {
  return axios
    .get(feed_uri)
    .then(function(result) {
      var xml = result['data']
      var data = xml_to_list(xml)
      var mxml = xml
      for (var replacement of replacements) {
        var guid = replacement['guid']
        var member_link = replacement['member_link']
        if (guid in data.guid_to_media_link) {
          var pub = data.guid_to_media_link[guid]
          mxml = mxml.replace(pub, member_link)
        } else {
          console.log('Error: unlinkable GUID: ' + guid)
        }
      }
      data.member_feed = mxml
      /*
             *  We need to tell the server what the latest GUID (Libsyn's unique)
             *  identifier observed is.  The server will know what to do with it.
             *  We will call redundantly many times, but in order to keep things
             *  more memoryless, the site blindly informs the server of the latest
             *  every so often.
             */
      if (data.episodes_list.length > 0) {
        var latest = data.episodes_list[0]
        console.log('Going to inform server of latest guid:' + latest)
        var url = baseapi + '/episodes?latest=' + latest
        axios
          .post(url)
          .then(function(result) {
            // TODO: should we dispatch some action?
          })
          .catch(err => {
            console.log(err)
          })
      }
      console.log('Loaded ' + data.episodes_list.length + ' episodes into map')
      return data
    })
    .then(data => {
      return getEpisodesData(data.episodes_list)
        .then(episodesData => {
          episodesData.forEach(episodeData => {
            const episode = {
              ...data.episodes_map[episodeData.guid],
              ...episodeData
            }

            data.episodes_map[episodeData.guid] = episode
            data.episodes_blog_map[episodeData.blog_id] = episode
          })
        })
        .then(() => data)
    })
    .catch(err => {
      console.log('ERROR fetching RSS feed')
      console.log('loadEpisodes error: ' + err)
      console.log(err)
      var episodes_map = {}
      var episodes_blog_map = {}
      var episodes_list = []
      var episodes_content = {}
      var member_feed = undefined
      return {
        episodes_map,
        episodes_blog_map,
        episodes_list,
        episodes_content,
        member_feed
      }
    })
}

const RFC_TABLE_NAME = 'rfc'
const LATEST_RFC_ID = 'test-request'

export function loadCurrentRFC() {
  console.log('-[Refreshing RFC]-')
  return new Promise((res, rej) => {
      res({})
  })
}

export function loadProducts() {
  console.log('-[Refreshing products]-')
  var url = baseapi + '/store/products/list'

  return axios
    .get(url)
    .then(function(result) {
      var products = result['data']['Items']

      return products
    })
    .catch(err => {
      console.error(err)
    })
}

export function apiMemberFeed(req, res, feed) {
  console.log(feed.length)
  res.status(200).end(feed)
}
