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
			<button className="episode-play-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#9658; <span className="episode-duration">{duration}</span></button>
		)
		if (this.props.is_playing) {
			playing_symbol = (
				<button className="episode-play-button" onClick={this.props.onPlayToggle.bind(this, ep)}>&#10073;&#10073; <span className="episode-duration">{duration}</span></button>
			)
		}
		var d = ep.pubDate
		var dstr = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()
		return (
			<div className="row episode">
				<div className="col-xs-12 col-sm-3 episode-left">
					<img className="episode-img" src={ep.img} />
				</div>
				<div className="col-xs-12 col-sm-9 episode-middle">
					<p><span className="episode-title"><a href={ep.link}>{ep.title}</a></span></p>
					<p>
						{playing_symbol}
						<span className="episode-pubDate">{dstr}</span>
						<button className="episode-download-button" onClick={this.handleDownloadClick.bind(this, ep.mp3)}>&darr;</button>
					</p>
					<div className="clear"></div>
					<span dangerouslySetInnerHTML={{__html: desc}} />
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}
