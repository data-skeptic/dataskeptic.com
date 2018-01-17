import xml2js from 'xml2js'
import axios  from 'axios'
import snserror from '../SnsUtil'

const aws = require('aws-sdk')
const s3 = new aws.S3();

const c = require('../../config/config.json')

const proposalsDocs = new aws.DynamoDB.DocumentClient();

import {convert_items_to_json} from 'daos/episodes'
import {extractFolders} from '../utils/blog_utils'

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
var base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

export function get_contributors() {
    const uri = base_url + "/blog/contributors/list"
    return axios
        .get(uri)
        .then(function (result) {
            const contributors = result.data;
            return contributors;
        })
        .catch((err) => {
            console.log("Could not load products")
            console.log(err)
        })
}

function populate_one(cm, blog) {
    var src_file = blog['src_file']
    var env = ''
    if (global.env != 'prod') {
        env = global.env + '.'
    }
    var bucket = env + "dataskeptic.com"
    var s3key = src_file
    var params = { Bucket: bucket, Key: s3key }
    var prettyname = blog['prettyname']
    s3.getObject(params, function(errr, d) {
        var content = d.Body.toString('utf-8')
        cm[prettyname] = content
    });
    cm[prettyname] = ""
}

export function populate_content_map(blogs, data) {
    var cm = data['content_map']
    var n = blogs.length
    n=4
    for (var i=0; i < n; i++) {
        var blog = blogs[i]
        populate_one(cm, blog)
    }
}

export function get_podcasts_by_guid(dispatch, guid) {
    var my_cache = global.my_cache
    if (my_cache != undefined) {
        var episodes = []
        var allepisodes = get_podcasts_from_cache(my_cache, pathname)
        for (var episode of allepisodes) {
            if (episode.guid == guid) {
                episodes.push(episode)
            }
        }
        dispatch({type: "ADD_EPISODES", payload: episodes})
    } else {
        console.log("Getting episodes")
        axios
            .get("/api/episodes/get/" + guid)
            .then(function(result) {
                var episode = result["data"]
                dispatch({type: "ADD_EPISODES", payload: [episode]})
                dispatch({type: "SET_FOCUS_EPISODE", payload: episode})
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export function load_blogs(prefix, limit, offset, dispatch) {
    var url = base_url + "/blog/list?limit=" + limit + "&offset=" + offset + "&prefix=" + prefix
    console.log("Load blogs: " + url)
    axios
        .get(url)
        .then(function(result) {
            console.log("blog api success")
            console.log(result)
            var blogs = result['data']
            var payload = {blogs, prefix}
            var guids = []
            for (var blog of blogs) {
                if (blog.guid) {
                    guids.push(blog.guid)
                }
            }
            if (guids.length == 1) {
                var guid = guids[0]
                get_podcasts_by_guid(dispatch, guid)
            } else if (guids.length > 1) {
                // TODO: grab them all and do something nice on the blog list page
            }
            dispatch({type: "CMS_SET_RECENT_BLOGS", payload: payload })
        })
        .catch((err) => {
            console.log(err)
            var errorMsg = JSON.stringify(err)
            snserror("load_blogs " + prefix, errorMsg)
            var payload = {"blogs": [], "prefix": prefix}
            dispatch({type: "CMS_SET_RECENT_BLOGS", payload: payload })
        })
}

export function loadEpisodes(env) {
    let data = {
        episodes_map: {},
        episodes_content: {},
        episodes_list: []
    };
    var feed_uri = "http://dataskeptic.libsyn.com/rss"
    var domain = "dataskeptic.com";
    return axios.get(feed_uri)
        .then(function (result) {
            return new Promise((res, rej) => {
                var xml = result["data"];
                var parser = new xml2js.Parser();

                let latestGuid = '';

                parser.parseString(xml, function (err, rss) {
                    var items = rss["rss"]["channel"][0]["item"]
                    var episodes = convert_items_to_json(items)
                    var list = []
                    for (var i = 0; i < episodes.length; i++) {
                        var episode = episodes[i]
                        var link = episode['link']
                        var prettyname = link.replace("http://" + domain, "").replace("https://" + domain, '').replace('.php', '').replace('/blog/', '/')
                        var guid = episode.guid
                        data.episodes_map[guid] = episode
                        data.episodes_content[prettyname] = episode
                        if (episode.img) {
                            episode.img = episode.img.replace("http://", "https://");
                        }
                        list.push(episode.guid)
                    }

                    if (list.length > 0) {
                        var latest = list[0]
                        console.log("Going to inform server of latest guid:" + latest)
                        var url = base_url + "/episodes?latest=" + latest
                        axios
                            .post(url)
                            .then(function(result) {
                                console.log(result.data)
                                // TODO: should we dispatch some action?
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }

                    for (var i = 0; i < list.length; i++) {
                        data.episodes_list.push(list[i])
                    }

                    console.log("Loaded " + episodes.length + " episodes into map")
                })

                res(data, latestGuid);
            })
        })
        .catch((err) => {
            console.log("loadEpisodes error: " + err);
            console.log(err)
        })
}

const RFC_TABLE_NAME = 'rfc';
const LATEST_RFC_ID = 'test-request';

export function loadCurrentRFC() {
    const params = {
        TableName: RFC_TABLE_NAME,
        Key: {
            id: LATEST_RFC_ID
        }
    };

    return new Promise((res, rej) => {
        proposalsDocs.get(params, function(err, data) {
            if (err) {
                rej(err);
            } else {
                res(data['Item']);
            }
        });
    });
}


