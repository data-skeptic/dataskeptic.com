import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

class Episode extends React.Component {
	constructor(props) {
		super(props)
	}
	onPlayToggle(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })
	}
	render() {
		var ep = this.props.episode
		var oplayer = this.props.player.toJS()
		var player = oplayer.player
		var desc = ep.desc
		var i = desc.indexOf("</p>")
		if (i > 0) {
			desc = desc.substring(0, i)
		}
		var duration = ep.duration
		var play_symb = <span>&#9658;</span>
		if (oplayer.is_playing) {
			if (oplayer.episode.guid == ep.guid) {
				play_symb = <span>&#10073;&#10073;</span>
			}
		}
		var playing_symbol = (
			<button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>&#9658; <span className="episode-duration">{duration}</span></button>
		)
		if (oplayer.is_playing){
			if (oplayer.episode.guid == ep.guid) {
				playing_symbol = (
					<button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>&#10073;&#10073; <span className="episode-duration">{duration}</span></button>
				)				
			}
		}
		var d = ep.pubDate
		var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()

		var tmp = document.createElement("DIV");
		tmp.innerHTML = desc;
		desc = tmp.textContent || tmp.innerText || ""
		return (
			<div className="row episode">
				<div className="col-xs-12 col-sm-3 episode-left">
					<img className="episode-img" src={ep.img} />
				</div>
				<div className="col-xs-12 col-sm-9 episode-middle">
					<p><span className="episode-title"><a href={ep.link}>{ep.title}</a></span></p>
					<p>
						<button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>{play_symb} <span className="episode-duration">{duration}</span></button>
						<span className="episode-pubDate">{dstr}</span>
						<a className="episode-download-button" href={ep.mp3} download>&darr;</a>
					</p>
					<div className="clear"></div>
					{desc}
					<a href={ep.link}> [more]</a>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}

export default connect(state => ({ player: state.player, episodes: state.episodes }))(Episode)

