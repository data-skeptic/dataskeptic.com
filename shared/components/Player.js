import React from "react"
import ReactDOM from "react-dom"
import ReactHowler from 'react-howler'
import { connect } from 'react-redux'

import PlayerProgressBar from './PlayerProgressBar'

class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			position: 0,
			loaded: false,
			howler: undefined
		}

		this.update = this.update.bind(this)
		setInterval(this.update, 1000)
	}

	update() {
		if (this.state.howler != undefined) {
			var oplayer = this.props.player.toJS()
			if (oplayer.is_playing) {
				var seek = this.state.howler.seek()
				var duration = this.state.howler.duration()
				var position = 100.0 * seek / duration
				if (!isNaN(position)) {
					this.props.dispatch({type: "PLAYBACK_LOADED", payload: true })
					this.props.dispatch({type: "PROGRESS_UPDATE", payload: position })
				} else {
					this.props.dispatch({type: "PLAYBACK_LOADED", payload: false })
				}				
			}
		}
	}

	pad(n, width) {
		var z = '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	onEnd() {
		var howler = this.state.howler
		howler.stop()
		this.props.onPlayToggle(undefined)
		this.props.dispatch({type: "STOP_PLAYBACK", payload: {} })
	}
	onPlayToggle(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })
	}
	render() {
		var oplayer = this.props.player.toJS()
		if (!oplayer.has_shown) {
			return <div></div>
		}

		var position_updated = oplayer.position_updated
		var position = oplayer.position
		if (position_updated) {
			var howler = this.state.howler
			var dur = howler.duration()
			var p = 1.0 * position / 100 * dur
			if (howler != undefined) {
				howler.seek(p)
				var me = this.props
				setTimeout(function(){
					me.dispatch({type: "SEEK_SET", payload: false })
				}, 10);
			}
		}
		var episode = oplayer.episode
		var playback_loaded = oplayer.playback_loaded
		var is_playing = oplayer.is_playing
		var howler = ""
		var title = "[No episode loaded yet]"
		var duration = "--:--"
		var play_symb = <span>&#9658;</span>
		if (oplayer.episode != undefined) {
			var episode = oplayer.episode
			title = episode.title
			var mp3 = episode.mp3
			howler = <ReactHowler src={mp3} playing={is_playing} ref={(ref) => this.state.howler = ref} onEnd={this.onEnd.bind(this)} />
			duration = episode.duration
			var arr = duration.split(":")
			if (arr.length == 2) {
				var min = parseInt(arr[0])
				var sec = parseInt(arr[1])					
			} else {
				var hr  = parseInt(arr[0])
				var min = parseInt(arr[1]) + 60 * hr
				var sec = parseInt(arr[2])
			}
			var d = min * 60 + sec
			var p = 1.0 * d * position/100
			var left = d - p
			var m = left / 60
			min = Math.floor(m)
			sec = Math.floor(left - min * 60)
			duration = min + ":" + this.pad(sec, 2)
		}
		if (is_playing) {
			play_symb = <span>&#10073;&#10073;</span>
		}
		if (!playback_loaded) {			
			play_symb = <span>?</span>
		}

		return (
			<div className="thin-player-container">
				<div className="center">
					<div className="player" className="thin-player">
						<div className="player-inner">
							<button className="episode-button-sm" onClick={this.onPlayToggle.bind(this, episode)}>{play_symb}</button>
							<div className="player-title-container"><span className="player-title">{title}</span></div>
							<PlayerProgressBar playing={is_playing} progress={position} />
							<div className="player-duration-container"><span className="player-duration">{duration}</span></div>
							{howler}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ player: state.player }))(Player)
