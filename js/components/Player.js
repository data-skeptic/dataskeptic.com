import React from "react"
import ReactDOM from "react-dom"
import ReactHowler from 'react-howler'

import PlayerProgressBar from './PlayerProgressBar'

export default class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"position": 0
		}
	}

	render() {
		console.log("render player")
		var config = this.props.config
		if (config.has_shown) {
			var episode = config.episode
			var is_playing = config.is_playing
			var progress = this.state.position
			var howler = ""
			var title = "[No episode loaded yet]"
			var duration = "--:--"
			if (episode != undefined) {
				var mp3 = episode.mp3
				howler = (<ReactHowler src={mp3} playing={is_playing} />)
				title = episode.title
				duration = episode.duration
			}
			var button = undefined
			if (!this.props.episodes_loaded) {
				button = (<button class="episode-button-sm">?</button>)
			} else {
				if (is_playing) {
					button = (<button class="episode-button-sm" onClick={this.props.onPlayToggle.bind(this, episode)}>&#10073;&#10073;</button>)
				} else {
					button = (<button class="episode-button-sm" onClick={this.props.onPlayToggle.bind(this, episode)}>&#9658;</button>)
				}
			}
			return (
				<div class="thin-player-container">
					<div class="center">
						<div class="player" className="thin-player">
							<div class="player-inner">
								{button}
								<div class="player-title-container"><span class="player-title">{title}</span></div>
								<PlayerProgressBar playing={is_playing} progress={progress} />
								<div class="player-duration-container"><span class="player-duration">{duration}</span></div>
								{howler}
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
}
