import aws                       from 'aws-sdk'
import axios                     from 'axios';
import session from 'express-session';
import {getRelatedContent, deleteRelatedContentByUri} from 'backend/admin/admin_related_services'
import {get_blogs}               from 'backend/get_blogs'
import {get_blogs_rss}           from 'backend/get_blogs_rss'
import {get_contributors}        from 'backend/get_contributors'
import {get_episodes}            from 'backend/get_episodes'
import {get_episodes_by_guid}    from 'backend/get_episodes_by_guid'
import {get_invoice}             from 'backend/get_invoice'
import {get_rfc_metadata}        from 'backend/get_rfc_metadata'
import {join_slack}              from 'backend/join_slack'
import {send_email}              from 'backend/send_email'
import {order_create}            from 'backend/order_create'
import {order_fulfill}           from 'backend/order_fulfill'
import {order_list}              from 'backend/order_list'
import {pay_invoice}             from 'backend/pay_invoice'
import {related_content, related_cache}         from 'backend/related_content'
import {ready}                   from 'backend/v1/recording';
import {write as writeProposal, upload as uploadProposalFiles}  from 'backend/v1/proposals'
import bodyParser                from 'body-parser'
import compression               from 'compression';
import {feed_uri}              from 'daos/episodes'
import {
    loadBlogs,
    loadEpisodes,
    loadProducts,
    loadAdvertiseContent,
    load,
    loadCurrentRFC
}  from 'daos/serverInit'
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
import routes                    from 'routes';
import * as reducers             from 'reducers';
import {
    createStore,
    combineReducers,
    applyMiddleware
}       from 'redux';
import getContentWrapper         from 'utils/content_wrapper';
import {
    get_blogs_list,
    get_podcasts_from_cache,
    get_related_content
}                         from 'utils/redux_loader';
import redirects_map             from './redirects';

import {reducer as formReducer} from 'redux-form'

const app = express()

var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})
app.use(morgan('combined', {stream: accessLogStream}))

var env = "prod"

var aws_accessKeyId = ""
var aws_secretAccessKey = ""
var aws_region = ""
var stripe_key = "sk_test_81PZIV6UfHDlapSAkn18bmQi"
var sp_key = "test_Z_gOWbE8iwjhXf4y4vqizQ"
var slack_key = ""
var aws_proposals_bucket = ""
var rfc_table_name = "rtc"
var latest_rfc_id = "test-request"

fs.open("config/config.json", "r", function (error, fd) {
    var buffer = new Buffer(10000)
    fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
        var data = buffer.toString("utf8", 0, bytesRead)
        var c = JSON.parse(data)
        stripe_key = c[env]['stripe']
        sp_key = c[env]['sp']
        slack_key = c[env]['slack']
        aws_accessKeyId = c[env]['aws']['accessKeyId']
        aws_secretAccessKey = c[env]['aws']['secretAccessKey']
        aws_region = c[env]['aws']['region']
        aws_proposals_bucket = c[env]['recording']['aws_proposals_bucket']
        fs.close(fd)
        aws.config.update(
            {
                "accessKeyId": aws_accessKeyId,
                "secretAccessKey": aws_secretAccessKey,
                "region": aws_region
            }
        );
    })
})

const docClient = new aws.DynamoDB.DocumentClient();

if (process.env.NODE_ENV !== 'production') {
    require('./webpack.dev').default(app);
    env = "dev"
}
console.log("Environment: ", env)

const DEFAULT_ADVERTISE_HTML = `<img src="/img/advertise.png" width="100%"/>`;

let Cache = {
    title_map: {}         // `uri`             -> <title>
    , content_map: {}       // `uri`             -? {s3 blog content}
    , blogmetadata_map: {}  // `uri`             -> {blog}
    , folders: []
    , episodes_map: {}      // `guid` | 'latest' -> {episode}
    , episodes_list: []     // guids
    , products: {}
    , contributors: {}
    , advertise: {
        card: DEFAULT_ADVERTISE_HTML,
        banner: null
    }
    , rfc: {}
};

const reducer = combineReducers({
    ...reducers,
    form: formReducer
});

global.my_cache = Cache;
global.env = env;

const doRefresh = (store) => {
    console.log("---[Refreshing cache]------------------");
    console.log(process.memoryUsage());

    let env = global.env;

    return loadAdvertiseContent(env)
        .then(([cardHtml, bannerHtml]) => {
            Cache.advertise.card = cardHtml ? cardHtml : DEFAULT_ADVERTISE_HTML;
            Cache.advertise.banner = bannerHtml;

            return loadBlogs(env)
        })
        .then(function ({folders, blogmetadata_map, title_map, content_map}) {
            console.log("-[Refreshing blogs]-");

            // clear references
            Cache.folders = null;
            delete Cache.folders;

            Cache.blogmetadata_map = null;
            delete Cache.blogmetadata_map;

            Cache.title_map = null;
            delete Cache.title_map;

            Cache.content_map = null;
            delete Cache.content_map;

            // fill the data again
            Cache.folders = folders;
            Cache.blogmetadata_map = blogmetadata_map;
            Cache.title_map = title_map;
            Cache.content_map = content_map;

            return loadEpisodes(env, feed_uri, blogmetadata_map, aws);
        })
        .then(function ({episodes_map, episodes_list}, guid) {
            console.log("-[Refreshing blogs]-");
            // clear references
            Cache.episodes_map = null;
            delete Cache.episodes_map;

            Cache.episodes_list = null;
            delete Cache.episodes_list;

            // fill the data again
            Cache.blogmetadata_map[guid] = guid;
            Cache.episodes_map = episodes_map;
            Cache.episodes_list = episodes_list;

            return loadProducts(env, Cache);
        })
        .then((products) => {
            console.log("-[Refreshing products]-");
            // clear references
            Cache.products = null;
            delete Cache.products;

            // fill the data
            Cache.products = {};
            Cache.products.items = products;
        })
        .then(() => {
            Cache.contributors = get_contributors()
            return loadCurrentRFC()
        })
        .then((rfc) => {
            Cache.rfc = rfc
            console.dir(rfc)


            console.log("Refreshing Finished")
        })
        // .then(() => global.gc())
        .catch((err) => {
            console.log(err);
        })
};

setInterval(doRefresh, 60 * 60 * 1000);

if (process.env.NODE_ENV == 'production') {
    function shouldCompress(req, res) {
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

function api_router(req, res) {
    if (req.url.indexOf('/api/slack/join') == 0) {
        var req = req.body
        join_slack(req, res, slack_key)
        return true
    }

    if (req.url.indexOf('/api/v1/proposals/files') == 0) {
        uploadProposalFiles(req, res, aws_proposals_bucket);
        return true;
    } if (req.url.indexOf('/api/v1/proposals') == 0) {
        writeProposal(req, res);
        return true;
    } else if (req.url.indexOf('/api/v1/recording/ready') == 0) {
        ready(req, res, aws_proposals_bucket);
        return true;
    } if (req.url.indexOf('/api/refresh') == 0) {
        doRefresh()
        return res.status(200).end(JSON.stringify({'status': 'ok'}))
    }
    else if (req.url.indexOf('/api/email/send') == 0) {
        send_email(req, res)
        return true
    }
    else if (req.url.indexOf('/api/invoice/pay') == 0) {
        pay_invoice(req, res, stripe_key)
        return true
    }
    else if (req.url.indexOf('/api/invoice') == 0) {
        get_invoice(req, res)
        return true
    }
    else if (req.url.indexOf('/api/order/create') == 0) {
        order_create(req, res, sp_key)
        return true
    }
    else if (req.url.indexOf('/api/order/fulfill') == 0) {
        order_fulfill(req, res, stripe_key)
        return true
    }
    else if (req.url.indexOf('/api/order/list') == 0) {
        order_list(req, res, stripe_key)
        return true
    }
    else if (req.url.indexOf('/api/contributors/list') == 0) {
        var req = req.body
        var resp = get_contributors()
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
        get_blogs_rss(req, res, Cache.blogmetadata_map);
        return true
    }
    else if (req.url.indexOf('/api/blog') === 0) {
        get_blogs(req, res, Cache.blogmetadata_map, env);
        return true
    }
    else if (req.url.indexOf('/api/store/list') == 0) {
        var products = Cache.products
        return res.status(200).end(JSON.stringify(products))
    }
    else if (req.url.indexOf('/api/episodes/list') == 0) {
        get_episodes(req, res, Cache.episodes_map, Cache.episodes_list)
        return true
    }
    else if (req.url.indexOf('/api/episodes/get') == 0) {
        get_episodes_by_guid(req, res, Cache.episodes_map, Cache.episodes_list)
        return true
    }
    else if (req.url == '/api/rfc/list') {
        get_rfc_metadata(req, res, Cache, docClient, rfc_table_name, latest_rfc_id)
        return true
    } else if (req.url == '/api/test') {
        return res.status(200).end(JSON.stringify(Cache.blogmetadata_map));
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
    }

    return false
}

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

function inject_homepage(store, my_cache, pathname) {
    var map = my_cache.blogmetadata_map
    var blog_metadata = map["latest"]
    if (blog_metadata != undefined) {
        var pn = blog_metadata.prettyname
        var blog_page = pn.substring('/blog'.length, pn.length)
        var content = my_cache.content_map[pn]
        if (content == undefined) {
            content = ""
        }
        install_blog(store, blog_metadata, content)
        var episode = my_cache.episodes_map["latest"]
        install_episode(store, episode);
    }
    install_blog(store, blog_metadata, content)
    var episode = my_cache.episodes_map["latest"]
    install_episode(store, episode)
}

function inject_products(store, my_cache, pathname) {
    var products = my_cache.products['items']
    store.dispatch({type: "ADD_PRODUCTS", payload: products})
}

function inject_podcast(store, my_cache, pathname) {
    var episodes = get_podcasts_from_cache(my_cache, pathname)
    store.dispatch({type: "ADD_EPISODES", payload: episodes})
}

function install_blog(store, blog_metadata, content) {
    var author = blog_metadata['author'].toLowerCase()
    var contributors = get_contributors()
    var contributor = contributors[author]
    var loaded = 1
    var blog = blog_metadata
    var pathname = "/blog" + blog.prettyname

    const related = related_cache[pathname] || [];
    blog.related = related;
    var blog_focus = {blog, loaded, content, pathname, contributor};

    const post = {
        ...blog,
        content
    };

    store.dispatch({type: "LOAD_BLOG_POST_SUCCESS", payload: {post}});
    store.dispatch({type: "SET_FOCUS_BLOG", payload: {blog_focus}});
}

function install_episode(store, episode) {
    console.log('install_episode')
    store.dispatch({type: "SET_FOCUS_EPISODE", payload: episode})
}

function inject_blog(store, my_cache, pathname) {
    var blog_page = pathname.substring('/blog'.length, pathname.length)
    var content = my_cache.content_map[blog_page]
    if (content == undefined) {
        content = ""
    }
    var blog_metadata = my_cache.blogmetadata_map[blog_page]
    if (blog_metadata == undefined) {
        blog_metadata = {}
        var dispatch = store.dispatch
        var blogs = get_blogs_list(dispatch, pathname)
        console.log("Could not find blog_metadata for " + blog_page)
    } else {
        var guid = blog_metadata.guid
        if (guid != undefined) {
            var episode = my_cache.episodes_map[guid]
            if (episode != undefined) {
                install_episode(store, episode)
            } else {
                console.log("Bogus guid found")
            }
        } else {
            var guid = blog_metadata.guid
            if (guid) {
                var episode = my_cache.episodes_map[guid]
                if (episode) {
                    blog_metadata['preview'] = episode.img;
                    install_episode(store, episode)
                } else {
                    console.log("Bogus guid found")
                }
            } else {
                console.log("No episode guid found")
            }

            install_blog(store, blog_metadata, content)
        }

        install_blog(store, blog_metadata, content)
    }
    console.log("done with blog inject")
}

function updateState(store, pathname, req) {
    inject_folders(store, Cache)
    inject_years(store, Cache)

    store.dispatch({type: "PROPOSAL_SET_BUCKET", payload: {aws_proposals_bucket} })

    var contributors = get_contributors();
    store.dispatch({type: "LOAD_CONTRIBUTORS_LIST_SUCCESS", payload: {contributors}});

    if (pathname === "" || pathname === "/") {
        inject_homepage(store, Cache, pathname)
    }
    if (pathname.indexOf('/blog') === 0) {
        inject_blog(store, Cache, pathname)
    }
    else if (pathname === "/members" || pathname === "/store") {
        inject_products(store, Cache, pathname)
    }
    else if (pathname.indexOf("/podcast") === 0) {
        inject_podcast(store, Cache, pathname)
    }

    store.dispatch({type: "ADD_FOLDERS", payload: Cache.folders});

    store.dispatch({
        type: 'SET_ADVERTISE_CARD_CONTENT',
        payload: {
            content: Cache.advertise.card
        }
    })

    store.dispatch({
        type: 'SET_ADVERTISE_BANNER_CONTENT',
        payload: {
            content: Cache.advertise.banner
        }
    })

    store.dispatch({
        type: 'FETCH_CURRENT_PROPOSAL_SUCCESS',
        payload: {
            data: Cache.rfc
        }
    })
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const api = require('./backend/api/v1');
app.use('/api/v1/', api(Cache));

// authorization module
app.use(session({secret : "DATAS"}))

/***
 * DUMP GENERATION
 */
// const heapdump = require('heapdump');
// setInterval(() => {
//     console.log('writing dump');
//     heapdump.writeSnapshot('heap/' + Date.now() + '.heapsnapshot');
// }, 60000);

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

const renderPage = (req, res) => {
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

    match({routes, location}, (err, redirectLocation, renderProps) => {
        console.log('doing response');

        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            res.render('error');
        }

        let store = applyMiddleware(thunk, promiseMiddleware)(createStore)(reducer);
        updateState(store, location.pathname, req);

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(() => renderView(store, renderProps, location))
            .then(({html, state, meta}) => {
                res.render('index', {
                    staticHTML: html,
                    initialState: state,
                    meta,
                    env
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
