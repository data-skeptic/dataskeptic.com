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
	strip(html) {
	   var tmp = document.createElement("DIV");
	   tmp.innerHTML = html;
	   return tmp.textContent || tmp.innerText || "";
	}
	render() {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
		var oplayer = this.props.player.toJS()
		var playback_loaded = oplayer.playback_loaded
		var oepisodes = this.props.episodes.toJS()
		var episodes_loaded = oepisodes.episodes_loaded
		if (episodes_loaded == 0) {
			return <Loading />
		}
		if (episodes_loaded == -1) {
			return <div>Loading... </div>
		}
		var ep = this.props.episode
		if (ep == undefined) {
			return <div>Loading.... </div>
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
			var date = new Date(ep.pubDate)
            var dstr = monthNames[date.getMonth()].toUpperCase() + " " + date.getDate() + ", " + (date.getYear()+1900)
			var desc = this.strip(ep.desc)
			var x = 200
			var more = ep.link
			if (desc.length > x) {
				var i = desc.indexOf(" ", x)
				desc = desc.substring(0, i)
			}
			return (
				<div className="home-episode-card">
					<div className="home-episode-card-left">
						<img className="home-episode-card-img" src={ep.img} />
					</div>
					<div className="home-episode-card-right">
						<div className="home-player-date">{dstr}</div>
						<p><span className="home-player-card">{this.props.title}</span></p>
						<p><span className="home-player-title"><a href={ep.link}>{ep.title}</a></span></p>
						<div className="home-player-button-container">
							<button className="episode-button" onClick={this.onClick.bind(this, ep)}>{play_symb}</button>
						</div>
					</div>
					<div className="home-episode-card-desc">
					{desc}
					... <a href={more}>[more]</a>
					</div>
				</div>
			)
		}
	}
}

export default connect(state => ({ episodes: state.episodes, player: state.player }))(EpisodeCard)

