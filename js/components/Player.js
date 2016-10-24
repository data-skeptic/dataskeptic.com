import React from "react"
import ReactDOM from "react-dom"
import ReactHowler from 'react-howler'

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
		if (this.props.config.playing) {
			var mp3 = this.props.config.episode.mp3
			console.log(mp3)
			return (
				<div class="player">
					<div class="player-inner">
						<button class="episode-button" onClick={this.props.onPause}>&#9658;</button>
						<ReactHowler
						        src={mp3}
						        playing={this.props.config.playing}
						      />
					</div>
				</div>
			)
		} else {
			return (<div></div>)
		}
	}
}
