import React from 'react'
import { connect } from 'react-redux';

import Loading from "./Loading"
import Error from "./Error"

class EpisodeCard extends React.Component {
	constructor(props) {
		super(props)
	}

	onClick(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })		
	}

	render() {
		var oplayer = this.props.player.toJS()
		var playback_loaded = oplayer.playback_loaded
		var oepisodes = this.props.episodes.toJS()
		var episodes_loaded = oepisodes.episodes_loaded
		if (episodes_loaded == 0) {
			return <Loading />
		}
		if (episodes_loaded == -1) {
			return <div>Error </div>
		}
		var ep = this.props.episode
		if (ep == undefined) {
			return <div>Error </div>
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
			var d = ep.pubDate
			console.log(d)
			console.log(typeof(d))
			var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
			var desc = ep.desc
			var x = 200
			if (desc.length > x) {
				var i = desc.indexOf(" ", x)
				desc = desc.substring(0, i)
				desc += "... <a href=\"" + ep.link + "\">[more]</a>"
			}
			return (
				<div className="home-episode-card">
					<div className="home-episode-card-left">
						<img className="home-episode-card-img" src={ep.img} />
					</div>
					<div className="home-episode-card-right">
						<p><span className="home-player-card">{this.props.title}</span></p>
						<p><span className="home-player-title"><a href={ep.link}>{ep.title}</a></span></p>
						<p><span className="home-player-date">{dstr}</span></p>
						<div className="home-player-button-container">
							<button className="episode-button" onClick={this.onClick.bind(this, ep)}>{play_symb}</button>
						</div>
					</div>
					<div className="home-episode-card-desc">
						<span dangerouslySetInnerHTML={{__html: desc}} />
						
					</div>
				</div>
			)
		}
	}
}

export default connect(state => ({ episodes: state.episodes, player: state.player }))(EpisodeCard)

