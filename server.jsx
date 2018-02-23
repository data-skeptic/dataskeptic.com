var aws = require('aws-sdk');
import passport from 'passport'
import session from 'cookie-session';
import {getRelatedContent, deleteRelatedContentByUri} from 'backend/admin/admin_related_services'
import {get_episodes}            from 'backend/get_episodes'
import {get_episodes_by_guid}    from 'backend/get_episodes_by_guid'
import {get_rfc_metadata}        from 'backend/get_rfc_metadata'
import {join_slack}              from 'backend/join_slack'
import {send_email}              from 'backend/send_email'
import {search_site}             from 'backend/search_site'
import {get_blogs_rss}           from 'backend/get_blogs_rss'
import {order_create}            from 'backend/order_create'
import {add_order}               from 'backend/add_order'
import {order_fulfill}           from 'backend/order_fulfill'
import {order_list}              from 'backend/order_list'
import {ready, getTempFile, getFile}  from 'backend/v1/recording';
import {write as writeProposal, upload as uploadProposalFiles, getRecording}  from 'backend/v1/proposals'
import bodyParser                from 'body-parser'
import cookieParser              from 'cookie-parser'
import compression               from 'compression';
import {feed_uri}                from 'daos/episodes'
import {
    apiMemberFeed,
    loadEpisodes,
    loadProducts,
    load,
    get_contributors,
    loadCurrentRFC,
    get_bot_status
}  from 'daos/serverInit'
import place_order from 'printful/wrapper'
import { getProducts }           from 'daos/products'
import express                   from 'express';
import FileStreamRotator         from 'file-stream-rotator'
import fs                        from 'fs'
import createLocation            from 'history/lib/createLocation';
import Immutable                 from 'immutable'
import promiseMiddleware         from 'lib/promiseMiddleware';
import thunk                     from 'redux-thunk';
import fetchComponentData        from 'lib/fetchComponentData';
import morgan                    from 'morgan'
import path                      from 'path';
import React                     from 'react';
import {renderToString}        from 'react-dom/server';
import {Provider}              from 'react-redux';
import {RoutingContext, match} from 'react-router';
import isFunction from 'lodash/isFunction';
import extend from 'lodash/extend';
import isEmpty from 'lodash/isEmpty';
import clone from 'lodash/clone';
import routes                    from 'routes';
import * as reducers             from 'reducers';
import {
    createStore,
    combineReducers,
    applyMiddleware
}       from 'redux';
import getContentWrapper           from 'utils/content_wrapper';
import { get_podcasts_from_cache } from 'utils/redux_loader';
import redirects_map               from './redirects';

import {reducer as formReducer} from 'redux-form'
import axios from "axios"

import tunnel from 'tunnel'
import http from 'http'
import request from 'request'
var Influx = require('influx');

console.log("server.jsx : starting")

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

const app = express()
/*
 * CONFIGURATION
 */
if (process.env.NODE_ENV === 'dev') {
	console.log('wepback.dev')
	require('./webpack.dev').default(app);
}

console.dir('env = ' + env)
aws.config.update(
    {
        "accessKeyId": process.env.AWS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
        "region": process.env.AWS_REGION
    }
);

var influxdb = undefined
if (JSON.parse(process.env.INFLUXDB_ON)) {
    console.log("initializing influxdb")
    influxdb = new Influx.InfluxDB({
      protocol: 'https',
      host:     process.env.INFLUXDB_HOST,
      database: process.env.INFLUXDB_DATABASE,
      port:     process.env.INFLUXDB_PORT,
      username: process.env.INFLUXDB_USER,
      password: process.env.INFLUXDB_PASSWORD
    });
} else {
    console.log("NOT initializing influxdb")
}




/*
 * INITIALIZE CACHE
 */

let Cache = {

}

const resetCache = () => {
    return {
        title_map: {}         // `uri`             -> <title>
        , content_map: {}       // `uri`             -? {s3 blog content}
        , folders: []
        , episodes_map: {}      // `guid` | 'latest' -> {episode}
        , episodes_list: []     // guids
        , episodes_content: []     // pn
        , products: {}
        , contributors: {}
        , rfc: {}
    }
}

const reducer = combineReducers({
    ...reducers,
    form: formReducer
});

global.my_cache = Cache = resetCache();
global.env = env;

/*
 * REFRESH
 */

const doRefresh = (store) => {
    let env = global.env;
    console.log("-[Refreshing Cache]-");

    // Let node make requests asynchronous
    return Promise.all([
    	loadEpisodes(env),
	    loadProducts(),
	    get_contributors(),
	    loadCurrentRFC(),
	    get_bot_status()
		]).then((results) => {
		    // but wait until all of them will be done

		    const [ episodes, products, contributors, rfc, bot ] = results
		    console.log("-[All cache data fetched]-")

        // episodes
		    const {episodes_map, episodes_list, episodes_content, member_feed} = episodes
	      Cache.episodes_map = episodes_map
        Cache.episodes_list = episodes_list
        Cache.episodes_content = episodes_content
        Cache.member_feed = member_feed

        // products
	      Cache.products = null;
        Cache.products = {};
        Cache.products.items = clone(products)

        //contributors
	      Cache.contributors = clone(contributors)

        // RFC
	      Cache.rfc = rfc

        // bot
	      Cache.bot = bot
    })
      .then(() => console.log("-[Refreshing Complete]-"))
      .catch((err) => {
          console.error(`Failed to fetch cache`)
          console.dir(err)
      })
};

setInterval(doRefresh, 60 * 60 * 1000);

/*
 * ENVIRONMENT SPECIFIC CONFIGURATION
 */
if (env == "prod") {
    function shouldCompress(req, res) {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
        }
        // fallback to standard filter function
        return compression.filter(req, res)
    }
    app.use(compression({filter: shouldCompress}))

    var logDirectory = path.join(__dirname, 'log')
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
    var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(logDirectory, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false
    })
    app.use(morgan('combined', {stream: accessLogStream}))    
} else {
    require('./webpack.dev').default(app);
    const proxy = require('http-proxy-middleware');
    const wsProxy = proxy('/recording', {
        target: 'ws://127.0.0.1:9001',
        // pathRewrite: {
        //  '^/websocket' : '/socket',          // rewrite path.
        //  '^/removepath' : ''                 // remove path.
        // },
        changeOrigin: true,                     // for vhosted sites, changes host header to match to target's host
        ws: true,                               // enable websocket proxy
        logLevel: 'debug'
    });
    app.use(wsProxy);
}

/*
 * WIRING UP APP
 */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(
    session({
        name: 'session',
        keys: ['datas', 'member'],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
)
app.use(passport.initialize());
app.use(passport.session());

var challenge_response = "not_set"

app.all("/.well-known/acme-challenge/:id", function(req, res) { 
    res.status(200).send(`${req.params.id}.${challenge_response}`); 
});

const api = require('./backend/api/v1');
app.use('/api/v1/', api(() => Cache));

/*
 * SETUP API
 */

const docClient = new aws.DynamoDB.DocumentClient();

function api_router(req, res) {
    if (req.url.indexOf('/api/slack/join') == 0) {
        var req = req.body
        join_slack(req, res, process.env.SLACK)
        return true
    } else if (req.url
        .indexOf('/api/messages') == 0) {
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
        };
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        var proxy = http.request(options, function (presponse) {
            presponse.pipe(res, {end: true})
        })
        proxy.write(pd)
        proxy.on('error', function(err) {
            console.log(err)
        })
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        req.pipe(proxy, {end: true})
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        return true
    } else if (req.url.indexOf('/api/members/feed') == 0) {
        apiMemberFeed(req, res, Cache.member_feed)
        return true;
    } else if (req.url.indexOf('/api/v1/proposals/files') == 0) {
        uploadProposalFiles(req, res, process.env.RECORDING_AWS_PROPOSAL_BUCKET);
        return true;
    } else if (req.url.indexOf('/api/v1/proposals/recording') == 0) {
        getRecording(req, res);
        return true;
    } else if (req.url.indexOf('/api/v1/proposals') == 0) {
        writeProposal(req, res);
        return true;
    } else if (req.url.indexOf('/api/v1/recording/ready') == 0) {
        ready(req, res, process.env.RECORDING_AWS_PROPOSAL_BUCKET);
        return true;
    } else if (req.url.indexOf('/api/v1/recording/get') == 0) {
        getTempFile(req, res, process.env.RECORDING_AWS_PROPOSAL_BUCKET);
        return true;
    }
    else if (req.url.indexOf('/api/refresh') == 0) {
        doRefresh()
        return res.status(200).end(JSON.stringify({'status': 'ok'}))
    }
    else if (req.url.indexOf('/api/search') == 0) {
        search_site(req, res, process.env.ELASTIC_SEARCH_ENDPOINT)
        return true
    }
    else if (req.url.indexOf('/api/email/send') == 0) {
        send_email(req, res, elastic_search)
        return true
    }
    else if (req.url.indexOf('/api/order/create') == 0) {
        order_create(req, res, process.env.STRIPE)
        return true
    }
    else if (req.url.indexOf('/api/order/add') == 0) {
        add_order(req, res, base_url, process.env.STRIPE)
        return true
    }
    else if (req.url.indexOf('/api/order/fulfill') == 0) {
        order_fulfill(req, res, process.env.STRIPE)
        return true
    }
    else if (req.url.indexOf('/api/order/list') == 0) {
        order_list(req, res, process.env.STRIPE)
        return true
    }
    else if (req.url.indexOf('/api/contributors/list') == 0) {
        var req = req.body
        var resp = Cache.contributors
        return res.status(200).end(JSON.stringify(resp))
    }
    else if (req.url.indexOf('/api/Related') == 0) {
        related_content(req, res)
        return true
    }
    else if (req.url == '/api/blog/categories') {
        var folders = Cache.folders
        return res.status(200).end(JSON.stringify(folders))
    }
    else if (req.url.indexOf('/api/blog/rss') === 0) {
        get_blogs_rss(req, res);
        return true
    }
    else if (req.url.indexOf('/api/store/order/add') === 0) {
        var printful_key = c[env]["printful"]["api"]
        var payload = req.body
        var customer = payload['customer']
        var designId = payload['designId']
        var size     = payload['size']

        var ok_callback = function(r, info) {
            var resp = r['data']
            console.log(resp)
            var result = {"msg": "ok"}
            return res.status(200).end(JSON.stringify(result))
        }

        var error_callback = function(err) {
            console.log("api error")
            var jstr = JSON.stringify(err)
            console.log(jstr)
            var result = {"msg": "fail"}
            return res.status(500).end(JSON.stringify(result))
        }

        var promise = place_order(printful_key, customer, designId, size, ok_callback, error_callback)
        console.log(typeof(promise))
        return promise
    }
    else if (req.url.indexOf('/api/store/list') == 0) {
        var products = Cache.products
        return res.status(200).end(JSON.stringify(products))
    }
    else if (req.url.indexOf('/api/episodes/list') == 0) {
        get_episodes(req, res, Cache.episodes_map, Cache.episodes_list)
        return true
    }
    else if (req.url.indexOf('/api/v1/store/order/add') == 0) {
        add_order(req)
    }
    else if (req.url.indexOf('/api/episodes/get') == 0) {
        get_episodes_by_guid(req, res, Cache.episodes_map, Cache.episodes_list)
        return true
    }
    else if (req.url == '/api/rfc/list') {
        get_rfc_metadata(req, res, Cache, docClient, rfc_table_name, latest_rfc_id)
        return true
    } else if (req.url === '/api/admin/related') {
        getRelatedContent(req.body.uri, docClient)
            .then(related => {
                res.send(related);
            })
        return true;
    } else if (req.url === '/api/admin/related/delete') {
        deleteRelatedContentByUri(req.body.uri, req.body.related_uri, docClient)
            .then(related => {
                res.send(related);
            })
        return true;
    } else if (req.url === '/api/admin/related/create') {
        createRelatedContent(req.body.uri, req.body.data, docClient)
            .then(related => {
                res.send(related);
            })
        return true;
    } else if (req.url === '/api/cert/set') {
        var b = req.body
        var chal = b['c']
        challenge_response = chal
        return res.status(200).end(JSON.stringify({"status": chal}))
    }    
    return false
}

/*
 * INITIALIZE STORE
 */

function inject_folders(store, my_cache) {
    var folders = my_cache.folders
    store.dispatch({type: "ADD_FOLDERS", payload: folders})
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
    store.dispatch({type: "SET_YEARS", payload: years})
}

const getFeaturesAPI = (pageType) => axios.get(`${base_url}/cms${pageType ? '/' + pageType : ''}`)

function getContributorPosts(contributor) {
    return axios.get(`${base_url}/blog/list?contributor=${contributor}&limit=21`).then((res) => res.data)
}

async function inject_homepage(store, my_cache) {
    const res = await getFeaturesAPI("homepage")
    var dispatch = store.dispatch
    dispatch({type: "CMS_INJECT_HOMEPAGE_CONTENT", payload: { data: res.data, dispatch }})

    const guid = res.data.latest_episode.guid
    const episode = my_cache.episodes_map[guid]

    store.dispatch({type: "ADD_EPISODES", payload: [episode]})
}

function inject_products(store, my_cache, pathname) {
    var products = my_cache.products['items']
    console.log("inject_products " + products.length)
    store.dispatch({type: "ADD_PRODUCTS", payload: products})
}

function inject_podcast(store, my_cache, pathname) {
    var episodes = get_podcasts_from_cache(my_cache, pathname)
    store.dispatch({type: "ADD_EPISODES", payload: episodes})
}

async function inject_contributor(store, cache, pathanme) {
    const contributor = pathanme.split('/').pop()
    const blogs = await getContributorPosts(contributor)

    store.dispatch({type: "SET_CONTRIBUTOR_BLOGS", payload: { contributor, blogs } })
}

async function updateState(store, pathname, req) {
    // TODO: find a way to better sync this section with each page's componentWillMount
    console.log("server.jsx : updateState for " + pathname)
    inject_folders(store, Cache)
    inject_years(store, Cache)

    store.dispatch({type: "PROPOSAL_SET_BUCKET", payload: {aws_proposals_bucket: process.env.RECORDING_AWS_PROPOSAL_BUCKET}})
    if (!isEmpty(Cache.contributors)) {
        console.log("usingcache")
        store.dispatch({type: "SET_CONTRIBUTORS", payload: Cache.contributors})
    }

    var bot = Cache.bot
    if (bot) {
        store.dispatch({type: "SET_BOT", payload: bot})
    }
    
    if (pathname === "" || pathname === "/") {
        await inject_homepage(store, Cache, pathname)
    }
    if (pathname.indexOf('/blog') === 0) {
    }
    else if (pathname === "/members" || pathname === "/store") {
        inject_products(store, Cache, pathname)
    }
    else if (pathname.indexOf("/podcast") === 0) {
        inject_podcast(store, Cache, pathname)
    } else if (pathname.indexOf("/contributor") === 0) {
        await inject_contributor(store, Cache, pathname)
    }

    store.dispatch({type: "ADD_FOLDERS", payload: Cache.folders});

    store.dispatch({
        type: 'FETCH_CURRENT_PROPOSAL_SUCCESS',
        payload: {
            data: Cache.rfc
        }
    })

    const user = req.user;

    if (user) {
        store.dispatch({
            type: 'AUTH_USER_SUCCESS',
            payload: {
                data: user
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
            <RoutingContext {...renderProps} />
        </Provider>
    );

    let meta = {
        title: 'Data Skeptic',
        description: 'Data Skeptic is your source for a perspective of scientific skepticism on topics in statistics, machine learning, big data, artificial intelligence, and data science. Our weekly podcast and blog bring you stories and tutorials to help understand our data-driven world.',
        author: 'Kyle Polich',
        keywoards: 'data skeptic, podcast,',
    };

    const componentHTML = renderToString(InitialView);

    let state = store.getState();
    let activePageComponent = InitialView.props.children.props.components.filter((comp) => comp && isFunction(comp.getPageMeta));
    activePageComponent = (activePageComponent.length > 0) ? activePageComponent[0] : null;
    if (activePageComponent) {
        meta = extend(meta, activePageComponent.getPageMeta(state));
    }

    return {
        state: state,
        html: componentHTML,
        meta: meta
    };
}


/**
 * You might want to change the response schema.
 * Please update this key to
 * have latest request response data in the user session
 */
const CURRENT_IP_REQ_VERSION = 0

function getIpData(ip) {
	return new Promise((resolve, reject) => {
		request('http://ipinfo.io/' + ip + '?token=' + process.env.IPINFO_TOKEN, function(error, res, body) {
    		if (body) {
    			try {
    				body = JSON.parse(body)
    				var ip = body['ip']

    				var country = body['country'] || "unknown"
                    var city    = body['city']    || "unknown"
                    var region  = body['region']  || "unknown"
    				var postal  = body['postal']  || "unknown"
    				var loc     = body['loc']     || "unknown"
    				var arr     = loc.split(",")
    				if (arr.length == 2) {
    					var lat = arr[0]
    					var lng = arr[1]
    				} else {
    					var lat = ""
    					var lng = ""
    				}
    				console.log(["influx", lat, region, country, postal])

                    var pnt = {
							measurement: "impression",
							tags: {country, region, postal},
							fields: {lat, lng},
                            version: CURRENT_IP_REQ_VERSION
					}
                	resolve(pnt)
				} catch(err) {
					console.log("problem with tracking")
                    console.log(ip)
                    console.log(process.env.IPINFO_TOKEN)
                    console.log(body)
                    reject(err)
				}
			} else {
				console.log("Some error from ipinfo.io")
				console.log(body)
				console.log(error)
                reject(error)
			}
		})
    })
}

async function tracking (req, res) {
    if (!process.env.IPINFO_TOKEN) return

    let ip = "not-set"
    if (req.connection) {
        ip = req.connection.remoteAddress
    }

	let ipInfo = req.session.ipInfo
    if (ipInfo && ipInfo.version !== CURRENT_IP_REQ_VERSION) {
        ipInfo = null
    }

    if (!ipInfo) {
        console.log("ipInfo not defined")
        let ipData
        try {
            // wait for ip info request data
            ipData = await getIpData(ip)
        } catch (err) {
            ipInfo = undefined
        }

        // save to current session if not empty
        if (ipData) {
	          req.session.ipInfo = ipInfo = ipData
          }
    }

	if (ipInfo) {
        if (influxdb) {
            var lst = [ipInfo]
    	    return influxdb.writePoints(lst)
            .then(function() {})
            .catch(function (err) {
              console.error('Error saving data to InfluxDB!')
              console.log(err)
            })
	    }
    } else {
        console.log("ipInfo is undefined")
    }
}

const renderPage = async (req, res) => {
    if (req.url == '/favicon.ico') {
        return res.redirect(301, 'https://s3.amazonaws.com/dataskeptic.com/favicon.ico')
    }
    if (req.url == '/data-skeptic-bonus.xml') {
        return res.redirect(307, 'https://s3.amazonaws.com/data-skeptic-bonus-feed/data-skeptic-bonus.xml')
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
    }
    else if (req.url.indexOf('/api') == 0) {
        var routed = api_router(req, res)
        if (routed) {
            return
        }
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

    if (req.url.indexOf('.svg') > -1) {
        return res.status(404).end('File Not Found');
    }

    const location = createLocation(req.url);

    match({routes, location}, async (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            res.render('error');
        }

        let store = applyMiddleware(thunk, promiseMiddleware)(createStore)(reducer);
        await updateState(store, location.pathname, req);

        await tracking(req, res)

	      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(() => renderView(store, renderProps, location))
            .then(({html, state, meta}) => {
                if (meta.notFoundPage) {
                    return res.status(404).render('index', {
                        staticHTML: html,
                        initialState: state,
                        meta,
                        env,
                        itunesId: process.env.ITUNES_ID
                    });
                }

                return res.render('index', {
                    staticHTML: html,
                    initialState: state,
                    meta,
                    env,
                    itunesId: process.env.ITUNES_ID
                });
            })
            .catch(err => {
                console.error('HTML generation error');
                console.dir(err);
                return res.end(err)
            });
    });
}

doRefresh().then(() => {
    console.log('CACHE IS READY');
    app.use(renderPage);
});

export default app;
