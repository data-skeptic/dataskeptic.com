import React from "react"
import ReactDOM from "react-dom"

export default class Episode extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"more": false
		}
	}
	handleDownloadClick(url) {
		window.open(url)
	}
	handleMoreClick() {
		this.setState({more: (!this.state.more)})
	}
	//<!-- {ep.link} -->
	render() {
		var ep = this.props.episode
		var more = this.state.more
		var desc = ""
		var more_symbol = "+"
		var more_class = "episode-compressed"
		if (this.state.more) {
			desc = (ep.desc)
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
							{playing_symbol}
							<button class="episode-button" onClick={this.handleDownloadClick.bind(this, ep.mp3)}>&darr;</button>
							<button class="episode-button" onClick={this.handleMoreClick.bind(this)}>{more_symbol}</button>
						</div>
					</div>
				</div>
				<div class="episode-middle">
					<p><span class="episode-title">{ep.title}</span></p>
					<p>
						<span class="episode-duration">{ep.duration}</span>
						-
						<span class="episode-pubDate">{ep.pubDate}</span>
					</p>
				</div>
				<span dangerouslySetInnerHTML={{__html: desc}} />
				<div class="clear"></div>
			</div>
		)
	}
}
