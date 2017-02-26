import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

import Episode from "./Episode"
import Loading from "../Common/Components/Loading"
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
			<div className="row podcasts">
				<div className="col-md-8 col-xs-12">
					<div className="episodes-container">
						{
							episodes.map(function(episode) {
								return <Episode key={episode.guid} episode={episode} />
							})
						}
					</div>
				</div>
				<div className="col-md-offset-1 col-md-3 col-xs-12 episodes-sidebar">
					<h3>Year</h3>
					<YearSelector years={years} year={year} />
				</div>
			</div>
		)
	}
}

export default connect(state => ({ episodes: state.episodes }))(Podcast)

