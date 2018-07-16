var aws = require('aws-sdk')
import passport from 'passport'
import session from 'cookie-session'
import {
  getRelatedContent,
  deleteRelatedContentByUri
} from 'backend/admin/admin_related_services'
import { get_episodes } from 'backend/get_episodes'
import { get_episodes_by_guid } from 'backend/get_episodes_by_guid'
import { get_rfc_metadata } from 'backend/get_rfc_metadata'
import { join_slack } from 'backend/join_slack'
import { send_email } from 'backend/send_email'
import { search_site } from 'backend/search_site'
import { get_blogs_rss } from 'backend/get_blogs_rss'
import { get_blogs } from 'backend/get_blogs'
import { order_create } from 'backend/order_create'
import { add_order } from 'backend/add_order'
import { order_fulfill } from 'backend/order_fulfill'
import { order_list } from 'backend/order_list'
import { ready, getTempFile, getFile } from 'backend/v1/recording'
import {
  write as writeProposal,
  upload as uploadProposalFiles,
  getRecording
} from 'backend/v1/proposals'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { getJobs, extractLocation } from './backend/api/v1/jobs_util'
import { feed_uri } from 'daos/episodes'
import {
  apiMemberFeed,
  loadEpisodes,
  loadProducts,
  load,
  get_contributors,
  loadCurrentRFC
} from 'daos/serverInit'
import place_order from 'printful/wrapper'
import { getProducts } from 'daos/products'
import express from 'express'
import FileStreamRotator from 'file-stream-rotator'
import fs from 'fs'
import createLocation from 'history/lib/createLocation'
import Immutable from 'immutable'
import promiseMiddleware from 'lib/promiseMiddleware'
import thunk from 'redux-thunk'
import fetchComponentData from 'lib/fetchComponentData'
import morgan from 'morgan'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import { isEmpty, clone, some, includes } from 'lodash'
import routes from 'routes'
import * as reducers from 'reducers'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import Helmet from 'react-helmet'
import { get_podcasts_from_cache } from 'utils/redux_loader'
import redirects_map from './redirects'

import { reducer as formReducer } from 'redux-form'
import axios from 'axios'

import minifyHTML from 'express-minify-html'

//import Rollbar from 'rollbar'
import http from 'http'
var Influx = require('influx')

console.log('server.jsx : starting')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const base_url = 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/' + env

const app = express()

/*
 * CONFIGURATION
 */
if (process.env.NODE_ENV === 'dev') {
  console.log('wepback.dev')
  require('./webpack.dev').default(app)
}

var aws_accessKeyId = ''
var aws_secretAccessKey = ''
var aws_region = ''
var stripe_key = 'sk_test_81PZIV6UfHDlapSAkn18bmQi'
var sp_key = 'test_Z_gOWbE8iwjhXf4y4vqizQ'
var slack_key = ''
var aws_proposals_bucket = ''
var rfc_table_name = 'rfc'
var latest_rfc_id = 'test-request'
var itunesId = 'xxxx'

console.dir('env = ' + env)
var ipinfo_token = process.env.IPINFO_TOKEN
itunesId = process.env.ITUNES
stripe_key = process.env.STRIPE
sp_key = process.env.SP
slack_key = process.env.SLACK
var elastic_search_endpoint = process.env.ELASTIC_SEARCH_ENDPOINT
aws_accessKeyId = process.env.AWS_ACCESS_KEY_ID
aws_secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
aws_region = process.env.AWS_REGION
aws_proposals_bucket = process.env.RECORDING_AWS_PROPOSALS_BUCKET
aws.config.update({
  accessKeyId: aws_accessKeyId,
  secretAccessKey: aws_secretAccessKey,
  region: aws_region,
  s3BucketEndpoint: true,
  endpoint: "https://4sevcujref.execute-api.us-east-1.amazonaws.com"
})

var influxdb = undefined
const influx_config = process.env.INFLUXDB_ON === 'true'
if (influx_config) {
  console.log('initializing influxdb')
  influxdb = new Influx.InfluxDB({
    protocol: 'https',
    host: process.env.INFLUXDB_HOST,
    database: process.env.INFLUXDB_DATABASE,
    port: process.env.INFLUXDB_PORT,
    username: process.env.INFLUXDB_USER,
    password: process.env.INFLUXDB_PASSWORD
  })
  //  options: { ca: ca },
} else {
  console.log('NOT initializing influxdb')
}

/*
 * INITIALIZE CACHE
 */

let Cache = {}

const resetCache = () => {
  return {
    title_map: {}, // `uri`             -> <title>
    content_map: {}, // `uri`             -? {s3 blog content}
    folders: [],
    episodes_map: {}, // `guid` | 'latest' -> {episode}
    episodes_blog_map: {}, // `blog_id` -> {episode}
    episodes_list: [], // guids
    episodes_content: [], // pn
    products: {},
    contributors: {},
    rfc: {}
  }
}

const reducer = combineReducers({
  ...reducers,
  form: formReducer
})

global.my_cache = Cache = resetCache()
global.env = env

/*
 * REFRESH
 */

const doRefresh = () => {
  console.log('-[Refreshing Cache]-')

  // Let node make requests asynchronous
  return Promise.all([
    //loadEpisodes(),
    loadProducts(),
    get_contributors(),
    loadCurrentRFC()
  ])
    .then(results => {
      // but wait until all of them will be done
      console.log('-[All cache data fetched]-')
      const [episodes, products, contributors, rfc] = results


      // episodes
      const {
        episodes_map,
        episodes_blog_map,
        episodes_list,
        episodes_content,
        member_feed
      } = episodes
      Cache.episodes_map = episodes_map
      Cache.episodes_list = episodes_list
      Cache.episodes_content = episodes_content
      Cache.episodes_blog_map = episodes_blog_map
      Cache.member_feed = member_feed

      // products
      Cache.products = null
      Cache.products = {}
      Cache.products.items = clone(products)

      //contributors
      Cache.contributors = clone(contributors)

      // RFC
      Cache.rfc = rfc
    })
    .then(() => console.log('-[Refreshing Complete]-'))
    .catch(err => {
      console.error(`Failed to fetch cache`)
      console.dir(err)
    })
}

setInterval(doRefresh, 60 * 60 * 1000)

/*
 * ENVIRONMENT SPECIFIC CONFIGURATION
 */
if (env == 'prod') {
  function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false
    }
    // fallback to standard filter function
    return compression.filter(req, res)
  }
  app.use(compression({ filter: shouldCompress }))

  var logDirectory = path.join(__dirname, 'log')
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })
  app.use(morgan('combined', { stream: accessLogStream }))
} else {
  require('./webpack.dev').default(app)
  const proxy = require('http-proxy-middleware')
  const wsProxy = proxy('/recording', {
    target: 'ws://127.0.0.1:9001',
    // pathRewrite: {
    //  '^/websocket' : '/socket',          // rewrite path.
    //  '^/removepath' : ''                 // remove path.
    // },
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    ws: true, // enable websocket proxy
    logLevel: 'debug'
  })
  app.use(wsProxy)
}

/*
 * WIRING UP APP
 */

// MIDDLEWARES
app.set('trust proxy', 1)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS')
  next()
})

app.use(
  session({
    secret: 'secret',
    resave: true,
    name: 'session',
    keys: ['datas', 'member'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

var challenge_response = 'not_set'

app.all('/.well-known/acme-challenge/:id', function(req, res) {
  res.status(200).send(`${req.params.id}.${challenge_response}`)
})

/*
 * SETUP API
 */

const docClient = new aws.DynamoDB.DocumentClient()

function api_router(req, res) {
  if (req.url.indexOf('/api/slack/join') == 0) {
    var req = req.body
    join_slack(req, res, slack_key)
    return true
  } else if (req.url.indexOf('/api/messages') == 0) {
    console.log(Object.keys(req))
    var p = req.url
    var post_data = req.body
    var pd = JSON.stringify(post_data)
    var options = {
      hostname: 'bot.dataskeptic.com',
      port: 3978,
      path: req.url,
      method: 'POST',
      headers: req.headers
    }
    console.log(
      '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
    )
    var proxy = http.request(options, function(presponse) {
      presponse.pipe(res, { end: true })
    })
    proxy.write(pd)
    proxy.on('error', function(err) {
      console.log(err)
    })
    console.log(
      '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
    )
    req.pipe(proxy, { end: true })
    console.log(
      '=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
    )
    return true
  } else if (req.url.indexOf('/api/members/feed') == 0) {
    apiMemberFeed(req, res, Cache.member_feed)
    return true
  } else if (req.url.indexOf('/api/v1/proposals/files') == 0) {
    uploadProposalFiles(req, res, aws_proposals_bucket)
    return true
  } else if (req.url.indexOf('/api/v1/proposals/recording') == 0) {
    getRecording(req, res)
    return true
  } else if (req.url.indexOf('/api/v1/proposals') == 0) {
    writeProposal(req, res)
    return true
  } else if (req.url.indexOf('/api/v1/recording/ready') == 0) {
    ready(req, res, aws_proposals_bucket)
    return true
  } else if (req.url.indexOf('/api/v1/recording/get') == 0) {
    getTempFile(req, res, aws_proposals_bucket)
    return true
  } else if (req.url.indexOf('/api/refresh') == 0) {
    doRefresh()
    return res.status(200).end(JSON.stringify({ status: 'ok' }))
  } else if (req.url.indexOf('/api/search') == 0) {
    search_site(req, res, elastic_search_endpoint)
    return true
  } else if (req.url.indexOf('/api/email/send') == 0) {
    send_email(req, res, elastic_search)
    return true
  } else if (req.url.indexOf('/api/order/create') == 0) {
    order_create(req, res, stripe_key)
    return true
  } else if (req.url.indexOf('/api/order/add') == 0) {
    add_order(req, res, base_url, stripe_key)
    return true
  } else if (req.url.indexOf('/api/order/fulfill') == 0) {
    order_fulfill(req, res, stripe_key)
    return true
  } else if (req.url.indexOf('/api/order/list') == 0) {
    order_list(req, res, stripe_key)
    return true
  } else if (req.url.indexOf('/api/contributors/list') == 0) {
    var req = req.body
    var resp = Cache.contributors
    return res.status(200).end(JSON.stringify(resp))
  } else if (req.url.indexOf('/api/blog/contributors/list') == 0) {
    var req = req.body
    var resp = Cache.contributors
    return res.status(200).end(JSON.stringify(resp))
  } else if (req.url.indexOf('/api/Related') == 0) {
    related_content(req, res)
    return true
  } else if (req.url.indexOf('/api/blog/list') == 0) {
    get_blogs(req, res)
    return true
  } else if (req.url == '/api/blog/categories') {
    var folders = Cache.folders
    return res.status(200).end(JSON.stringify(folders))
  } else if (req.url.indexOf('/api/blog/rss') === 0) {
    get_blogs_rss(req, res)
    return true
  } else if (req.url.indexOf('/api/store/order/add') === 0) {
    var printful_key = c[env]['printful']['api']
    var payload = req.body
    var customer = payload['customer']
    var designId = payload['designId']
    var size = payload['size']

    var ok_callback = function(r, info) {
      var resp = r['data']
      var result = { msg: 'ok' }
      return res.status(200).end(JSON.stringify(result))
    }

    var error_callback = function(err) {
      console.log('api error')
      var jstr = JSON.stringify(err)
      console.log(jstr)
      var result = { msg: 'fail' }
      return res.status(500).end(JSON.stringify(result))
    }

    var promise = place_order(
      printful_key,
      customer,
      designId,
      size,
      ok_callback,
      error_callback
    )
    return promise
  } else if (req.url.indexOf('/api/store/list') == 0) {
    var products = Cache.products
    return res.status(200).end(JSON.stringify(products))
  } else if (req.url.indexOf('/api/episodes/list') == 0) {
    get_episodes(req, res, Cache.episodes_map, Cache.episodes_list)
    return true
  } else if (req.url.indexOf('/api/v1/store/order/add') == 0) {
    add_order(req)
  } else if (req.url.indexOf('/api/episodes/get') == 0) {
    get_episodes_by_guid(req, res, Cache.episodes_map, Cache.episodes_list)
    return true
  } else if (req.url == '/api/rfc/list') {
    get_rfc_metadata(req, res, Cache, docClient, rfc_table_name, latest_rfc_id)
    return true
  } else if (req.url === '/api/admin/related') {
    getRelatedContent(req.body.uri, docClient).then(related => {
      res.send(related)
    })
    return true
  } else if (req.url === '/api/admin/related/delete') {
    deleteRelatedContentByUri(
      req.body.uri,
      req.body.related_uri,
      docClient
    ).then(related => {
      res.send(related)
    })
    return true
  } else if (req.url === '/api/admin/related/create') {
    createRelatedContent(req.body.uri, req.body.data, docClient).then(
      related => {
        res.send(related)
      }
    )
    return true
  } else if (req.url === '/api/cert/set') {
    var b = req.body
    var chal = b['c']
    challenge_response = chal
    return res.status(200).end(JSON.stringify({ status: chal }))
  }
  return false
}

/*
 * INITIALIZE STORE
 */

/*
function inject_folders(store, my_cache) {
  var folders = my_cache.folders
  store.dispatch({ type: 'ADD_FOLDERS', payload: folders })
}

function inject_years(store, my_cache) {
  var episodes_list = my_cache.episodes_list
  var episodes_map = my_cache.episodes_map
  var ymap = {}
  for (var i = 0; i < episodes_list.length; i++) {
    var guid = episodes_list[i]
    var episode = episodes_map[guid]
    var pd = new Date(episode.pubDate)
    var year = pd.getYear() + 1900
    ymap[year] = 1
  }
  var years = Object.keys(ymap)
  years = years.sort().reverse()
  store.dispatch({ type: 'SET_YEARS', payload: years })
}
*/

const getFeaturesAPI = pageType =>
  axios.get(`${base_url}/cms${pageType ? '/' + pageType : ''}`)

function getContributorPosts(contributor) {
  return axios
    .get(`${base_url}/blog/list?contributor=${contributor}&limit=21`)
    .then(res => res.data)
}

function getEpisode(guid) {
  var uri = `/api/episodes/get/${guid}`
  return axios.get(uri)
}

async function inject_homepage(store, my_cache, location) {
  const res = await getFeaturesAPI('homepage')
  store.dispatch({
    type: 'CMS_INJECT_HOMEPAGE_CONTENT',
    payload: { data: res.data }
  })

  const guid = res.data.latest_episode.guid
  const episode = my_cache.episodes_map[guid]
  if (episode == undefined) {
    console.log("episode undefined")
    console.log(guid)
    var promise = getEpisode(guid)
    promise.then(function(res) {
        console.log('EEEEEFFFFF')
        var episode = res.data
        console.log(episode)
        store.dispatch({
          type: 'ADD_EPISODES',
          payload: [episode]
        })
      })
      .catch(err => {
        console.log('Caught in server.jsx :(')
        console.log(err)
      })
  } else {
    store.dispatch({ type: 'ADD_EPISODES', payload: [episode] })
  }


  const q = 'data'
  const jobs = await getJobs(q, location)
  store.dispatch({
    type: 'CMS_INJECT_HOMEPAGE_JOB_LISTING',
    payload: { data: jobs }
  })
}

function inject_products(store, my_cache, pathname) {
  var products = my_cache.products['items']
  store.dispatch({ type: 'ADD_PRODUCTS', payload: products })
}

function inject_podcast(store, my_cache, pathname) {
  var episodes = get_podcasts_from_cache(my_cache, pathname)
  store.dispatch({ type: 'ADD_EPISODES', payload: episodes })
}

async function inject_contributor(store, cache, pathanme) {
  const contributor = pathanme.split('/').pop()
  const blogs = await getContributorPosts(contributor)

  store.dispatch({
    type: 'SET_CONTRIBUTOR_BLOGS',
    payload: { contributor, blogs }
  })
}

async function updateState(store, pathname, req) {
  // TODO: find a way to better sync this section with each page's componentWillMount
  console.log('server.jsx : updateState for ' + pathname)
  //inject_folders(store, Cache)
  //inject_years(store, Cache)

  store.dispatch({
    type: 'PROPOSAL_SET_BUCKET',
    payload: { aws_proposals_bucket }
  })
  if (!isEmpty(Cache.contributors)) {
    console.log('using cache for contributors')
    store.dispatch({
      type: 'SET_CONTRIBUTORS',
      payload: Cache.contributors
    })
  }
  if (pathname === '' || pathname === '/') {
    const location = extractLocation(req)
    await inject_homepage(store, Cache, location)
  }
  if (pathname.indexOf('/blog') === 0) {
  } else if (pathname === '/members' || pathname === '/store') {
    inject_products(store, Cache, pathname)
  } else if (pathname.indexOf('/podcast') === 0) {
    inject_podcast(store, Cache, pathname)
  } else if (pathname.indexOf('/contributor') === 0) {
    await inject_contributor(store, Cache, pathname)
  }

  store.dispatch({ type: 'ADD_FOLDERS', payload: Cache.folders })

  store.dispatch({
    type: 'FETCH_CURRENT_PROPOSAL_SUCCESS',
    payload: {
      data: Cache.rfc
    }
  })

  if (req.isAuthenticated()) {
    store.dispatch({
      type: 'AUTH_USER_SUCCESS',
      payload: {
        data: req.user
      }
    })
  }
}

/*
 * RENDERING
 */

function renderView(store, renderProps, location) {
  const InitialView = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  )

  const sheet = new ServerStyleSheet()
  const componentHTML = renderToString(sheet.collectStyles(InitialView))
  const helmet = Helmet.renderStatic()
  const styles = sheet.getStyleTags()

  const state = store.getState()
  const route = renderProps.matchContext.router.routes.slice(-1)[0]
  const notFound = route.notFound

  return {
    state: state,
    html: componentHTML,
    helmet: helmet,
    styles: styles,
    notFound: notFound
  }
}

/**
 * You might want to change the response schema.
 * Please update this key to
 * have latest request response data in the user session
 */
const CURRENT_IP_REQ_VERSION = 7
const localIPs = ['127.0.0.1', '::1']

function getIpData(ip) {
  const localIP = localIPs.indexOf(ip) > -1
  if (localIP) {
    ip = ''
  }

  const url = `http://ipinfo.io${ip && `/${ip}`}/json`

  const safe = function(str) {
    if (str == undefined) {
      return ''
    } else {
      return str.replace(/'/g, '"')
    }
  }

  return axios
    .get(url)
    .then(res => res.data)
    .then(data => {
      if (data['postal'] == undefined) {
        data['postal'] = ''
      }
      const { ip, city, region, country, loc, org, postal } = data
      var lat = -1
      var lng = -1
      if (loc != undefined) {
        ;[lat, lng] = loc.split(',')
      }

      return {
        ip,
        city: safe(city),
        region: safe(region),
        country: safe(country),
        lat,
        lng,
        org: safe(org),
        postal: safe(postal),
        version: CURRENT_IP_REQ_VERSION
      }
    })
}

async function tracking(req, res) {
  if (!ipinfo_token) return

  let ip = 'not-set'
  if (req.connection) {
    ip = req.connection.remoteAddress
  }

  let ipInfo = req.session.ipInfo
  if (isEmpty(ipInfo)) ipInfo = null
  if (ipInfo && ipInfo.version !== CURRENT_IP_REQ_VERSION) {
    ipInfo = null
  }

  req.session.ver = CURRENT_IP_REQ_VERSION

  if (!ipInfo) {
    console.log('ipInfo not defined')
    let ipData
    try {
      // wait for ip info request data
      ipInfo = ipData = await getIpData(ip)
      console.log('success getIpData')
    } catch (error) {
      console.log('problem with tracking')
      console.log(ip)
      console.log(ipinfo_token)
      console.log(error)
      ipInfo = ipData = {
        error: true,
        version: CURRENT_IP_REQ_VERSION
      }
    }

    // save to current session if not empty
    if (ipData) {
      console.log('save to current session if not empty')
      req.session.ipInfo = { ...ipData }
    }
  }

  if (ipInfo) {
    if (influxdb) {
      const { country, region, postal, lat, lng } = ipInfo

      const pnt = {
        measurement: 'impression',
        tags: { country, region, postal },
        fields: { lat, lng },
        version: CURRENT_IP_REQ_VERSION
      }

      var lst = [pnt]
      return influxdb
        .writePoints(lst)
        .then(function() {})
        .catch(function(err) {
          console.error('Error saving data to InfluxDB!')
          console.log(err)
        })
    }
  } else {
    console.log('ipInfo is undefined')
  }
}

const api = require('./backend/api/v1')
app.use('/api/v1', async (req, res, next) => {
  await tracking(req, res)
  next()
})

app.use('/api/v1/', api(() => Cache))

if (env === 'prod') {
/*
  const rollbar = Rollbar.init({
    accessToken: '4555957947d347a69caf6e017ea72f51',
    handleUncaughtExceptions: true,
    verbose: false,
    payload: {
      environment: env
    }
  })
  */

  //app.use(rollbar.errorHandler())
  app.use(
    minifyHTML({
      override: true,
      exception_url: false,
      htmlMinifier: {
        removeComments: false,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: false,
        minifyJS: false
      }
    })
  )
}

const renderPage = async (req, res) => {
  if (req.url == '/favicon.ico') {
    return res.redirect(
      301,
      'https://s3.amazonaws.com/dataskeptic.com/favicon.ico'
    )
  }
  if (req.url == '/data-skeptic-bonus.xml') {
    return res.redirect(
      307,
      'https://s3.amazonaws.com/data-skeptic-bonus-feed/data-skeptic-bonus.xml'
    )
  }
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
  } else if (req.url.indexOf('/api') == 0) {
    var routed = api_router(req, res)
    if (routed) {
      return
    }
  }

  var redir = redirects_map['redirects_map'][req.url]
  var hostname = req.headers.host
  if (redir != undefined) {
    console.log('Redirecting to ' + hostname + redir)
    return res.redirect(301, 'http://' + hostname + redir)
  }

  if (req.url == '/feed.rss') {
    return res.redirect(307, 'http://dataskeptic.libsyn.com/rss')
  }

  if (req.url.indexOf('.svg') > -1) {
    return res.status(404).end('File Not Found')
  }

  const location = createLocation(req.url)

  match({ routes, location }, async (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    }

    if (!renderProps) {
      res.render('error')
    }

    let store = applyMiddleware(thunk, promiseMiddleware)(createStore)(reducer)
    await updateState(store, location.pathname, req)

    await tracking(req, res)

    fetchComponentData(
      store.dispatch,
      renderProps.components,
      renderProps.params
    )
      .then(() => renderView(store, renderProps, location))
      .then(({ html, state, helmet, notFound, styles }) => {
        if (notFound) {
          return res.status(404).render('index', {
            staticHTML: html,
            initialState: state,
            helmet,
            env,
            itunesId,
            styles
          })
        }

        return res.render('index', {
          staticHTML: html,
          initialState: state,
          helmet,
          env,
          itunesId,
          styles
        })
      })
      .catch(err => {
        console.error('HTML generation error')
        console.dir(err)
        return res.end(err)
      })
  })
}

doRefresh().then(() => {
  console.log('CACHE IS now READY')
  app.use(renderPage)
})

export default app
