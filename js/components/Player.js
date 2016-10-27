import React from "react"
import ReactDOM from "react-dom"
import ReactHowler from 'react-howler'

export default class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"playing": "http://goldfirestudios.com/proj/howlerjs/sound.ogg"
		}
	}
	
	render() {
		// TODO: render this.props.episode stuff
		if (this.props.config.playing) {
			return (
				<div class="player" className="thin-player">
					<div class="player-inner">
						<button class="episode-button" onClick={this.props.onPause}>&#9658;</button>
						<ReactHowler
						        src={this.state.playing}
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
