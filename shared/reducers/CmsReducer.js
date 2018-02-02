import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"
import snserror from '../SnsUtil'
import { load_blogs } from '../daos/serverInit'
const aws = require('aws-sdk')

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'

const config = require('../../config/config.json');

var base_url = config[env]['base_api'] + env

const init = {
    "home_loaded": false,
    "featured_blog_state": "",
    "featured_blog": {},
    "featured_blog2": {},
    "featured_blog3": {},
    "latest_episode": {},
    "recent_blogs": [],
    "recent_blogs_loaded": false,
    "loaded_prettyname": "",
    "pending_blogs": [],
    "pending_blogs_loaded": false,
    "blog_state": "",
    "blog_content": {}
}

const defaultState = Immutable.fromJS(init);

const s3 = new aws.S3()

const getEpisode = async (guid) => {
    console.log("h1:" + guid)
    const [episodeContent, episodeData] = await Promise.all([
        axios.get(`/api/episodes/get/${guid}`).then((res) => res.data),
        axios.get(`${base_url}/blog/list?guid=${guid}`).then((res) => res.data[0])
    ])
    console.log("h2")
    return {
        ...episodeContent,
        ...episodeData
    }
}

export default function cmsReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'CMS_LOAD_BLOG_CONTENT':
        var dispatch = action.payload.dispatch
        var src_file = action.payload.src_file
        var check = nstate.blog_content[src_file]
        if (check == undefined) {
            nstate.blog_state = "loading"
            var envp = ""
            if (env != "prod") {
                envp = env + "."
            }
            var bucket = envp + "dataskeptic.com"
            var s3key = src_file
            var params = { Bucket: bucket, Key: s3key }
            s3.getObject(params, function(err, d) {
                if (err) {
                    console.log("Can't retrieve blog")
                    console.log(err)
                } else {
                    var content = d.Body.toString('utf-8')
                    var payload = { src_file, content }
                    dispatch({type: "CMS_ADD_BLOG_CONTENT", payload })                    
                }
            });
        } else {
            nstate.blog_state = "loaded"
            console.log("Blog already in cache")
        }
        break
    case 'CMS_EXPIRE_ALL_CONTENT':
        nstate.blog_content = {}
        break
    case 'CMS_ADD_BLOG_CONTENT':
        var src_file = action.payload.src_file
        var content = action.payload.content
        nstate.blog_content[src_file] = content
        nstate.blog_state = "loaded"
        break
    case 'CMS_LOAD_PENDING_BLOGS':
        var url = base_url + "/blog/pending"
        var dispatch = action.payload.dispatch
        nstate.pending_blogs_loaded = false
        axios
            .get(url)
            .then(function(result) {
                dispatch({type: "CMS_SET_PENDING_BLOGS", payload: result['data'] })
            })
            .catch((err) => {
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_LOAD_PENDING_BLOGS", errorMsg)
                dispatch({type: "CMS_SET_PENDING_BLOGS", payload: [] })
            })
        break
    case 'CMS_SET_PENDING_BLOGS':
        var blogs = action.payload
        nstate.pending_blogs = blogs
        nstate.pending_blogs_loaded = true
        break
    case 'CMS_LOAD_RECENT_BLOGS':
        var payload = action.payload
        var limit = payload['limit']
        var offset = payload['offset']
        var prefix = payload['prefix']
        var dispatch = payload['dispatch']
        nstate.blog_state = "loading"
        nstate.recent_blogs_loaded = false
        load_blogs(prefix, limit, offset, dispatch)
        break
    case 'CMS_SET_RECENT_BLOGS':
        var blogs = action.payload.blogs
        var prefix = action.payload.prefix
        nstate.blog_state = "loaded"
        nstate.recent_blogs = blogs
        nstate.recent_blogs_loaded = true
        nstate.loaded_prettyname = prefix
        break
    case 'CMS_UPDATE_BLOG':
        var payload = action.payload
        var dispatch = payload.dispatch
        //payload['title'] = payload['title']
        //payload['abstract'] = payload['abstract']
        var url = base_url + "/blog/update"
        axios
            .post(url, payload)
            .then(function(result) {
                console.log("success!!!")
                var data = result['data']
                var error = data['error']
                if (error) {
                    alert("ERROR:  " + JSON.stringify(result))
                } else {
                    alert("SUCCESS:  " + JSON.stringify(result))
                }
            })
            .catch((err) => {
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_UPDATE_BLOG", errorMsg)
            })
        break
    case 'CMS_SET_HOMEPAGE_FEATURE':
        nstate.featured_blog_state = "submit"
        var blog_id = nstate.featured_blog.blog_id
        var featured_2_blog_id = nstate.featured_blog2.blog_id
        var featured_3_blog_id = nstate.featured_blog3.blog_id
        var payload = {
            blog_id,
            featured_2_blog_id,
            featured_3_blog_id
        }
        var url = base_url + "/cms/homepage"
        axios
            .post(url, payload)
            .then(function(result) {
                action.payload.dispatch({type: 'CMS_SET_HOMEPAGE_FEATURE_SUCCESS'})
                var le = result['latest_episode']
                if (le == undefined) {
                    le = {}
                    console.log("ERROR: Latest episode undefined in /cms/homepage")
                }
            })
            .catch((err) => {
                action.payload.dispatch({type: 'CMS_SET_HOMEPAGE_FEATURE_FAIL'})
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_SET_HOMEPAGE_FEATURE", errorMsg)
            })
        break;
    case 'CMS_SET_HOMEPAGE_FEATURE_SUCCESS':
        nstate.featured_blog_state = "success"
        break;
    case 'CMS_SET_HOMEPAGE_FEATURE_FAIL':
        nstate.featured_blog_state = "error"
        break;
    case 'CMS_UPDATE_HOMEPAGE_FEATURE':
        var payload = action.payload
        var f = payload.f
        var val = payload.val
        nstate[f]['blog_id'] = val
        break;
    case 'CMS_GET_HOMEPAGE_CONTENT':
        var payload = action.payload
        var dispatch = payload.dispatch
        var url = base_url + "/cms/homepage"
        axios
            .get(url, payload)
            .then(function(result) {
                var data = result['data']
                dispatch({type: "CMS_INJECT_HOMEPAGE_CONTENT", payload: {data, dispatch} })
            })
            .catch((err) => {
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_GET_HOMEPAGE_CONTENT", errorMsg)
            })
        break;
    case 'CMS_INJECT_HOMEPAGE_CONTENT':
        var payload = action.payload
        var data = payload.data
        var dispatch = payload.dispatch
        var le = data['latest_episode']
        var fb = data['featured_blog']
        var fb2 = data['featured_2']
        var fb3 = data['featured_3']
        nstate.latest_episode = le
        nstate.featured_blog = fb
        nstate.featured_blog2 = fb2
        nstate.featured_blog3 = fb3
        nstate.home_loaded = true

        getEpisode(le.guid)
            .then((episode) => {
                dispatch({type: "ADD_EPISODES", payload: [episode]})
            })
            .catch((err) => {
                console.log("Caught in CmsReducer")
                console.log(err)
            })
        break;
  }
  return Immutable.fromJS(nstate)
}