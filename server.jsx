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
import getBlogs                  from 'daos/blogs';
import redirects_map             from './redirects';
import getContentWrapper         from 'utils/content_wrapper';
import { getEpisodes,
        convert_items_to_json, 
         feed_uri }              from 'daos/episodes'


const app = express();

var env = "prod"

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
  env = "dev"
}
console.log("Environment: ", env)

var title_map = {}         // `uri`             -> <title>
var content_map = {}       // `uri`             -> {s3 blog content}
var blogmetadata_map = {}  // `uri`             -> {blog}
var episodes_map = {}      // `guid` | 'latest' -> {episode}

axios
.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/" + env + "/blogs?env=" + env)
.then(function(result) {
  var blogs = result.data
  for (var i=0; i < blogs.length; i++) {
    var blog = blogs[i]
    var pn = blog['prettyname']
    blogmetadata_map[pn] = blog
    if (i == 0) {
      blogmetadata_map["latest"] = blog
    }
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

axios
  .get(feed_uri)
  .then(function(result) {
    var xml = result["data"]
    var parser = new xml2js.Parser()

    parser.parseString(xml, function(err,rss) {
      var items = rss["rss"]["channel"][0]["item"]
      var episodes = convert_items_to_json(items)
      for (var i=0; i < episodes.length; i++) {
        var episode = episodes[i]
        episodes_map[episode.guid] = episode
        if (i == 0) {
          episodes_map["latest"] = episode
        }
      }
      console.log("Loaded all episodes into map")
  })
})
.catch((err) => {
  console.log("feed error")
  console.log(err)
})      

global.title_map        = title_map
global.content_map      = content_map
global.blogmetadata_map = blogmetadata_map
global.episodes_map     = episodes_map

if (process.env.NODE_ENV == 'production') {
  function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
  }
  app.use(compression({filter: shouldCompress}))
}

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
  var oblogs    = initialState.blogs.toJS()
  var osite     = initialState.site.toJS()

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps) {
      var title = "Page not found"
      var componentHTML = "<div><h1>Not Found</h1></div>"

      var injects = {
        "react-view" : componentHTML
      }

      var HTML = getContentWrapper(title, initialState, injects)
      var pathname = location.pathname
      console.log("page not found:" + pathname)
      //console.log(HTML)
      return res.status(404).end(componentHTML);
    } else {
      console.log("render props")
      //console.log(renderProps)
      console.log("---------------------=")
      console.log(renderProps.params)
    }

    function renderView() {
      var pathname = location.pathname.substring('/blog'.length, location.pathname.length)
      console.log("render: " + pathname)
      var content = content_map[pathname]
      var dispatch = store.dispatch
      if (content == undefined) {
        content = ""
        console.log(pathname + ": did not pull content from cache")
      } else {
        console.log(pathname + ": pulled content from cache")
      }

      var blog_page = pathname
      if (pathname == "" || pathname == "/") {
        blog_page = "latest"
      }
      var blog_metadata = blogmetadata_map[blog_page]
      var guid = ""
      if (blog_metadata == undefined) {
        blog_metadata = {}
        console.log(pathname + ": did not pull blog metadata from cache")
      } else {
        console.log(pathname + ": pulled blog metadata from cache")
        guid = blog_metadata.guid
      }

      if (pathname == "" || pathname == "/") {
        guid = "latest"
        console.log("get latest episode")
      }
      var episode_metadata = episodes_map[guid]
      if (episode_metadata == undefined) {
        episode_metadata = {}
        console.log(pathname + ": did not pull episode metadata from cache")
      } else {
        console.log(pathname + ": pulled episode metadata from cache")
      }

      const InitialView = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );

      var title = osite.title + ":" + location.pathname
      var alt_title = title_map[pathname]
      if (alt_title != undefined) {
        title = alt_title
      }

      const componentHTML = renderToString(InitialView)

      var injects = {
        "react-view"                : componentHTML,
        "content-prefetch"          : content,
        "blog-metadata-prefetch"    : JSON.stringify(blog_metadata),
        "episode-metadata-prefetch" : JSON.stringify(episode_metadata)
      }

      const HTML = getContentWrapper(title, initialState, injects)
      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.status(200).end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
