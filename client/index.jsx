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
  //console.log("action fired", action)
  next(action)
}

var rs = localStorage.getItem('reduxState')
if (rs != undefined) {
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

var env = "dev"
var country = "us"
var player = {episode: undefined, is_playing: false, has_shown: false}

store.dispatch({type: "SET_BLOG_ENVIRONMENT", payload: env })
store.dispatch({type: "SET_COUNTRY", payload: country })
store.dispatch({type: "INITIALIZE_PLAYER", payload: player})

getEpisodes(store)
getBlogs(store, env)
getProducts(store)

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


/*
  HARD
  Connect GA in index.jsx
  disqus
  Environment parameter
  deploy / hosting
  server side regular refresh for new content
  
  EASY
  /l/snl-impact content
  Sidebar layout is ugly
  crypto episode notes /bf

  LAUNCH
  Change domain
  Verify GA
  Double check Stripe Live
  feeds.rss manual until automated
*/

/*
FIX NEXT
mathjax http://localhost:8080/blog/episodes/2014/bayesian-updating
z-scores script in show notes broken
transcripts linked from episode
404 handling / missing pages
favicon
replace keys / invalidate them
get keys from env (lambda_function)
travis-ci deploy
if #content-view populated, don't retrieve it
Spinning logo on waiting for file download in all relevant buttons, not use bar



*/





/*
LATER
  99% invisible for download
  BLOG author images
  Guest profile pages
  dynamically update title on page load
  https
  Chat room with video so i can go live randomly whenever i want and talk about live stuff like elections
  admin page to update blog content - add tags, release date, author, prettyname, title, tags
  Why need address pop up
  Set 1 hour callback to refresh localStorage, find new episodes
  error page logging to cloudfront
  unique <title>
  anscombe's quartet show image
  Using Data to Help Those in Crisis show image
  realtime refresh?
  Leave voice mail on the site
  Embed script for episode
  https://www.npmjs.com/package/react-telephone-input
  t-shirt integration
  rate content level - beginner, intermedia, advanced
  Blog categories

  Search
  Realted content
  migrate resources.php to blog
  blog admin ui
  chatbot
  rate content 1-5 by level of diffculty
  advertiser page
  press / bio page
  guest login
  guest directory
  undue removed from cart
*/
