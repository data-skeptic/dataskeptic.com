import React from "react"
import ReactHowler from 'react-howler'
import moment from 'moment'
import { connect } from 'react-redux'

import MiniPlayer from '../Components/MiniPlayer'

class PlayerContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			position: 0,
			loaded: false,
			howler: undefined
		}

		this.onPlayToggle = this.onPlayToggle.bind(this)
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

	formatPosition(val) {
		const m = val / 60
		const min = Math.floor(m)
		const sec = Math.floor(val - min * 60)
		const duration = min + ":" + this.pad(sec, 2)

		return duration
	}

	onEnd() {
		var howler = this.state.howler
		howler.stop()
		this.props.onPlayToggle(undefined)
		this.props.dispatch({type: "STOP_PLAYBACK", payload: {} })
	}

	/**
	 * Toggle podcast play state
	 *
	 */
	onPlayToggle() {
		const { episode } = this.props;

		this.props.dispatch({type: "PLAY_EPISODE", payload: episode.toJS() })
	}

	render() {
		var oplayer = this.props.player.toJS();

		if (!oplayer.has_shown) {
			return null
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
		var title = ""
		var duration = "--:--"
		var realDur = "--:--"
		var realPos = "--:--"
		var pubDate = null
		if (oplayer.episode != undefined) {
			var episode = oplayer.episode
			title = episode.title
			pubDate = episode.pubDate
			var mp3 = episode.mp3
			howler = <ReactHowler src={mp3} playing={is_playing} ref={(ref) => this.state.howler = ref} onEnd={this.onEnd.bind(this)} />
			duration = episode.duration
			realDur = duration

			var min = 0
			var sec = 0
			var hr = 0
			if (duration != undefined) {
				var arr = duration.split(":")
				if (arr.length == 2) {
					min = parseInt(arr[0])
					sec = parseInt(arr[1])					
				} else {
					hr  = parseInt(arr[0])
					min = parseInt(arr[1]) + 60 * hr
					sec = parseInt(arr[2])
				}
			}
			var d = min * 60 + sec
			var p = 1.0 * d * position/100

			var left = d - p
			duration = this.formatPosition(left)

			var right = p
			realPos = this.formatPosition(right)
		}

		if (pubDate) {
			pubDate = moment(pubDate).format('MMMM D, YYYY');
		}
		
		return (
			<MiniPlayer
				playing={is_playing}
				episode={episode}
				title={title}
				duration={realDur}
				date={pubDate}
				position={position}
				realPos={realPos}
				onPlayToggle={this.onPlayToggle}
				howler={howler}
			/>
		)
	}
}

export default connect(
	state => ({
		player: state.player,
		episode: state.player.getIn(['episode'])
	})
)(PlayerContainer)
