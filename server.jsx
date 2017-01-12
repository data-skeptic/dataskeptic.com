import aws                       from 'aws-sdk'
import axios                     from 'axios';
import bodyParser                from 'body-parser'
import compression               from 'compression';
import getBlogs                  from 'daos/blogs';
import { feed_uri }              from 'daos/episodes'
import { loadBlogs,
         loadEpisodes }          from 'daos/serverInit'
import express                   from 'express';
import createLocation            from 'history/lib/createLocation';
import promiseMiddleware         from 'lib/promiseMiddleware';
import fetchComponentData        from 'lib/fetchComponentData';
import path                      from 'path';
import React                     from 'react';
import { renderToString }        from 'react-dom/server';
import { Provider }              from 'react-redux';
import { RoutingContext, match } from 'react-router';
import routes                    from 'routes';
import * as reducers             from 'reducers';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import getContentWrapper         from 'utils/content_wrapper';
import redirects_map             from './redirects';

const app = express();

var env = "prod"

aws.config.loadFromPath('config.json');

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
  env = "dev"
}
console.log("Environment: ", env)

var title_map = {}         // `uri`             -> <title>
var content_map = {}       // `uri`             -> {s3 blog content}
var blogmetadata_map = {}  // `uri`             -> {blog}
var episodes_map = {}      // `guid` | 'latest' -> {episode}


loadBlogs(env, blogmetadata_map, title_map, content_map)
loadEpisodes(env, feed_uri, episodes_map)

setInterval(function() {
  console.log("---[Refreshing cache]------------------")
  console.log(process.memoryUsage())
  var env = global.env
  var title_map = global.title_map
  var blogmetadata_map = global.blogmetadata_map
  var episodes_map = global.episodes_map
  var content_map = global.content_map
  loadBlogs(env, blogmetadata_map, title_map, content_map)
  loadEpisodes(env, feed_uri, episodes_map)
}, 5 * 60 * 1000)

global.env              = env
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

var stripe_key = "sk_test_81PZIV6UfHDlapSAkn18bmQi"

var fs = require("fs")
fs.open("stripe.json", "r", function(error, fd) {
  var buffer = new Buffer(10000)
  fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
    var data = buffer.toString("utf8", 0, bytesRead)
    var c = JSON.parse(data)
    var env2 = env
    env2 = "prod"
    stripe_key = c[env2]
    fs.close(fd)
  })
})

function api_router(req, res) {
  if (req.url.indexOf('/api/email/send') == 0) {
    var obj = req.body
    var msg = obj['msg']
    var to = obj['to']
    var toa = [to]
    var ses = new aws.SES({apiVersion: '2010-12-01'});
    var from = 'orders@dataskeptic.com'
    var subject = obj['subject']
    var resp = {status: 200, msg: "ok"}
    var header = '<div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-header.png" /></div><br/>'
    var footer = '<br/><br/><div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-footer.png" /></div>'
    var body = header + msg + footer
    var email_request = {
      Source: from, 
      Destination: { ToAddresses: toa, BccAddresses: ["orders@dataskeptic.com"]},
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: body
          }
        }
      }
    }
    ses.sendEmail(email_request, function(err, data) {
      if (err != null) {
        console.log("---[ERROR]-------------------")
        console.log(err)
        resp = {status: 400, msg: err}
      }
      console.log("---[DATA]--------------------")
      console.log(data)
    });
    return res.status(200).end(JSON.stringify(resp))
  }
  else if (req.url.indexOf('/api/order/fulfill') == 0) {
    var stripe = require("stripe")(stripe_key)
    var obj = req.body
    var oid = obj['oid']
    console.log(oid)
    strip.orders.update(oid, {
      metadata: {status: "fulfilled"}
    })
    /*
    stripe.orders.list({limit: 10}, function(err, orders) {
      console.log(err)
      console.log("----")
      console.log(orders)
      return res.status(200).end(JSON.stringify(orders))
    })
    */
    var resp = {"status": 200, msg: "ok", oid}
    return res.status(200).end(JSON.stringify(resp))
  }
  else if (req.url.indexOf('/api/order/list') == 0) {
    var stripe = require("stripe")(stripe_key)
    stripe.orders.list({limit: 10}, function(err, orders) {
      console.log(err)
      console.log("----")
      console.log(orders)
      return res.status(200).end(JSON.stringify(orders))
    })
  }
  else if (req.url.indexOf('/api/order') == 0) {
    console.log("API")
    var key = 'test_Z_gOWbE8iwjhXf4y4vqizQ'

    var self = this
    var data = {
      'type': 'dtg',
      'products[0][id]': "gildan-ultra-blend-50-50-t",
      'address[name]': "Kyle Polich",
      'products[0][color]': "Black",
      'products[0][quantity]': "1",
      'products[0][size]': "xxl",
      'address[address1]': "4158 Sutro Ave",
      'address[address2]': "",
      'address[city]': "Los Angeles",
      'address[state]': "CA",
      'address[zip]': "90008",
      'address[country]': "US",
      'designId': "58196cb41338d457459d579c"
    }

    var config = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        auth: {username: '', password: key},
        withCredentials: true
    };
    console.log("trying")
    axios
      .post('https://api.scalablepress.com/v2/quote', data, config)
        .then(function(resp) {
          console.log(resp)
        })
      .catch((err) => {
        console.log(err)
        //self.setState({step: 'error', errorMsg: err})
      })

    return res.status(200).end("hi2")
  }
}

app.use( (req, res) => {
  if (req.url.indexOf('/src-') > 0) {
    var u = req.url
    var i = u.indexOf('/blog/') + '/blog'.length
    if (i > 0) {
      var hostname = 's3.amazonaws.com/dataskeptic.com'
      if (env != 'prod') {
        hostname = 's3.amazonaws.com/' + env + '.dataskeptic.com'
      }
      var redir = u.substring(i, u.length)
      return res.redirect(301, 'https://' + hostname + redir)
    }
  }
  if (req.url.indexOf('/api') == 0) {
    return api_router(req, res)
  }
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
      var componentHTML = "<div><h1>Not Found</h1><p>You've encountered a bogus link, deprecated link, or bug in our site.  Either way, please nagivate to <a href=\"http://dataskeptic.com\">dataskeptic.com</a> to get back on course.</p></div>"

      var injects = {
        "react-view" : componentHTML
      }

      var HTML = getContentWrapper(title, initialState, injects)
      var pathname = location.pathname
      console.log("page not found:" + pathname)
      //console.log(HTML)
      return res.status(404).end(componentHTML);
    }

    function renderView() {
      var pathname = location.pathname.substring('/blog'.length, location.pathname.length)
      console.log("render: " + pathname)
      var content = content_map[pathname]
      var dispatch = store.dispatch
      if (content == undefined) {
        content = ""
        //console.log(pathname + ": did not pull content from cache")
      } else {
        //console.log(pathname + ": pulled content from cache")
      }

      var blog_page = pathname
      if (pathname == "" || pathname == "/") {
        blog_page = "latest"
      }
      var blog_metadata = blogmetadata_map[blog_page]
      var guid = ""
      if (blog_metadata == undefined) {
        blog_metadata = {}
        //console.log(pathname + ": did not pull blog metadata from cache")
      } else {
        //console.log(pathname + ": pulled blog metadata from cache")
        guid = blog_metadata.guid
      }

      if (pathname == "" || pathname == "/") {
        guid = "latest"
        console.log("get latest episode")
      }
      var episode_metadata = episodes_map[guid]
      if (episode_metadata == undefined) {
        episode_metadata = {}
        //console.log(pathname + ": did not pull episode metadata from cache")
      } else {
        //console.log(pathname + ": pulled episode metadata from cache")
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
