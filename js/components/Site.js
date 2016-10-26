import React from 'react'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

//import axios from "axios"
//import xml2js from "xml2js"

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


export default class Site extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"episodes": [],
			"player": {
				"playing": false,
				"episode": undefined
			}
		}

		/*
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
				me.setState({episodes})
			});			
		  });
		// TODO: Set 1 hour callback to refresh xml
		*/
	}

	onPlayToggle(episode) {
		console.log(episode)
		//console.log(e)
		//console.log(episode)
		var cplay = this.state.player.playing
		if (cplay) {
			// TODO: send url to player
			// TODO: make episode button a pause button
		} else {
			// TODO: make all episode buttons play buttons, except this one
		}
		this.setState({player: {playing: (!cplay), episode: episode}})
	}
	
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Player config={this.state.player} onPause={this.onPlayToggle.bind(this)} />
					<ul class="topnav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/podcast">Podcast</Link></li>
						<li><Link to="/blog">Blog</Link></li>
						<li><Link to="/video">Videos</Link></li>
						<li><Link to="/proj">Projects</Link></li>
						<li><Link to="/store">Store</Link></li>
						<li><Link to="/services">Services</Link></li>
						<li class="right"><Link to="/members">Membership</Link></li>
					</ul>
					<Match exactly pattern="/" component={Home} />
					<Match exactly pattern="/index.htm" component={Home} />
					<Match pattern="/podcast" component={Podcast} />
					<Match pattern="/blog" component={Blog} />
					<Match pattern="/video" component={Video} />
					<Match pattern="/proj" component={Projects} />
					<Match pattern="/store" component={Store} />
					<Match pattern="/services" component={Services} />
					<Match pattern="/members" component={Membership} />
					<Footer />
				</div>
			</Router>
		)
	}
}
