import React from "react"
import ReactDOM from "react-dom"

import axios from "axios"
import xml2js from "xml2js"

import Episode from "./Episode"

export default class Podcast extends React.Component {
	constructor(props) {
		super(props)
		var year = (new Date()).getYear()
		this.state = {
			"episodes": [],
			"player": {
				"playing": false,
				"episode": undefined
			},
			max_year: year,
			year: year
		}

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

		this.onMenuClick = this.onMenuClick.bind(this)
		this.onPlayToggle = this.onPlayToggle.bind(this)
		this.setEpisodes = this.setEpisodes.bind(this)	
	}

	setEpisodes(episodes) {
		var year = (new Date()).getYear() + 1900
		if (episodes.length > 0) {
			year = episodes[0].pubDate.getYear()
		}
		this.setState({episodes, year})
	}

	changeYear(year, event) {
		this.setState({year})
	}

	onPlayToggle(episode) {
		console.log(episode)
		var cplay = this.state.player.playing
		if (cplay) {
			// TODO: send url to player
			// TODO: make episode button a pause button
		} else {
			// TODO: make all episode buttons play buttons, except this one
		}
		this.setState({player: {playing: (!cplay), episode: episode}})
	}

	onMenuClick(e) {
		console.log(e)
	}
	
	render() {
		console.log("props")
		console.log(this.props)
		var year = this.state.max_year
		var episodes = this.state.episodes
		var num = episodes.length
		var years = []
		while (year > 113) {
			years.push(year)
			year -= 1
		}
		if (num == 0) {
			return (
				<div class="center">
				<p>Loading episodes...</p>
				<img src="img/Loading_icon.gif" />
				</div>
			)
		} else {
			var me = this
			var dyear = this.state.year
			var onPlayToggle = this.onPlayToggle
			return (
				<div class="center">
					<div class="episode-selector">
						{years.map(function(year) {
							var down = "menu-button-up"
							if (dyear == year) {
								down = "menu-button-down"
							}
							var key = Math.random().toString().substring(2,99)
							return <button key={key} class="menu-year" class={down} onClick={me.changeYear.bind(me, year)}>{year+1900}</button>
						})}
					</div>
					<div class="episodes-container">
						{episodes.map(function(episode) {
							if (episode.pubDate.getYear() == dyear) {
								return <Episode key={episode.guid} episode={episode} onPlayToggle={onPlayToggle} />
							}
						})}
					</div>
				</div>
			)
		}
	}
}
