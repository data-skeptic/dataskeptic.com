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
		var title = "adfj lskfj sdlfkj sldfkj sfkj slkfj slkfdjsdflkj kjkljlkjl ljkljkljlkjk"
		var duration = "--:--"
		var progress = 1
		if (episode != undefined) {
			var mp3 = episode.mp3
			howler = (<ReactHowler src={mp3} playing={config.playing} />)
			title = episode.title
			duration = episode.duration
		}
		var button = (<button class="episode-button-sm" onClick={this.props.onPause}>&#9658;</button>)
		if (config.playing) {
			button = (<button class="episode-button-sm" onClick={this.props.onPause}>&#10073;&#10073;</button>)
		}
		return (
			<div class="thin-player-container">
				<div class="center">
					<div class="player" className="thin-player">
						<div class="player-inner">
							{button}
							<div class="player-title-container"><span class="player-title">{title}</span></div>
							<PlayerProgressBar playing={config.playing} progress={progress} />
							<div class="player-duration-container"><span class="player-duration">{duration}</span></div>
							{howler}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
