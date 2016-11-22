import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

import axios from "axios"
import xml2js from "xml2js"

import { calculateShipping, calculateTotal } from './store_utils'

import Header from './Header'
import Menu from './Menu'
import Player from './Player'
import Home from './Home'
import Podcast from './Podcast'
import Blog from './Blog'
import Videos from './Videos'
import Projects from './Projects'
import Store from './Store'
import Checkout from './Checkout'
import Services from './Services'
import Membership from './Membership'
import Footer from './Footer'
import NotFound from './NotFound'
import LightsOut from './LightsOut'
import Sidebar from './Sidebar'

const MatchWithProps = ({ component: Component, props, ...rest }) => (
  <Match {...rest} render={(matchProps) => (
    <Component {...props} {...matchProps} />
  )}/>
);

export default class Site extends React.Component {
	constructor(props) {
		super(props)

		var env = "dev"
		var bucket = env + ".dataskeptic.com"
		if (env == "master") {
			bucket = "dataskeptic.com"
		}

		/* Keep a 10 minute cache of things normally pulled dynamically */
		var cacheSeconds = 60 * 10
		var now = new Date().getTime()/1000
		var lastCacheEpisodes = 0
		var lastCacheBlogs = 0
		var lastCacheProducts = 0
		var lastCacheVideos = 0
		try {
			lastCacheEpisodes = localStorage.getItem("lastCacheEpisodes")
			lastCacheBlogs = localStorage.getItem("lastCacheBlogs")
			lastCacheProducts = localStorage.getItem("lastCacheProducts")
			lastCacheVideos = localStorage.getItem("lastCacheVideos")
		} catch(err) {
			lastCacheEpisodes = 0
			lastCacheBlogs = 0
			lastCacheProducts = 0
			lastCacheVideos = 0
		}
		var episodes_loaded = false
		var blogs_loaded = false
		var products_loaded = false
		var videos_loaded = false
		var episodes = []
		var episodeMap = {}
		var blogs = []
		var products = []
		var videos = []
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
				episodeMap = this.generateEpisodeMap(episodes)
			} else {
				episodes = []
			}
		}
		if (now - lastCacheBlogs < cacheSeconds) {
			blogs = JSON.parse(localStorage.getItem("blogs"))
			var folders = []
			if (blogs != undefined) {
				blogs_loaded = true
				folders = this.extractFolders(blogs)
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
		if (now - lastCacheVideos < cacheSeconds) {
			videos = JSON.parse(localStorage.getItem("videos"))
			if (videos != undefined && videos.length > 0) {
				videos_loaded = true
			} else {
				videos = []
			}
		}

		// Reload cart if it exists
		var cart_items = Array()
		try {
			cart_items = JSON.parse(localStorage.getItem("cart"))
			if (cart_items == undefined) {
				cart_items = []
			}
		} catch (err) {
			cart_items = Array()
		}

		var persisted = this.loadState()
		var total = calculateTotal(persisted.cart_items, persisted.country.short)
		var shipping = calculateShipping(persisted.cart_items, persisted.country.short)

		this.state = {
			env: env,
			bucket: bucket,
			episodes: episodes,
			episodeMap: episodeMap,
			episodes_loaded: episodes_loaded,
			blogs: blogs,
			blogs_loaded: blogs_loaded,
			folders: folders,
			products: products,
			products_loaded: products_loaded,
			cart_items: persisted.cart_items,
			cart_right: undefined,
			cart_visible: false,
			total: total,
			shipping: shipping,
			router: undefined,
			country: persisted.country,
			videos: videos,
			videos_loaded: videos_loaded,
			player: {
				episode: undefined,
				is_playing: false,
				has_shown: false
			}
		}
		console.log("Cache loaded blogs:" + blogs_loaded + " episodes:" + episodes_loaded + " products:" + products_loaded)


		var me = this

		if (!blogs_loaded) {
			console.log("Get blog")
			axios
				.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/blog?env=" + env)
				.then(function(result) {
					var blogs = result.data
					var blogs_loaded = true
					var folders = me.extractFolders(blogs)
					me.setState({blogs, blogs_loaded, folders})
					localStorage.setItem("blogs", JSON.stringify(blogs))
					localStorage.setItem("lastCacheBlogs", new Date().getTime()/1000)
					console.log("Loaded blogs")
				});			
		}

		if (!episodes_loaded) {
			console.log("Get episodes")
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
					var episodeMap = me.generateEpisodeMap(episodes)
					var episodes_loaded = true
					me.setState({episodes, episodes_loaded, episodeMap})
					localStorage.setItem("episodes", JSON.stringify(episodes))
					localStorage.setItem("lastCacheEpisodes", new Date().getTime()/1000)
				});
				console.log("loaded episodes")	
			})			
		}

		if (!products_loaded) {
			console.log("Get products")
			axios
				.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/products")
				.then(function(result) {
					var products = result.data.Items
					if (products != undefined) {
						var products_loaded = true
						me.setState({products, products_loaded})
						localStorage.setItem("products", JSON.stringify(products))
						localStorage.setItem("lastCacheProducts", new Date().getTime()/1000)
						console.log("Loaded products")
					}
				});
		}
		if (!videos_loaded) {
			console.log("Get videos")
			videos = []
			this.state.videos = videos
			axios
				.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/videos")
				.then(function(result) {
					var videos = result.data
					if (videos != undefined) {
						var videos_loaded = true
						me.setState({videos, videos_loaded})
						localStorage.setItem("videos", JSON.stringify(videos))
						localStorage.setItem("lastCacheVideos", new Date().getTime()/1000)
						console.log("Loaded videos")
					}
				});
		}

		this.onPlayToggle = this.onPlayToggle.bind(this)
		this.addToCart = this.addToCart.bind(this)
		this.updateCartQuantity = this.updateCartQuantity.bind(this)
		this.loadState = this.loadState.bind(this)
		this.toggleCart = this.toggleCart.bind(this)
	}

	loadState() {
		var cart_items = []
		var country = {short: "us", long: "United State of America"}
		var raw = localStorage.getItem("cart_items")
		if (raw != undefined) {
			cart_items = JSON.parse(raw)
		}
		raw = localStorage.getItem("country")
		if (raw != undefined) {
			country = JSON.parse(raw)
		}
		return {cart_items, country}
	}

	extractFolders(blogs) {
		var folders = []
		if (blogs != undefined) {
			for (var i in blogs) {
				var b = blogs[i]
				var pn = b["prettyname"]
				var arr = pn.split("/")
				var level = 0
				if (arr.length >= level+2) {
					var folder = arr[level+1]
					folders.push(folder)
				}
			}
			folders = folders.reduce((a, x) => a.includes(x) ? a : [...a, x], []).sort()
		}
		return folders
	}

	generateEpisodeMap(episodes) {
		var map = {}
		for (var i=0; i < episodes.length; i++) {
			var episode = episodes[i]
			var guid = episode.guid
			map[guid] = episode
		}
		return map
	}

	onPlayToggle(episode) {
		var player = this.state.player
		if (episode == undefined) {
			console.log("Stopping playback")
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
	
	onChangeCountry(short, long) {
		var country = {short, long}
		var total = calculateTotal(this.state.cart_items, short)
		var shipping = calculateShipping(this.state.cart_items, short)
		this.setState({country, total, shipping})
		localStorage.setItem("country", JSON.stringify(country))
	}

	addToCart(product, size) {
		var quan = 1
		if (size == undefined) {
			size = ""
		}
		var cart_elem = {product, size, quan}
		var s = JSON.stringify(this.state.cart_items)
		var cart_items = JSON.parse(s)
		var found = false
		for (var i in cart_items) {
			var item = cart_items[i]
			if (item['product']['id'] == product['id'] && item['size'] == size) {
				item['quan'] += 1
				found = true
			}
		}
		if (!found) {
			cart_items.push(cart_elem)
		}
		var short = this.state.country.short
		var total = calculateTotal(cart_items, short)
		var shipping = calculateShipping(cart_items, short)
		this.setState({cart_items, total, shipping})
		localStorage.setItem("cart_items", JSON.stringify(cart_items))
	}

	clearCart() {
		var total = 0
		var shipping = 0
		var cart_items = []
		this.setState({cart_items, total, shipping})
		localStorage.setItem("cart_items", JSON.stringify(cart_items))
	}

	updateCartQuantity(product, size, delta) {
		if (size == undefined) {
			size = ""
		}
		var cart_items = JSON.parse(JSON.stringify(this.state.cart_items))
		for (var i in cart_items) {
			var item = cart_items[i]
			if (item['product']['id'] == product['id'] && item['size'] == size) {
				item['quan'] += delta
				if (item['quan'] <= 0) {
					cart_items.splice(i, 1)
				}
				i = cart_items.length
			}
		}
		var short = this.state.country.short
		var total = calculateTotal(cart_items, short)
		var shipping = calculateShipping(cart_items, short)
		this.setState({cart_items, total, shipping})
		localStorage.setItem("cart_items", JSON.stringify(cart_items))
	}
    toggleCart() {
    	var cart_visible = this.state.cart_visible
    	cart_visible = !cart_visible
    	this.setState({cart_visible: cart_visible})
    }

	render() {
		var env = this.state.env
		var prod = false
		if (env == "master") {
			prod = true
		}
		var blogs = this.state.blogs
		var episodes = this.state.episodes
		var episodeMap = this.state.episodeMap
		var products = this.state.products
		var videos = this.state.videos
		var blogs_loaded = this.state.blogs_loaded
		var episodes_loaded = this.state.episodes_loaded
		var products_loaded = this.state.products_loaded
		var player = this.state.player
		var cart_items = this.state.cart_items
		var item_count = 0
		for (var i=0; i < cart_items.length; i++) {
			var item = cart_items[i]
			item_count += item.quan
		}
		var total = this.state.total
		var shipping = this.state.shipping
		var bucket = this.state.bucket
		var folders = this.state.folders
		var cart_visible = this.state.cart_visible
		return (
			<Router>
				<div class="site">
					<div class="container-fluid">
						<div class="row row-centered">
							<Header />
						</div>
						<div class="row row-centered">
							<MatchWithProps pattern="*" component={Menu} props={{ item_count, toggleCart: this.toggleCart }} />
						</div>
						<div class="row row-centered">
							<Player config={player} onPlayToggle={this.onPlayToggle.bind(this)} episodes_loaded={this.state.episodes_loaded} />
						</div>
						<MatchWithProps exactly pattern="/"          component={Home}    props={{ episodes, blogs, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
						<MatchWithProps exactly pattern="/index.htm" component={Home}    props={{ episodes, blogs, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
						<MatchWithProps pattern="/podcast"           component={Podcast} props={{ episodes, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
						<MatchWithProps pattern="/blog*"             component={Blog}    props={{ blogs, folders, episodeMap, blogs_loaded, bucket, onPlayToggle: this.onPlayToggle.bind(this) }} />
						<MatchWithProps pattern="/video"             component={Videos}  props={{ videos }} />
						<Match pattern="/proj" component={Projects} />
						<MatchWithProps pattern="/store"             component={Store}    props={{ products, products_loaded, cart_items, total, shipping, country: this.state.country, updateCartQuantity: this.updateCartQuantity.bind(this), onChangeCountry: this.onChangeCountry.bind(this), addToCart: this.addToCart.bind(this) }} />
						<MatchWithProps pattern="/checkout"          component={Checkout} props={{ products, products_loaded, cart_items, total, shipping, country: this.state.country, updateCartQuantity: this.updateCartQuantity.bind(this), onChangeCountry: this.onChangeCountry.bind(this), clearCart: this.clearCart.bind(this), prod }} />
						<Match pattern="/services" component={Services} />
						<MatchWithProps pattern="/members"           component={Membership} props={{ products, products_loaded, addToCart: this.addToCart.bind(this) }} />
						<Match pattern="/lightsout" component={LightsOut} />
						<Miss component={NotFound} />
						<Footer />
						<Sidebar className="sidebar" toggleCart={this.toggleCart} cart_visible={cart_visible} cart_items={this.state.cart_items} updatable={true} onChangeCountry={this.onChangeCountry.bind(this)} country={this.state.country} updateCartQuantity={this.state.updateCartQuantity} shipping={this.state.shipping} total={this.state.total} />
					</div>
				</div>
			</Router>
		)
	}
}


/*
PLAYER
Spinning logo on waiting for file download in all relevant buttons, not use bar
howler working?

mathjax http://localhost:8080/blog/episodes/2014/bayesian-updating

create redirects map from XML

Stripe recurring for memberships

configure env for Production
google analytics
redirects on old content
SEO / crawlable?

crypto episode notes
z-scores script in show notes broken
BLOG author images
generateEpisodeMapfeed.rss lambda download
from blog card, get from only non-epsiode, non-transcript
caurosel taller
transcripts linked from episode

causal impact
99% invisible for download
*/




/*
LATER
	Guest profile pages
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

