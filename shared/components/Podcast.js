import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import Episode from "./Episode"
import Loading from "./Loading"
import YearSelector from './YearSelector.js'

class Podcast extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log("Begin render")
		var oepisodes = this.props.episodes.toJS()
		var episodes = oepisodes.episodes
		var episodes_loaded = oepisodes.episodes_loaded
		if (episodes_loaded == undefined) {
			episodes_loaded = 0
		}
		if (episodes_loaded == 0) {
			console.log("1")
			return <div><Loading /></div>
		} else {
			console.log("2")
			var myear = (new Date()).getYear() + 1900
			if (episodes.length > 0) {
				var pubDate = episodes[0].pubDate
				pubDate = new Date(pubDate)
				myear = pubDate.getYear() + 1900
			}
			var year = myear
			var pathname = this.props.location.pathname
			var l = '/podcast/'.length
			if (pathname.length > l) {
				year = pathname.substring(l, pathname.length)
			}
			var years = []
			var y = myear
			while (y > 2013) {
				years.push(y)
				y -= 1
			}
			console.log("Now render outer")
			return (
				<div className="center">
					<YearSelector years={years} year={year} />
					<div className="clear"></div>
					<div className="episodes-container">
						{
							episodes.map(function(episode) {
								var is_playing = false
								var pubDate = episode.pubDate
								pubDate = new Date(pubDate)
								if (pubDate.getYear()+1900 == year) {
									return <Episode key={episode.guid} episode={episode} />
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

