const express = require('express')
import filter from 'lodash/filter'
const each = require('lodash/each')
const isEmpty = require('lodash/isEmpty')
import moment from 'moment'
const RSS = require('rss')
import Post from '../models/Post'
import BlogItem from '../models/BlogItem'
const map = require('lodash/map')
const ContributorsService = require('../../contributors/services/ContributorsService')
const RelatedServices = require('../../related/services/RelatedServices')

const BASE_URL = 'https://dataskeptic.com/'
const NOT_FOUND_ERROR = {
  error: true,
  message: 'Sorry, we could not find that blog post'
}

const ignoredKeys = ['latest', 'guid']
function isIgnoredKey(key) {
  return ignoredKeys.includes(key)
}
function matchingOffset(blog, index, offset) {
  return index >= offset
}

function matchingLimit(blog, index, limit) {
  return index < limit
}
function isMatchingQuery(blog, { url = '', exclude = [], env }) {
  let match = false
  if (!blog) return match

  if (blog['prettyname'].indexOf(url) === 0) {
    match = true
  }

  if (url === '/') {
    for (let ex in exclude) {
      if (blog['prettyname'].indexOf(ex) === 0) {
        match = false
      }
    }
  }

  if (match) {
    match = blog.env === env
  }

  return match
}

function compare(dateTimeA, dateTimeB) {
  const momentA = moment(dateTimeA, 'YYYY-MM-DD')
  const momentB = moment(dateTimeB, 'YYYY-MM-DD')
  if (momentA > momentB) return 1
  else if (momentA < momentB) return -1
  else return 0
}

const extendBlogsWithContributors = blogs => {
  const extendedBlogs = blogs.map(blog => {
    const author = blog.author

    return ContributorsService.getContributorByName(author).then(
      contributor => {
        blog.contributor = contributor
        return blog
      }
    )
  })

  return Promise.all(extendedBlogs)
}

export const getCategories = cache_folders => {
  return new Promise((resolve, reject) => {
    resolve(cache_folders)
  })
}

export const getBlogRss = (blogmetadata_map, prettyname) => {
  let blogs = blogmetadata_map

  blogs = filter(blogs, post => !!post)
  blogs = map(blogs, post => {
    return post
  })

  let feed = new RSS({
    title: 'Data Skeptic',
    description:
      'Data Skeptic is your source for a perspective of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science. Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.',
    feed_url: `${BASE_URL}/api/blog/rss`,
    site_url: BASE_URL,
    managingEditor: 'kyle@dataskeptic.com'
  })

  each(blogs, blog => {
    if (!blog) return

    if (blog.env === 'master') {
      // don't share dev on master
      feed.item(new BlogItem(blog))
    }
  })

  const xml = feed.xml()
  return new Promise((resolve, reject) => {
    resolve(xml)
  })
}

export const getAll = (
  url,
  blogmetadata_map,
  offset,
  limit,
  env,
  exclude = ['/episodes', '/transcripts']
) => {
  env = env === 'prod' ? 'master' : 'dev'

  // remove unnecessary keys
  let blogs = filter(blogmetadata_map, (blog, id) => !isIgnoredKey(id))
  // filter only relative blogs
  blogs = filter(blogs, (blog, id) =>
    isMatchingQuery(blog, { url, exclude, env })
  )

  // calculate total matched blogs count
  const total = blogs.length

  blogs = blogs.sort((a, b) => {
    // custom sort by publish data
    return compare(b['publish_date'], a['publish_date'])
  })

  // slice over limits
  blogs = blogs
    .filter((blog, index) => matchingOffset(blog, index, offset))
    .filter((blog, index) => matchingLimit(blog, index, limit))

  var latestId = ''
  if (Object.keys(blogmetadata_map).length > 0) {
    latestId = blogmetadata_map['latest']['c_hash']
  }

  return Promise.all([extendBlogsWithContributors(blogs)]).then(([posts]) => {
    return new Promise((resolve, reject) => {
      resolve({
        env,
        blogs: posts,
        total,
        latestId
      })
    })
  })
}

const isExist = (blogmetadata_map, prettyName) => !!blogmetadata_map[prettyName]

export const getPost = (
  blogmetadata_map,
  episodes_content,
  prettyName,
  content_map
) => {
  let postData = {}
  let author = ''
  let relative = ''

  let episodeData = {}
  let isEpisode = false
  if (isExist(episodes_content, prettyName)) {
    episodeData = episodes_content[prettyName]
    isEpisode = true
  }

  if (isExist(blogmetadata_map, prettyName)) {
    const post = blogmetadata_map[prettyName]
    author = post['author']

    relative = prettyName
    postData = new Post({
      prettyname: prettyName,

      title: post['title'],
      content: content_map[prettyName] || '',

      isEpisode: isEpisode,

      contributor: post['contributor'],
      related: post['related'],

      rendered: post['rendered'],

      renderedAt: post['last_rendered'],
      publishedAt: post['publish_date'],

      author: post['author'],

      env: post['env'],
      desc: post['desc'],
      ...post
    })
  }

  return Promise.all([
    ContributorsService.getContributorByName(author.toLowerCase()),
    RelatedServices.getRelatedByURI('/blog' + relative.toLowerCase())
  ]).then(([contributor, relative]) => {
    return !isEmpty(postData)
      ? {
          ...postData,
          ...episodeData,
          contributor,
          relative
        }
      : NOT_FOUND_ERROR
  })
}
