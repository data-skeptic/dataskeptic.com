import React from "react"
import ReactDOM from "react-dom"

import Header from './Header'
import Menu from './Menu'
import Player from './Player'
import Home from './Home'
import Footer from './Footer'
import axios from "axios"
import xml2js from "xml2js"


export default class Site extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"page": "home",
			"episodes": [],
			"player": {
				"playing": false
			}
		}

		var me = this

		axios
		  .get("http://dataskeptic.libsyn.com/rss")
		  .then(function(result) {
		  	var xml = result["data"]
			var extractedData = "";
			var parser = new xml2js.Parser();
			parser.parseString(xml, function(err,result) {
				var episodes = me.extractEpisodes(result)
				me.setState({"episodes": episodes})
			});
		  });

		this.extractEpisodes = this.extractEpisodes.bind(this)
		this.onMenuClick = this.onMenuClick.bind(this)
		this.onPlayToggle = this.onPlayToggle.bind(this)
	}

	extractEpisodes(rss) {
		var episodes = []
		var items = rss["rss"]["channel"][0]["item"]
		items.map(function(item) {
			var dstr = item["pubDate"][0]
			var pubDate = new Date(dstr)
			var url = item["enclosure"][0]["$"]["url"]
			var episode = {
				"title": item["title"][0],
				"desc": item["description"][0],
				"pubDate": pubDate,
				"mp3":  url,
				"duration": item["itunes:duration"][0],
				"img": item["itunes:image"][0]["$"]["href"],
				"guid": item["guid"][0]["_"],
				"link": item["link"][0]
			}
			episodes.push(episode)
		})
		return episodes
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
			// TODO: send url to player
			// TODO: make all episode buttons play buttons, except this one
		}
		this.setState({player: {playing: (!cplay)}})
	}
	onMenuClick(e) {
		console.log(e)
	}
	
	render() {
		return (
			<div>
			<Header />
			<Player config={this.state.player} onPause={this.onPlayToggle.bind(this)} />
			<Menu />
			<Home episodes={this.state.episodes} onPlayToggle={this.onPlayToggle.bind(this)} />
			<Footer />
			</div>
		)
	}
}
