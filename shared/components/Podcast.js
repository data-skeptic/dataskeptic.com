import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import Episode from "./Episode"
import Loading from "./Loading"
import YearSelector from './YearSelector.js'

class Podcast extends React.Component {
	constructor(props) {
		super(props)
		var year = (new Date()).getYear() + 1900
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

	changeYear(year) {
		this.setState({year})
	}

	onMenuClick(e) {
		console.log(e)
	}
	
	render() {
		var oepisodes = this.props.episodes
		var oepisodes = this.props.episodes.toJS()
		var episodes_loaded = oepisodes.episodes_loaded
		if (episodes_loaded == undefined) {
			episodes_loaded = 0
		}
		if (episodes_loaded == 0) {
			return <div><Loading /></div>
		} else {
			var episodes = oepisodes.episodes
			var years = []
			var year = oepisodes.year
			var y = this.state.max_year
			while (y > 2013) {
				years.push(y)
				y -= 1
			}
			return (
				<div className="center">
					<YearSelector years={years} year={year} />
					<div className="clear"></div>
					<div className="episodes-container">
						{
							episodes.map(function(episode) {
								var is_playing = false
								if (episode.pubDate.getYear()+1900 == year) {
									var is_playing = false
									/*
									if (config.player.episode != undefined) {
										if (config.player.episode.guid == episode.guid) {
											if (config.player.is_playing) {
												is_playing = true
											}
										}
									}
									*/
									return <Episode key={episode.guid} is_playing={is_playing} episode={episode} />
								}
							})
						}
					</div>
					<YearSelector years={years} year={year} />
				</div>
			)
		}
	}
}

export default connect(state => ({ episodes: state.episodes }))(Podcast)

