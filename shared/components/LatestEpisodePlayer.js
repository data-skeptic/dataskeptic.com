import React from 'react'
import { connect } from 'react-redux';

import Loading from "./Loading"

class LatestEpisodePlayer extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		var episodes = this.props.episodes.toJS()
		var focus_episode = episodes.focus_episode
		var guid = this.props.guid
		if (guid != undefined) {
			console.log("request inject 1")
			this.props.dispatch({type: "REQUEST_INJECT_EPISODE", payload: {guid} })			
		}
		else if (focus_episode.pubData == null) {
			console.log("request inject 2")
			this.props.dispatch({type: "REQUEST_INJECT_EPISODE", payload: {} })
		} else {
			console.log("episode in place")
		}
	}

	onClick(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })		
	}

	render() {
		var title = this.props.title
		var oplayer = this.props.player.toJS()
		var playback_loaded = oplayer.playback_loaded
		var episodes = this.props.episodes.toJS()
		var focus_episode = episodes.focus_episode
		var loaded = focus_episode.loaded
		var episode = focus_episode.episode
		if (loaded == -1) {
			return <Error />
		}
		else if (loaded == 0) {
			return <Loading />
		}
		else if (episode == undefined) {
			return <Error />
		}
		var play_symb = <span>&#9658;</span>
		if (oplayer.is_playing) {
			if (oplayer.episode.guid == episode.guid) {
				play_symb = <span>&#10073;&#10073;</span>
				if (!playback_loaded) {			
					play_symb = <span>?</span>
				}
			}
		} 
		var d = new Date(episode.pubDate)
		var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
		return (
			<div className="home-player-card">
					<p><span className="home-player-latest">{title}</span></p>
					<div className="home-player-title"><a className="home-player-link" href={episode.link}>{episode.title}</a></div>
					<p>{dstr}</p>
					<button className="episode-button" onClick={this.onClick.bind(this, episode)}>{play_symb}</button>
			</div>
		)
	}
}

export default connect(state => ({ episodes: state.episodes, player: state.player }))(LatestEpisodePlayer)


