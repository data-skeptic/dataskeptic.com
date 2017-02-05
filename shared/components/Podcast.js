import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import Episode from "./Episode"
import Loading from "./Loading"
import YearSelector from './YearSelector.js'

import {get_podcasts} from '../utils/redux_loader'
import {year_from_path} from '../utils/redux_loader'

class Podcast extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		var dispatch = this.props.dispatch
		var oepisodes = this.props.episodes.toJS()
		var episodes = oepisodes.episodes
		var pathname = this.props.location.pathname
		if (episodes.length == 0) {
			get_podcasts(dispatch, pathname)
		}
	}

	render() {
		var pathname = this.props.location.pathname
		var oepisodes = this.props.episodes.toJS()
		var episodes = oepisodes.episodes
		if (episodes.length == 0) {
			return <div><Loading /></div>
		}
		var year = year_from_path(pathname)
		var years = oepisodes.years
		if (year == -1) {
			year = years[0]
		}
		return (
			<div className="center">
				<YearSelector years={years} year={year} />
				<div className="clear"></div>
				<div className="episodes-container">
					{
						episodes.map(function(episode) {
							return <Episode key={episode.guid} episode={episode} />
						})
					}
				</div>
				<YearSelector years={years} year={year} />
			</div>
		)
	}
}

export default connect(state => ({ episodes: state.episodes }))(Podcast)

