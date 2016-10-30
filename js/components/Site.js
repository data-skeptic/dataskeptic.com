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
		this.state = {
			"episodes": [],
			"episodes_loaded": false,
			"products": [],
			"products_loaded": false,
			"player": {
				"episode": undefined,
				"is_playing": false,
				"has_shown": false
			}
		}

		this.onPlayToggle = this.onPlayToggle.bind(this)

		var me = this

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
			});			
		  })

		axios
			.get("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/products")
			.then(function(result) {
				var products = result.data.Items
				var products_loaded = true
				me.setState({products, products_loaded})
			});
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
	# TODO: Latest blog tile
	# TODO: live statistics tile
PODCAST
	# TODO: 
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
	# TODO: t-shirt integration
SERVICES
	# static content
MEMBERSHIP
	# TODO: content
	# TODO: Shopify integration
MISC
	# TODO: redirects on old content, especially show notes pages from feed
	# TODO: error page logging to cloudfront
	# TODO: realtime refresh?
HELP
	# TODO: where to hold episodes (not in podcast.js)
	# TODO: caching of XML parse, Dynamo lookups
	# TODO: Blog.js implementation
	# TODO: General overview
	# TODO: Saving state in localStorage
	# TODO: SEO / crawlable?
		// TODO: Set 1 hour callback to refresh xml
*/

