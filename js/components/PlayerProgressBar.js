import React from "react"
import ReactDOM from "react-dom"
import Rcslider from "rc-slider"

export default class PlayerProgressBar extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div class="player-progress-bar">
			<Rcslider
				min={0}
				max={100}
				range={false}
				defaultValue={0}
				value={this.props.progress}
				disabled={false}
				onAfterChange={this.props.onPlayerSeekChange}
			/>
			</div>
		)
	}
}
