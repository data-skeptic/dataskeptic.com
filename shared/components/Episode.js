import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Episode extends React.Component {
	constructor(props) {
		super(props)
	}
	onPlayToggle(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })
	}
	render() {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
		var ep = this.props.episode
		var oplayer = this.props.player.toJS()
		var oblogs = this.props.blogs.toJS()
		var player = oplayer.player
		var desc = ep.desc
		var i = desc.indexOf("</p>")
		if (i > 0) {
			desc = desc.substring(0, i)
		}
		desc = desc.replace(/(<([^>]+)>)/ig, "")
		var duration = ep.duration
		var play_symb = <span>&#9658;</span>
		if (oplayer.is_playing) {
			if (oplayer.episode.guid == ep.guid) {
				play_symb = <span>&#10073;&#10073;</span>
			}
		}
		var playing_symbol = (
			<button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>&#9658; <span className="episode-duration">{duration}</span></button>
		)
		if (oplayer.is_playing){
			if (oplayer.episode.guid == ep.guid) {
				playing_symbol = (
					<button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>&#10073;&#10073; <span className="episode-duration">{duration}</span></button>
				)				
			}
		}
		var d = new Date(ep.pubDate)
		var dstr = monthNames[d.getMonth()].toUpperCase() + " " + d.getDate() + ", " + (d.getYear()+1900)

		var transcript = <div></div>
		var tep = undefined
		try {
			tep = oblogs.transcript_map[ep.guid]
		} catch (err) {
			console.log(err)
		}
		if (tep != undefined) {
			var pn = "/blog" + tep.prettyname
			transcript = (
					<div className='episode-transcript-link'>
						<Link to={pn}>Read transcript</Link>
					</div>
			)
		}
		return (
			<div className="row episode">
				<div className="col-xs-12 col-sm-3 episode-left">
					<img className="episode-img" src={ep.img} />
				</div>
				<div className="col-xs-12 col-sm-9 episode-middle">
                    <div className="blog-date">{dstr}</div>
					<a className="blog-title" href={ep.link}>{ep.title}</a>
					<br/>
					<div className="episode-button-row">
						<button className="episode-play-button" onClick={this.onPlayToggle.bind(this, ep)}>{play_symb} <span className="episode-play">PLAY</span> <span className="episode-duration">{duration}</span></button>
						<div className="episode-download">
							<a className="episode-download-img" href={ep.mp3} download><img className="dl-arrow" src="/img/png/dl-arrow.png" /></a>
							<a className="episode-download-txt" href={ep.mp3} download>Download</a>
						</div>
						{transcript}
					</div>
					<div className="clear"></div>
					<div className="episode-desc">{desc}</div>
					<a href={ep.link}> [more]</a>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}

export default connect(state => ({ player: state.player, episodes: state.episodes, blogs: state.blogs }))(Episode)

