import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"
import snserror from '../SnsUtil'
import { load_blogs } from '../daos/serverInit'

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'

const config = require('../../config/config.json');

var base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

const init = {
    "featured_blog": {},
    "latest_episode": {},
    "recent_blogs": [],
    "pending_blogs": [],
    "blog_state": ""
}

const defaultState = Immutable.fromJS(init);

export default function cmsReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'CMS_LOAD_PENDING_BLOGS':
        var url = base_url + "/blog/pending"
        var dispatch = action.payload.dispatch
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
        break
    case 'CMS_LOAD_RECENT_BLOGS':
        var payload = action.payload
        var limit = payload['limit']
        var offset = payload['offset']
        var prefix = payload['prefix']
        var dispatch = payload['dispatch']
        nstate.blog_state = "loading"
        load_blogs(prefix, limit, offset, dispatch)
        break
    case 'CMS_SET_RECENT_BLOGS':
        var blogs = action.payload
        console.log(['bl', blogs.length])
        nstate.blog_state = "loaded"
        nstate.recent_blogs = blogs
        break
    case 'CMS_UPDATE_BLOG':
        var payload = action.payload
        var dispatch = payload.dispatch
        var url = base_url + "/blog/update"
        axios
            .post(url, payload)
            .then(function(result) {
                console.log("success!")
                alert(JSON.stringify(result))
            })
            .catch((err) => {
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_UPDATE_BLOG", errorMsg)
            })
        break
    case 'CMS_SET_HOMEPAGE_FEATURE':
        var payload = action.payload
        console.log(['payload', payload])
        var url = base_url + "/cms/homepage"
        axios
            .post(url, payload)
            .then(function(result) {
                nstate.featured_blog = result['featured_blog']
                var le = result['latest_episode']
                if (le == undefined) {
                    le = {}
                    console.log("ERROR: Latest episode undefined in /cms/homepage")
                }
                nstate.latest_episode = le
            })
            .catch((err) => {
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_SET_HOMEPAGE_FEATURE", errorMsg)
            })
        break;
    case 'CMS_GET_HOMEPAGE_CONTENT':
        console.log('CMS_GET_HOMEPAGE_CONTENT')
        var payload = action.payload
        var dispatch = payload.dispatch
        var url = base_url + "/cms/homepage"
        axios
            .get(url, payload)
            .then(function(result) {
                var data = result['data']
                console.log(data)
                dispatch({type: "CMS_INJECT_HOMEPAGE_CONTENT", payload: data })
            })
            .catch((err) => {
                console.log(err)
                var errorMsg = JSON.stringify(err)
                snserror("CMS_GET_HOMEPAGE_CONTENT", errorMsg)
            })
        break;
    case 'CMS_INJECT_HOMEPAGE_CONTENT':
        var payload = action.payload
        var le = payload['latest_episode']
        var fb = payload['featured_blog']
        console.log(le, fb)
        nstate.latest_episode = le
        nstate.featured_blog = fb
        break;
  }
  return Immutable.fromJS(nstate)
}