import React from "react"
import ReactDOM from "react-dom"

export default class Episode extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	handleDownloadClick(url) {
		window.open(url)
	}
	//<!-- {ep.link} -->
	render() {
		var ep = this.props.episode
		var desc = ep.desc
		var i = desc.indexOf("</p>")
		if (i > 0) {
			desc = desc.substring(0, i)
			desc += "<a href={ep.link}> [more]</a></p>"
		} else {
			desc += "<a href={ep.link}> [more]</a>"
		}
		var duration = ep.duration
		var playing_symbol = (
			<button class="episode-play-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#9658; <span class="episode-duration">{duration}</span></button>
		)
		if (this.props.is_playing) {
			playing_symbol = (
				<button class="episode-play-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#10073;&#10073; <span class="episode-duration">{duration}</span></button>
			)
		}
		var d = ep.pubDate
		var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
		return (
			<div class="row episode">
				<div class="col-xs-12 col-sm-3 episode-left">
					<img class="episode-img" src={ep.img} />
				</div>
				<div class="col-xs-12 col-sm-9 episode-middle">
					<p><span class="episode-title"><a href={ep.link}>{ep.title}</a></span></p>
					<p>
						{playing_symbol}
						<span class="episode-pubDate">{dstr}</span>
						<button class="episode-download-button" onClick={this.handleDownloadClick.bind(this, ep.mp3)}>&darr;</button>
					</p>
					<div class="clear"></div>
					<span dangerouslySetInnerHTML={{__html: desc}} />
				</div>
				<div class="clear"></div>
			</div>
		)
	}
}
