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
		// TODO: render this.props.episode stuff
		console.log(this.props.config)
		var config = this.props.config
		var episode = config.episode
		var howler = ""
		var title = ""
		var duration = "--:--"
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
					<span class="player-title">{title}</span>
					{duration}
					<PlayerProgressBar playing={config.playing} progress={.5} />
					{button}
					{howler}
				</div>
			</div>
		)
	}
}
