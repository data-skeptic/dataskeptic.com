import Immutable from 'immutable';

import getBlog from 'daos/getBlog';

const init = {
  blogs: [],
  folders: [],
  blogs_loaded: 0,
  blog_focus: {loaded: 0},
  env: "prod"
}

const defaultState = Immutable.fromJS(init);

export default function blogsReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'ADD_BLOG':
      console.log("TODO: add this to cache")
      console.log(action.payload)
      nstate.blog_focus = action.payload
      break
    case 'LOAD_BLOG':
      var dispatch = action.payload.dispatch
      var prettyname = action.payload.pathname
      console.log("Load blog " + prettyname)
      getBlog(dispatch, nstate.env, prettyname)
      break
    case 'ADD_BLOGS':
      console.log(nstate)
  	  nstate.blogs = action.payload
      break
    case 'SET_BLOGS_LOADED':
  	  nstate.blogs_loaded = action.payload
      break
    case 'FETCH_BLOGS_ERROR':
      nstate.blogs_loaded = -1
      nstate.blog_focus.loaded = -1
      break
    case 'SET_FOLDERS':
      nstate.folders = action.payload
      break
  }
  return Immutable.fromJS(nstate)
}

