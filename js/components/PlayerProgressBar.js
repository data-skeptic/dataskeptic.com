import React from "react"
import ReactDOM from "react-dom"
import Rcslider from "rc-slider"

export default class PlayerProgressBar extends React.Component {
	constructor(props) {
		super(props)
	}
	
	onUpdate(pos) {
		this.props.onPlayerSeekChange(pos)
	}

	render() {
		return (
			<div class="player-progress-bar">
			<Rcslider
				min={0}
				max={100}
				range={false}
				defaultValue={this.props.progress}
				value={this.props.progress}
				disabled={false}
				onChange={this.onUpdate.bind(this)}
			/>
			</div>
		)
	}
}
