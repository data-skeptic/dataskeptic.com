import Immutable from 'immutable';
import each from 'lodash/each';

import {
    LOAD_BLOGS_REQUEST,
    LOAD_BLOGS_SUCCESS,
    LOAD_BLOGS_FAILED,
    LOAD_BLOG_POST_REQUEST,
    LOAD_BLOG_POST_SUCCESS,
    LOAD_BLOG_POST_FAILED,
    STOP_BLOG_LOADING
} from '../Actions/BlogsActions'

const init = {
    pagination: {
        current: 0,
        next: 1,
        prev: 0
    },
    latestId: null,
    total: 0,
    blogs: [],
    folders: [],
    blogs_loaded: 0,
    blog_focus: {blog: undefined, contributor: undefined, loaded: 0, content: "", pathname: ""},
    related: [],
    transcript_map: {},
    env: "prod",  // client/index.jsx will dispatch SET_BLOG_ENVIRONMENT on init

    currentPost: {},
    postLoading: true,
}

const defaultState = Immutable.fromJS(init);

export default function blogsReducer(state = defaultState, action) {
    var nstate = state.toJS()
    switch (action.type) {
        case 'SET_BLOG_ENVIRONMENT':
            nstate.env = action.payload
            break
        case 'CLEAR_FOCUS_BLOG':
            nstate.blog_focus = {blog: undefined, loaded: 0, content: "", contributor: undefined}
            break
        case 'ADD_BLOG':
            // This event is generated by async loads and needs to kick off the content download on success
            var blog = action.payload.blog
            nstate.blog_focus.blog = blog
            break
        case 'SET_FOCUS_BLOG':
            var blog_focus = action.payload.blog_focus
            nstate.blog_focus = blog_focus
            break
        case 'REQUEST_INJECT_BLOG':
            var i = 0
            nstate.blog_focus.loaded = 0
            while (i < nstate.blogs.length) {
                var b = nstate.blogs[i]
                if (b.uri.indexOf('/episodes/') == -1 && b.uri.indexOf('/transcripts/') == -1) {
                    nstate.blog_focus.blog = b
                    nstate.blog_focus.loaded = 1
                    nstate.blog_focus.content = ""
                    var dispatch = action.payload.dispatch
                    setTimeout(function () {
                        getBlogContent(dispatch, b, env)
                    }, 1)
                    i = nstate.blogs.length
                }
                i += 1
            }
            break
        case 'INJECT_BLOG':
            // This event is generated to handle data that was prefetched and just needs to be injected
            var blog = action.payload.blog
            var loaded = 0
            nstate.blog_focus.blog = blog
            nstate.blog_focus.loaded = loaded
            break
        case 'ADD_BLOG_CONTENT':
            var content = action.payload.content
            var nblog = action.payload.blog
            var cblog = nstate.blog_focus.blog
            if (nblog['uri'] == cblog['uri']) {
                nstate.blog_focus.loaded = 1
                nstate.blog_focus.content = action.payload.content
            } else {
                console.log([nblog['uri'], 'does not match', cblog['uri']])
            }
            break
        case 'ADD_RELATED':
            var items = action.payload.items
            var uri = action.payload.uri
            var b = nstate.blog_focus.blog
            // debugger;
            if (b != undefined) {
                var key = '/blog'
                if (uri.indexOf(key) == 0) {
                    uri = uri.substring(key.length, uri.length)
                }
                if (b != undefined && b['prettyname'] == uri) {
                    nstate.related = items
                } else {
                    console.log([b['prettyname'], 'is not ', uri])
                }
            }
            break
        case 'ADD_FOLDERS':
            nstate.folders = action.payload
            break
        case 'ADD_BLOGS':
            nstate.blogs = action.payload.blogs;
            nstate.total = action.payload.total;
            for (var i = 0; i < nstate.blogs.length; i++) {
                var blog = nstate.blogs[i]
                if (blog.guid != undefined && blog.uri.indexOf('/transcripts/') != -1) {
                    nstate.transcript_map[blog.guid] = blog
                }
            }
            break
        case 'SET_BLOGS_LOADED':
            nstate.blogs_loaded = action.payload
            break
        case 'FETCH_BLOGS_ERROR':
            nstate.blogs_loaded = -1
            nstate.blog_focus.loaded = -1
            break
        case 'SET_BLOGS_TOTAL':
            nstate.total = action.payload;
            break;


        // new code
        case LOAD_BLOGS_SUCCESS:
            nstate.blogs = action.payload.blogs;
            nstate.total = action.payload.total;

            each(nstate.blogs, (blog) => {
                if (blog.guid && blog.uri.indexOf('/transcripts/') > -1) {
                    nstate.transcript_map[blog.guid] = blog
                }
            });

            nstate.latestId = action.payload.latestId;
            nstate.blogs_loaded = 1;
            break;

        case LOAD_BLOGS_REQUEST:
            nstate.blogs = [];
            nstate.postLoading = true;
            break;

        case STOP_BLOG_LOADING:
            nstate.postLoading = false;
            break;

        case LOAD_BLOG_POST_SUCCESS:
            nstate.currentPost = action.payload.post;
            nstate.postLoading = false;
            break;

    }

    return Immutable.fromJS(nstate)
}

