import Immutable from 'immutable'
import each from 'lodash/each'

const init = {
  blogs: [],
  folders: []
}

const defaultState = Immutable.fromJS(init)

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
        nstate.blog_focus.postLoading = false
      } else {
        console.log([nblog['uri'], 'does not match', cblog['uri']])
      }
      nstate.postLoading = false
      nstate.currentPost = nblog
      nstate.currentPost.content = content

      break
    case 'ADD_FOLDERS':
      nstate.folders = action.payload
      break
    case 'ADD_BLOGS':
      nstate.blogs = action.payload.blogs
      nstate.total = action.payload.total
      nstate.content_map = action.payload.content_map
      for (var i = 0; i < nstate.blogs.length; i++) {
        var blog = nstate.blogs[i]
        var pn = blog['prettyname']
        if (blog.guid != undefined && pn.indexOf('/transcripts/') != -1) {
          //nstate.transcript_map[blog.guid] = blog
        }
      }
      break
  }

  return Immutable.fromJS(nstate)
}
