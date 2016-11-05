import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

import axios from "axios"
import xml2js from "xml2js"

import Header from './Header'
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

const MatchWithProps = ({ component: Component, props, ...rest }) => (
  <Match {...rest} render={(matchProps) => (
    <Component {...props} {...matchProps} />
  )}/>
);

export default class Site extends React.Component {
	constructor(props) {
		super(props)

		/* Keep a 10 minute cache of things normally pulled dynamically */
		var cacheSeconds = 60 * 10 * 60*24
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

		this.state = {
			"episodes": episodes,
			"episodes_loaded": episodes_loaded,
			"blogs": blogs,
			"blogs_loaded": blogs_loaded,
			"products": products,
			"products_loaded": blogs_loaded,
			"cart_items": cart_items,
			"videos": videos,
			"videos_loaded": videos_loaded,
			"player": {
				"episode": undefined,
				"is_playing": false,
				"has_shown": false
			}
		}
		console.log("Cache loaded blogs:" + blogs_loaded + " episodes:" + episodes_loaded + " products:" + products_loaded)


		var me = this

		if (!blogs_loaded) {
			console.log("Get blog")
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
					var episodes_loaded = true
					me.setState({episodes, episodes_loaded})
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
					var products_loaded = true
					me.setState({products, products_loaded})
					localStorage.setItem("products", JSON.stringify(products))
					localStorage.setItem("lastCacheProducts", new Date().getTime()/1000)
					console.log("Loaded memberships")
				});			
		}
		if (!videos_loaded) {
			console.log("Get videos")
			videos = [{videoId: "RxtHeXHOdf0"}, {videoId: "cHoRn1UxEzk"}]
			this.state.videos = videos
			/*
			axios
				.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/videos")
				.then(function(result) {
					var videos = result.data.Items
					var videos_loaded = true
					me.setState({videos, videos_loaded})
					localStorage.setItem("videos", JSON.stringify(videos))
					localStorage.setItem("lastCacheVideos", new Date().getTime()/1000)
					console.log("Loaded videos")
				});
			*/
		}

		this.onPlayToggle = this.onPlayToggle.bind(this)
		this.addToCart = this.addToCart.bind(this)
		this.updateCartQuantity = this.updateCartQuantity.bind(this)
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
	
	addToCart(product, size) {
		var quan = 1
		if (size == undefined) {
			size = ""
		}
		var cart_elem = {product, size, quan}
		var cart_items = JSON.parse(JSON.stringify(this.state.cart_items))
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
		this.setState({cart_items})
		localStorage.setItem("cart", JSON.stringify(cart_items))
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
		this.setState({cart_items})
		localStorage.setItem("cart", JSON.stringify(cart_items))
	}

	render() {
		var blogs = this.state.blogs
		var episodes = this.state.episodes
		var products = this.state.products
		var videos = this.state.videos
		var blogs_loaded = this.state.blogs_loaded
		var episodes_loaded = this.state.episodes_loaded
		var products_loaded = this.state.products_loaded
		var player = this.state.player
		var cart_items = this.state.cart_items
		if (cart_items.length == 0) {
			var cart_link = <div></div>
		} else {
			var cart_link = <li><Link to="/checkout"><img class="menu-img" src="/img/png/checkout.png" /></Link></li>
		}
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
							{cart_link}
							<li class="right"><Link to="/members">Membership</Link></li>
						</ul>
					</div>
					<Player config={player} onPlayToggle={this.onPlayToggle.bind(this)} episodes_loaded={this.state.episodes_loaded} />
					<MatchWithProps exactly pattern="/"          component={Home}    props={{ episodes, blogs, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
					<MatchWithProps exactly pattern="/index.htm" component={Home}    props={{ episodes, blogs, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
					<MatchWithProps pattern="/podcast"           component={Podcast} props={{ episodes, onPlayToggle: this.onPlayToggle.bind(this), config: {player} }} />
					<MatchWithProps pattern="/blog"              component={Blog}    props={{ blogs, blogs_loaded }} />
					<MatchWithProps pattern="/video"             component={Videos}  props={{ videos }} />
					<Match pattern="/proj" component={Projects} />
					<MatchWithProps pattern="/store"             component={Store}    props={{ products, products_loaded, cart_items, updateCartQuantity: this.updateCartQuantity.bind(this), addToCart: this.addToCart.bind(this) }} />
					<MatchWithProps pattern="/checkout"          component={Checkout} props={{ products, products_loaded, cart_items, updateCartQuantity: this.updateCartQuantity.bind(this) }} />
					<Match pattern="/services" component={Services} />
					<MatchWithProps pattern="/members"           component={Membership} props={{ products, products_loaded, addToCart: this.addToCart.bind(this) }} />
					<Miss component={NotFound} />
					<Footer />
				</div>
			</Router>
		)
	}
}


/*
HOME
	# TODO: Player progress bar
	form validate ContactForm
	form validate checkout
BLOG
	# TODO: easy preview before publish
	# TODO: author images
	# TODO: upload knitr figures to S3
	# TODO: migrate existing blog content
PODCAST
	# TODO: transcripts
STORE
	# TODO: Shopify
	# TODO: sort by membership first, then price increasing
	# TODO: notifications / record to DB
	# Shipping tshirt vs sticker
	# Shipping intl
	# Why need address pop up
MEMBERSHIP
	# TODO: content
MISC
	# TOOD: google analytics
	# TODO: travis ci blog deploy
	# TODO: redirects on old content, especially show notes pages from feed
	# TODO: error page logging to cloudfront
	# TODO: realtime refresh?
	# TODO: SEO / crawlable?
	# Blog deploy moves first h1 to title and guesses desc from first p.  fills all fields,  pub date tomorrow
	# API respect pubdate
LATER
	# TODO: admin page to update blog content - add tags, release date, author, prettyname, title, tags
	# TODO: Set 1 hour callback to refresh localStorage, find new episodes
	# TODO: t-shirt integration
	# TODO: rate content level - beginner, intermedia, advanced
	# TODO: Blog categories
*/

