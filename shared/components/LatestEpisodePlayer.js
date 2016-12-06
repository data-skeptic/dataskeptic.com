import React from 'react'
import { connect } from 'react-redux';

import Loading from "./Loading"

class LatestEpisodePlayer extends React.Component {
	constructor(props) {
		super(props)
	}

	onClick(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })		
	}

	render() {
		var oplayer = this.props.player.toJS()
		var playback_loaded = oplayer.playback_loaded
		var episodes = this.props.episodes.toJS()
		var ep = episodes.episodes[0]
		var episode = this.props.episode
		if (episode != undefined) {
			ep = episode
		}
		if (ep == undefined) {
			return (
				<div>
					Loading...
				</div>
			)			
		} else {
			var play_symb = <span>&#9658;</span>
			if (oplayer.is_playing) {
				if (oplayer.episode.guid == ep.guid) {
					play_symb = <span>&#10073;&#10073;</span>
					if (!playback_loaded) {			
						play_symb = <span>?</span>
					}
				}
			}
			var title = this.props.title
			var d = new Date(ep.pubDate)
			var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
			return (
				<div className="home-player-card">
						<p><span className="home-player-latest">{title}</span></p>
						<div className="home-player-title"><a href={ep.link}>{ep.title}</a></div>
						<p>{dstr}</p>
						<button className="episode-button" onClick={this.onClick.bind(this, ep)}>{play_symb}</button>
				</div>
			)
		}
	}
}

export default connect(state => ({ episodes: state.episodes, player: state.player }))(LatestEpisodePlayer)


