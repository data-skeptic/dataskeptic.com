import Immutable from 'immutable';

const init = {
  blogs: [],
  folders: [],
  blogs_loaded: 0,
  env: "prod"
}

const defaultState = Immutable.fromJS(init);

export default function blogsReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'ADD_BLOGS':
      console.log(nstate)
  	  nstate.blogs = action.payload
      break
    case 'SET_BLOGS_LOADED':
  	  nstate.blogs_loaded = action.payload
      break
    case 'FETCH_BLOGS_ERROR':
      console.log(action.payload)
      nstate.blogs_loaded = -1
      break
    case 'SET_FOLDERS':
      nstate.folders = action.payload
      break
  }
  return Immutable.fromJS(nstate)
}

