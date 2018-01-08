import Immutable from 'immutable';
import each from 'lodash/each';

const init = {
    blogs: [],
    folders: []
};

const defaultState = Immutable.fromJS(init);

export default function blogsReducer(state = defaultState, action) {
    var nstate = state.toJS()
    switch (action.type) {
        case 'ADD_BLOG_CONTENT':
            var content = action.payload.content
            var nblog = action.payload.blog
            var cblog = nstate.blog_focus.blog
            if (nblog['uri'] == cblog['uri']) {
                nstate.blog_focus.loaded = 1
                nstate.blog_focus.content = action.payload.content
                nstate.blog_focus.postLoading = false;
            } else {
                console.log([nblog['uri'], 'does not match', cblog['uri']])
            }
            nstate.postLoading = false;
            nstate.currentPost = nblog;
            nstate.currentPost.content = content

            break
        case 'ADD_FOLDERS':
            nstate.folders = action.payload
            break
        case 'ADD_BLOGS':
            nstate.blogs = action.payload.blogs;
            nstate.total = action.payload.total;
            nstate.content_map = action.payload.content_map;
            for (var i = 0; i < nstate.blogs.length; i++) {
                var blog = nstate.blogs[i]
                var pn = blog['prettyname']
                if (blog.guid != undefined && pn.indexOf('/transcripts/') != -1) {
                    //nstate.transcript_map[blog.guid] = blog
                }
            }
            break

/*
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
        case REMOVE_FOCUS_POST:
        case LOAD_BLOG_POST_REQUEST:
            nstate.postLoading = true;
            nstate.currentPost = {}
            break;

        case LOAD_BLOG_POST_SUCCESS:
            nstate.postLoading = false;
            nstate.blog_focus.blog = action.payload.post
            nstate.currentPost = action.payload.post;
            break;

        case LOAD_BLOG_POST_FAILED:
            nstate.currentPost = {
                error: action.payload.error
            };

            nstate.postLoading = false;
            break;
*/
    }

    return Immutable.fromJS(nstate)
}
