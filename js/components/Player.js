import React from "react"
import ReactDOM from "react-dom"
import ReactHowler from 'react-howler'

import PlayerProgressBar from './PlayerProgressBar'

export default class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"playing": "http://goldfirestudios.com/proj/howlerjs/sound.ogg",
			"has_shown": false
		}
	}
	
	render() {
		console.log(this.props.config)
		var config = this.props.config
		var episode = config.episode
		var howler = ""
		var title = ""
		var duration = "--:--"
		var progress = 0
		if (episode != undefined) {
			var mp3 = episode.mp3
			howler = (<ReactHowler src={mp3} playing={config.playing} />)
			title = episode.title
			duration = episode.duration
		}
		var button = (<button class="episode-button" onClick={this.props.onPause}>&#9658;</button>)
		if (config.playing) {
			button = (<button class="episode-button" onClick={this.props.onPause}>&#10073;&#10073;</button>)
		}
		return (
			<div class="player">
				<div class="player-inner">
					<div class="player-top">
						<span class="player-duration">{duration}</span>
						<span class="player-title">{title}</span>
					</div>
					<div class="player-bottom">
						{button}
						<PlayerProgressBar playing={config.playing} progress={progress} />
					</div>
					{howler}
				</div>
			</div>
		)
	}
}
