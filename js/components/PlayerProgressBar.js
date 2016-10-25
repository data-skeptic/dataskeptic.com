import React from "react"
import ReactDOM from "react-dom"

export default class Footer extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div class="player-progress-bar">
			{this.props.playing}
			{this.props.progress}
			</div>
		)
	}
}
