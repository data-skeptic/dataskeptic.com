import React from 'react'

export default class LatestEpisodeCard extends React.Component {
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
			var d = ep.pubDate
			var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
			return (
				<div class="home-episode-card">
					<div class="home-episode-card-left">
						<img class="home-episode-card-img" src={ep.img} />
					</div>
					<div class="home-episode-card-right">
						<p><span class="home-player-card">{this.props.title}</span></p>
						<p><span class="home-player-title"><a href={ep.link}>{ep.title}</a></span></p>
						<p><span class="home-player-date">{dstr}</span></p>
						<div class="home-player-button-container"><p>{playing_symbol}</p></div>
					</div>
				</div>
			)
		}
	}
}

