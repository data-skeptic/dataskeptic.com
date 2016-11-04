import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

import axios from "axios"
import xml2js from "xml2js"

import Header from './Header'
import Player from './Player'
import Home from './Home'
import Podcast from './Podcast'
import Blog from './Blog'
import Video from './Video'
import Projects from './Projects'
import Store from './Store'
import Services from './Services'
import Membership from './Membership'
import Footer from './Footer'
import NotFound from './NotFound'

const MatchWithProps = ({ component: Component, props, ...rest }) => (
  <Match {...rest} render={(matchProps) => (
    <Component {...props} {...matchProps} />
  )}/>
);

export default class Site extends React.Component {
	constructor(props) {
		super(props)

		/* Keep a 10 minute cache of things normally pulled dynamically */
		var cacheSeconds = 60 * 10
		var now = new Date().getTime()/1000
		var lastCacheEpisodes = 0
		var lastCacheBlogs = 0
		var lastCacheProducts = 0
		try {
			lastCacheEpisodes = localStorage.getItem("lastCacheEpisodes")
			lastCacheBlogs = localStorage.getItem("lastCacheBlogs")
			lastCacheProducts = localStorage.getItem("lastCacheProducts")
		} catch(err) {
			lastCacheEpisodes = 0
			lastCacheBlogs = 0
			lastCacheProducts = 0
		}
		var episodes_loaded = false
		var blogs_loaded = false
		var products_loaded = false
		var episodes = []
		var blogs = []
		var products = []
		if (now - lastCacheEpisodes < cacheSeconds) {
			episodes = JSON.parse(localStorage.getItem("episodes"))
			if (episodes != undefined) {
				episodes_loaded = true
				for (var i in episodes) {
					var ep = episodes[i]
					var dstr = ep["pubDate"]
					var pubDate = new Date(ep["pubDate"])
					ep["pubDate"] = pubDate
				}
			} else {
				episodes = []
			}
		}
		if (now - lastCacheBlogs < cacheSeconds) {
			blogs = JSON.parse(localStorage.getItem("blogs"))
			if (blogs != undefined) {
				blogs_loaded = true
			} else {
				blogs = []
			}
		}
		if (now - lastCacheProducts < cacheSeconds) {
			products = JSON.parse(localStorage.getItem("products"))
			if (products != undefined) {
				products_loaded = true
			} else {
				products = []
			}
		}

		this.state = {
			"episodes": episodes,
			"episodes_loaded": episodes_loaded,
			"blogs": blogs,
			"blogs_loaded": blogs_loaded,
			"products": products,
			"products_loaded": blogs_loaded,
			"player": {
				"episode": undefined,
				"is_playing": false,
				"has_shown": false
			}
		}
		console.log("Cache loaded blogs:" + blogs_loaded + " episodes:" + episodes_loaded + " products:" + products_loaded)


		var me = this

		if (!blogs_loaded) {
			axios
				.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/blog")
				.then(function(result) {
					var blogs = result.data.Items
					var blogs_loaded = true
					me.setState({blogs, blogs_loaded})
					localStorage.setItem("blogs", JSON.stringify(blogs))
					localStorage.setItem("lastCacheBlogs", new Date().getTime()/1000)
					console.log("Loaded blogs")
				});			
		}

		if (!episodes_loaded) {
			axios
			  .get("http://dataskeptic.libsyn.com/rss")
			  .then(function(result) {
			  	var xml = result["data"]
				var extractedData = "";
				var parser = new xml2js.Parser();
				var year = me.year
				parser.parseString(xml, function(err,rss) {
					var episodes = []
					var items = rss["rss"]["channel"][0]["item"]
					items.map(function(item) {
						var mp3 = item["enclosure"][0]["$"]["url"]
						var dstr = item["pubDate"][0]
						var pubDate = new Date(dstr)
						var episode = {
							"title": item["title"][0],
							"desc": item["description"][0],
							"pubDate": pubDate,
							"mp3": mp3,
							"duration": item["itunes:duration"][0],
							"img": item["itunes:image"][0]["$"]["href"],
							"guid": item["guid"][0]["_"],
							"link": item["link"][0]
						}
						episodes.push(episode)
					})
					var episodes_loaded = true
					me.setState({episodes, episodes_loaded})
					localStorage.setItem("episodes", JSON.stringify(episodes))
					localStorage.setItem("lastCacheEpisodes", new Date().getTime()/1000)
				});
				console.log("loaded episodes")	
			})			
		}

		if (!products_loaded) {
			axios
				.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/products")
				.then(function(result) {
					var products = result.data.Items
					var products_loaded = true
					me.setState({products, products_loaded})
					localStorage.setItem("products", JSON.stringify(products))
					localStorage.setItem("lastCacheProducts", new Date().getTime()/1000)
					console.log("Loaded memberships")
				});			
		}


		this.onPlayToggle = this.onPlayToggle.bind(this)
	}

	onPlayToggle(episode) {
		var player = this.state.player
		if (episode == undefined) {
			console.log("Got request to play undefined episode.")
			this.setState({player: {is_playing: false}})
		} else {
			var s = this.state
			s.player.has_shown = true
			if (player.is_playing) {
				if (episode == undefined) {
					console.log("Unusual situation for player to be in, but I can fix it")
					s.player.episode = episode
					s.player.is_playing = true
					this.setState(s)
				} else {
					if (episode.guid == player.episode.guid) {
						s.player.is_playing = false
						this.setState(s)
					} else {
						s.player.episode = episode
						s.player.is_playing = true
						this.setState(s)
					}
				}
			} else {
				s.player.episode = episode
				s.player.is_playing = true
				this.setState(s)
			}
		}
	}
	
	render() {
		var products = this.state.products
		var products_loaded = this.state.products_loaded
		var player = this.state.player
		return (
			<Router>
				<div>
					<Header />
					<div className="menu">
						<ul class="topnav">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/podcast">Podcast</Link></li>
							<li><Link to="/blog">Blog</Link></li>
							<li><Link to="/video">Videos</Link></li>
							<li><Link to="/store">Store</Link></li>
							<li><Link to="/proj">Projects</Link></li>
							<li><Link to="/services">Services</Link></li>
							<li class="right"><Link to="/members">Membership</Link></li>
						</ul>
					</div>
					<Player config={player} onPlayToggle={this.onPlayToggle.bind(this)} episodes_loaded={this.state.episodes_loaded} />
					<MatchWithProps exactly pattern="/"          component={Home}    props={{ episodes: this.state.episodes, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
					<MatchWithProps exactly pattern="/index.htm" component={Home}    props={{ episodes: this.state.episodes, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
					<MatchWithProps pattern="/podcast"           component={Podcast} props={{ episodes: this.state.episodes, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
					<Match pattern="/blog" component={Blog} />
					<Match pattern="/video" component={Video} />
					<Match pattern="/proj" component={Projects} />
					<MatchWithProps pattern="/store"             component={Store}   props={{ products, products_loaded }} />
					<Match pattern="/services" component={Services} />
					<MatchWithProps pattern="/members"           component={Membership} props={{ products, products_loaded }} />
					<Miss component={NotFound} />
					<Footer />
				</div>
			</Router>
		)
	}
}


/*
HOME
	# TODO: social tile
	# TODO: from the archives tile
	# TODO: Latest blog tile
	# TODO: live statistics tile
	# TODO: Player progress bar
BLOG
	# TODO: admin page to update blog content - add tags, release date, author, prettyname, title, tags
					level - beginner, intermedia, advanced
	# TODO: easy preview before publish
	# TODO: author images
	# TODO: API Gateway to return blog metadata
	# TODO: React router
	# TODO: upload knitr figures to S3
	# TODO: Blog.js Categories
	# TODO: Blog.js rendering
	# TODO: Blog.js email sign up form
	# TODO: Deep link handling from S3 per that guy's blog using cloud watch error routing
	# TODO: migrate existing blog content
VIDEOS
	# TODO: static content
PROJECTS
	# static content
	# TODO: open house
	# TODO: Causal impact
STORE
	# TODO: Shopify
	# TODO: migrate old content
	# TODO: backend database
	# TODO: notifications
SERVICES
	# static content
MEMBERSHIP
	# TODO: content
	# TODO: Shopify integration
MISC
	# TODO: redirects on old content, especially show notes pages from feed
	# TODO: error page logging to cloudfront
	# TODO: realtime refresh?
	# TODO: SEO / crawlable?
LATER
	# TODO: Set 1 hour callback to refresh xml
	# TODO: t-shirt integration
*/

