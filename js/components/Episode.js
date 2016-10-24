import React from "react"
import ReactDOM from "react-dom"

export default class Episode extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"more": false
		}
	}
	handleDownloadClick() {
		console.log("dl")
	}
	handleMoreClick() {
		this.setState({more: (!this.state.more)})
	}
	//<!-- {ep.mp3} -->
	//<!-- {ep.link} -->
	render() {
		var ep = this.props.episode
		var more = this.state.more
		var desc = ""
		var more_symbol = "+"
		var more_class = "episode-compressed"
		if (more) {
			desc = "<p>" + ep.desc + "</p>"
			more_symbol = "-"
			more_class = "episode-expanded"
		}
		return (
			<div class="episode {more-class}">
				<div class="episode-left">
					<p><span class="episode-title">{ep.title}</span></p>
					<p>
						<span class="episode-duration">{ep.duration}</span>
						-
						<span class="episode-pubDate">{ep.pubDate.toString()}</span>
					</p>
					{desc}
				</div>
				<div class="episode-right">
					<div class="episode-right-inner">
						<div class="episode-right-inner-inner">
							<button class="episode-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#9658;</button>
							<button class="episode-button" onClick={this.handleDownloadClick.bind(this)}>&darr;</button>
							<button class="episode-button" onClick={this.handleMoreClick.bind(this)}>{more_symbol}</button>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		)
	}
}
