import React from "react"
import ReactDOM from "react-dom"

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
				Loading episodes...
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
							console.log("warnings.js.45 to be resolved here")
							return <button key={key} class="menu-year" class={down} onClick={me.changeYear.bind(me, year)}>{year+1900}</button>
							console.log("warnings.js.45 to be resolved here")
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
