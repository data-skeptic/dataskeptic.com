import React from 'react'

export default class LatestEpisodePlayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		var ep = this.props.episode
		if (ep == undefined) {
			return (
				<div>
					Loading...
				</div>
			)			
		} else {
			var playing_symbol = (
				<button class="episode-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#9658;</button>
			)
			if (this.props.is_playing) {
				playing_symbol = (
					<button class="episode-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#10073;&#10073;</button>
				)
			}
			var title = this.props.title
			var d = ep.pubDate
			var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
			return (
				<div class="home-player-card">
						<p><span class="home-player-latest">{title}</span></p>
						<div class="home-player-title"><a href={ep.link}>{ep.title}</a></div>
						<p>{dstr}</p>
						{playing_symbol}
				</div>
			)
		}
	}
}

