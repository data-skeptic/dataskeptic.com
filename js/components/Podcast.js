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
			max_year: year,
			year: year
		}

		this.onMenuClick = this.onMenuClick.bind(this)
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

	onMenuClick(e) {
		console.log(e)
	}
	
	render() {
		var config = this.props.config
		var year = this.state.max_year
		var episodes = this.props.episodes
		var num = episodes.length
		var years = []
		while (year > 113) {
			years.push(year)
			year -= 1
		}
		if (num == 0) {
			return <div><Loading /></div>
		} else {
			var me = this
			var dyear = this.state.year
			var onPlayToggle = this.props.onPlayToggle
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
								var is_playing = false
								if (config.player.episode != undefined) {
									if (config.player.episode.guid == episode.guid) {
										if (config.player.is_playing) {
											is_playing = true
										}
									}
								}
								return <Episode key={episode.guid} is_playing={is_playing} episode={episode} onPlayToggle={onPlayToggle} />
							}
						})}
					</div>
				</div>
			)
		}
	}
}
