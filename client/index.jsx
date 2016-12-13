import React                from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux';
import * as reducers        from 'reducers';
import getEpisodes          from 'daos/episodes';
import getBlogs             from 'daos/blogs';
import getProducts          from 'daos/products';
import routes               from 'routes';
import Immutable            from 'immutable';
import thunk                from 'redux-thunk';
import promiseMiddleware    from 'lib/promiseMiddleware';
import immutifyState        from 'lib/immutifyState';
import { createStore,
         combineReducers,
         applyMiddleware }  from 'redux';


var initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);

const logger = (store) => (next) => (action) => {
  console.log("action fired", action)
  next(action)
}

var rs = localStorage.getItem('reduxState')
if (rs != undefined) {
  console.log("Reloading state")
  var state = JSON.parse(rs)
  var nstate = {}
  var keys = Object.keys(state)
  for (var i=0; i < keys.length; i++) {
    var key = keys[i]
    var val = state[key]
    if (key == 'episodes') {
      val.pubDate = new Date(val.pubDate)
    }
    if (key == 'cart') {
      val.stripeLoading = false
      val.stripeLoadingError = false
      val.submitDisabled = false
      val.paymentError = ""
      val.paymentComplete = false
    }
    nstate[key] = Immutable.fromJS(val)
  }
  console.log("Reloaded saved state")
  initialState = nstate
}
const store = applyMiddleware(logger,thunk,promiseMiddleware)(createStore)(reducer, initialState);

var content_prefetch = document.getElementById('content-prefetch')
var content = content_prefetch.innerHTML
if (content != undefined) {
  store.dispatch({type: "ADD_BLOG_CONTENT", payload: {content} })
}
var metadata_prefetch = document.getElementById('metadata-prefetch')
var metadata = metadata_prefetch.innerHTML
if (metadata != undefined) {
  var blog = JSON.parse(metadata)
  store.dispatch({type: "INJECT_BLOG", payload: {blog} })
}

var env = "dev"
var country = "us"
var player = {episode: undefined, is_playing: false, has_shown: false}

store.dispatch({type: "SET_BLOG_ENVIRONMENT", payload: env })
store.dispatch({type: "SET_COUNTRY", payload: country })
store.dispatch({type: "INITIALIZE_PLAYER", payload: player})

setTimeout(function() {
  getEpisodes(store)
  getBlogs(store, env)
  getProducts(store, env)
}, 500)


store.subscribe(() => {
  //console.log("store changed", store.getState())
})

store.subscribe(()=>{
  var state = store.getState()
  var nstate = {}
  var keys = Object.keys(state)
  for (var i=0; i < keys.length; i++) {
    var key = keys[i]
    var val = state[key]
    nstate[key] = val.toJS()
    if (key == "player") {
      nstate[key].is_playing = false
    }
  }
  var s = JSON.stringify(state)
  localStorage.setItem('reduxState', s)
})

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
