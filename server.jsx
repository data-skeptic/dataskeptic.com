import aws                       from 'aws-sdk'
import axios                     from 'axios';
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
import {related_content}         from 'backend/related_content'
import bodyParser                from 'body-parser'
import compression               from 'compression';
import {feed_uri}              from 'daos/episodes'
import {
    loadBlogs,
    loadEpisodes,
    loadProducts
}          from 'daos/serverInit'
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
    get_podcasts_from_cache
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

aws.config.loadFromPath('awsconfig.json')

if (process.env.NODE_ENV !== 'production') {
    require('./webpack.dev').default(app);
    env = "dev"
}
console.log("Environment: ", env)

var my_cache = {
    title_map: {}         // `uri`             -> <title>
    , content_map: {}       // `uri`             -? {s3 blog content}
    , blogmetadata_map: {}  // `uri`             -> {blog}
    , folders: []
    , episodes_map: {}      // `guid` | 'latest' -> {episode}
    , episodes_list: []     // guids
    , products: {}
}

const reducer = combineReducers({
    ...reducers,
    form: formReducer
});
const store = applyMiddleware(thunk, promiseMiddleware)(createStore)(reducer);
let initialState = store.getState()
delete initialState.checkout;


global.env = env
global.my_cache = my_cache

const doRefresh = () => {
    process.nextTick(() => {
        console.log("---[Refreshing cache]------------------");
        console.log(process.memoryUsage());

        let env = global.env;
        let my_cache = global.my_cache;

        loadBlogs(store, env, my_cache);
        loadProducts(env, my_cache);
        loadEpisodes(env, feed_uri, my_cache, aws);
    });
};

setInterval(() => {
    try {
        doRefresh()
    } catch (err) {
        console.error(err);
    }
}, 60 * 60 * 1000);

doRefresh();

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


var stripe_key = "sk_test_81PZIV6UfHDlapSAkn18bmQi"
var sp_key = "test_Z_gOWbE8iwjhXf4y4vqizQ"
var slack_key = ""

fs.open("config.json", "r", function (error, fd) {
    var buffer = new Buffer(10000)
    fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
        var data = buffer.toString("utf8", 0, bytesRead)
        var c = JSON.parse(data)
        var env2 = env
        stripe_key = c[env2]['stripe']
        sp_key = c[env2]['sp']
        slack_key = c[env2]['slack']
        fs.close(fd)
    })
})

function api_router(req, res) {
    if (req.url.indexOf('/api/slack/join') == 0) {
        var req = req.body
        join_slack(req, res, slack_key)
        return true
    }
    if (req.url.indexOf('/api/refresh') == 0) {
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
    else if (req.url.indexOf('/api/related') == 0) {
        related_content(req, res)
        return true
    }
    else if (req.url == '/api/blog/categories') {
        var folders = my_cache.folders
        return res.status(200).end(JSON.stringify(folders))
    }
    else if (req.url.indexOf('/api/blog/rss') === 0) {
        get_blogs_rss(req, res, my_cache.blogmetadata_map);
        return true
    }
    else if (req.url.indexOf('/api/blog') === 0) {
        get_blogs(req, res, my_cache.blogmetadata_map, env);
        return true
    }
    else if (req.url.indexOf('/api/store/list') == 0) {
        var products = my_cache.products
        return res.status(200).end(JSON.stringify(products))
    }
    else if (req.url.indexOf('/api/episodes/list') == 0) {
        get_episodes(req, res, my_cache.episodes_map, my_cache.episodes_list)
        return true
    }
    else if (req.url.indexOf('/api/episodes/get') == 0) {
        get_episodes_by_guid(req, res, my_cache.episodes_map, my_cache.episodes_list)
        return true
    }
    else if (req.url == '/api/rfc/list') {
        get_rfc_metadata(req, res, my_cache)
        return true
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
        install_episode(store, episode)
    }
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
    var blog_focus = {blog, loaded, content, pathname, contributor}

    const post = {
        ...blog,
        content
    };

    store.dispatch({type: "LOAD_CONTRIBUTORS_LIST_SUCCESS", payload: {contributors}});
    store.dispatch({type: "LOAD_BLOG_POST_SUCCESS", payload: {post}})
}

function install_episode(store, episode) {
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
            console.log("No episode guid found")
        }

        install_blog(store, blog_metadata, content)
    }
    console.log("done with blog inject")
}

function updateState(store, pathname) {
    var my_cache = global.my_cache
    inject_folders(store, my_cache)
    inject_years(store, my_cache)
    if (pathname == "" || pathname == "/") {
        inject_homepage(store, my_cache, pathname)
    }
    if (pathname.indexOf('/blog') == 0) {
        inject_blog(store, my_cache, pathname)
    }
    else if (pathname == "/members" || pathname == "/store") {
        inject_products(store, my_cache, pathname)
    }
    else if (pathname.indexOf("/podcast") == 0) {
        inject_podcast(store, my_cache, pathname)
    }
}

app.use((req, res) => {
    if (req.url == '/favicon.ico') {
        return res.redirect(301, 'https://s3.amazonaws.com/dataskeptic.com/favicon.ico')
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

    const location = createLocation(req.url);

    match({routes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            var title = "Page not found"
            var componentHTML = "<div><h1>Not Found</h1><p>You've encountered a bogus link, deprecated link, or bug in our site.  Either way, please nagivate to <a href=\"http://dataskeptic.com\">dataskeptic.com</a> to get back on course.</p></div>"

            var injects = {
                "react-view": componentHTML
            }

            var HTML = getContentWrapper(title, initialState, injects)
            var pathname = location.pathname
            console.log("page not found:" + pathname)
            return res.status(404).end(componentHTML);
        }

        function renderView() {
            const store = applyMiddleware(thunk, promiseMiddleware)(createStore)(reducer)
            updateState(store, location.pathname)

            const InitialView = (
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            );

            var title = "Data Skeptic"
            var pathname = location.pathname.substring('/blog'.length, location.pathname.length)
            var alt_title = my_cache.title_map[pathname]
            if (alt_title != undefined) {
                title = alt_title
            }

            const componentHTML = renderToString(InitialView)

            var injects = {
                "react-view": componentHTML
            }

            const state = store.getState()
            const HTML = getContentWrapper(title, state, injects)
            return HTML;
        }

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(renderView)
            .then(html => res.status(200).end(html))
            .catch(err => {
                console.error('HTML generation error');
                console.dir(err);
                return res.end(err)
            });
    });
});

export default app;
