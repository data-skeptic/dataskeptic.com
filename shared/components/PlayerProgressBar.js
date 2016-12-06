import React from "react"
import ReactDOM from "react-dom"
import Rcslider from "rc-slider"
import { connect } from 'react-redux'

class PlayerProgressBar extends React.Component {
	constructor(props) {
		super(props)
	}
	
	onUpdate(pos) {
		console.log(["onUpdate", pos])
		this.props.onPlayerSeekChange(pos)
		this.props.dispatch({type: "PLAYER_SEEK", payload: pos })			
	}

	render() {
		return (
			<div className="player-progress-bar">
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

export default connect(state => ({ player: state.player }))(PlayerProgressBar)
