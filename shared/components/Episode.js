import React from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import { redirects_map } from '../../redirects';

class Episode extends React.Component {
	constructor(props) {
		super(props)
	}
	onPlayToggle(episode) {
		this.props.dispatch({type: "PLAY_EPISODE", payload: episode })
	}

	formatLink(link) {
		link = link.replace('https://dataskeptic.com', '');
		link = link.replace('http://dataskeptic.com', '');

		if (!!redirects_map[link]) {
            return redirects_map[link];
        }

		return link;
	}

    onEpisodeClick() {
		window.scrollTo(0, 0);
	}

	render() {
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

        const date = moment(ep.publish_date).format('MMMM d, YYYY');

		var transcript = <div></div>
		var tep = undefined
		try {
			tep = oblogs.transcript_map[ep.guid]
		} catch (err) {
			console.log(err)
		}

		const episodeLink = this.formatLink(ep.link);

		if (tep) {
			const pn = "/blog" + tep.prettyname;
			transcript = (
					<div className='episode-transcript-link'>
						<Link to={pn}>Read transcript</Link>
					</div>
			)
		}

		return (
			<div className="row episode">
				<div className="col-xs-12 col-sm-3 episode-left">
					<Link to={episodeLink} onClick={this.onEpisodeClick}>
						<img className="episode-img" src={ep.img} />
					</Link>
				</div>
				<div className="col-xs-12 col-sm-8 episode-middle">
                    <div className="blog-date">{date}</div>
					<Link className="blog-title" to={episodeLink} onClick={this.onEpisodeClick}>{ep.title}</Link>
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
					<div className="episode-desc">{desc}<Link to={episodeLink} className="episode-view-more">View More <i className="glyphicon glyphicon-more glyphicon-chevron-right">&nbsp;</i> </Link></div>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}

export default connect(state => ({ player: state.player, episodes: state.episodes, blogs: state.blogs }))(Episode)

