import compression               from 'compression';
import express                   from 'express';
import React                     from 'react';
import axios                     from 'axios';
import xml2js                    from 'xml2js';
import { renderToString }        from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from 'routes';
import { Provider }              from 'react-redux';
import * as reducers             from 'reducers';
import promiseMiddleware         from 'lib/promiseMiddleware';
import fetchComponentData        from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';
import getEpisodes               from 'daos/episodes';
import getBlogs                  from 'daos/blogs';
import redirects_map             from './redirects';
import getContentWrapper         from 'utils/content_wrapper';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

var title_map = {}
var content_map = {}
var blogmetadata_map = {}

var env = "dev"

axios
.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + env)
.then(function(result) {
  var blogs = result.data
  for (var i=0; i < blogs.length; i++) {
    var blog = blogs[i]
    var pn = blog['prettyname']
    blogmetadata_map[pn] = blog
    var title = blog['title']
    title_map[pn] = title
    generate_content_map(blog)
  }
  console.log("Loaded all blogs into content_map")
})
.catch((err) => {
  console.log("bblogs error")
  console.log(err)
})

function generate_content_map(blog) {
  var pn = blog['prettyname']
  var envv = env + "."
  if (env == "prod") {
    envv = ""
  }
  var key = blog["rendered"]
  var pn = blog["prettyname"]
  var uri = "https://s3.amazonaws.com/" + envv + 'dataskeptic.com/' + key
  axios.get(uri).then(function(result) {
    var content = result.data
    content_map[pn] = content
  })
  .catch((err) => {
    console.log("Content cache error trying to store blog content")
    console.log(err)
  })
}

global.title_map = title_map
global.content_map = content_map
global.blogmetadata_map = blogmetadata_map

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(compression({filter: shouldCompress}))

app.use(express.static(path.join(__dirname, 'public')));

app.use( (req, res) => {
  var redir = redirects_map['redirects_map'][req.url]
  var hostname = req.headers.host
  if (redir != undefined) {
    console.log("Redirecting to " + hostname + redir)
    return res.redirect(301, 'http://' + hostname + redir)
  }
  if (req.url == '/feed.rss') {
    return res.redirect(307, 'http://dataskeptic.libsyn.com/rss')
  }

  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  const initialState = store.getState()
  var oepisodes = initialState.episodes.toJS()
  var oblogs = initialState.blogs.toJS()
  var osite = initialState.site.toJS()

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps) {
      var title = "Page not found"
      var componentHTML = "<div><h1>Not Found</h1></div>"
      var HTML = getContentWrapper(title, initialState, "", componentHTML)
      var pathname = location.pathname
      console.log("page not found:" + pathname)
      //console.log(HTML)
      return res.status(404).end(componentHTML);
    } else {
      console.log("render props")
      //console.log(renderProps)
      console.log("---------------------")
      console.log(renderProps.params)
    }

    function renderView() {
      var pathname = location.pathname.substring('/blog'.length, location.pathname.length)
      var content = content_map[pathname]
      var dispatch = store.dispatch
      if (content == undefined) {
        content = ""
        console.log("Did not pull content from cache")
      } else {
        console.log("Pulled content from cache")
      }
      var metadata = blogmetadata_map[pathname]
      if (metadata == undefined) {
        metadata = {}
        console.log("Did not pull metadata from cache")
      } else {
        console.log("Pulled metadata from cache")
      }

      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      var title = osite.title + ":"+location.pathname
      var alt_title = title_map[pathname]
      if (alt_title != undefined) {
        title = alt_title
      }

      const componentHTML = renderToString(InitialView)

      const HTML = getContentWrapper(title, initialState, componentHTML, content, metadata)
      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.status(200).end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
