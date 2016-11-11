import React from "react"
import ReactDOM from "react-dom"

import Slider from "react-slick"

import Episode from "./Episode"
import MailingList from "./MailingList"
import SocialMediaCard from "./SocialMediaCard"
import EpisodeCard from "./EpisodeCard"
import LatestBlogCard from "./LatestBlogCard"
import LatestEpisodePlayer from "./LatestEpisodePlayer"

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		var year = (new Date()).getYear()
		if (this.props.episodes != undefined) {
			if (this.props.episodes.length > 0) {
				(this.props.episodes[0].pubDate).getYear()
			}
		}
		this.state = {
			max_year: year,
			year: year
		}
	}

	changeYear(year, event) {
		this.setState({year})
	}

	render() {
		var config = this.props.config
		var episode = undefined
		var old_episode = undefined
		var blog = undefined
		var onPlayToggle = this.props.onPlayToggle
		if (this.props.episodes.length > 0) {
			episode = this.props.episodes[0]
			old_episode = this.props.episodes[52]
		}
		if (this.props.blogs.length > 0) {
			blog = this.props.blogs[0]
		}
	    var settings = {
	      dots: true,
	      infinite: true,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      arrows: 1,
	      adaptiveHeight: 1,
	      accessibility: 1,
	      autoplay: 1,
	      autoplaySpeed: 4000,
	      pauseOnHover: 1
	    };
		var is_playing = false
		if (config.player.episode != undefined) {
			if (config.player.episode.guid == episode.guid) {
				if (config.player.is_playing) {
					is_playing = true
				}
			}
		}

		return (
			<div class="center">
				<div class="home-top-row">
					<div className="carousel">
						<Slider {...settings}>
							<div class="card">
								<EpisodeCard episode={episode} title="Latest episode" onPlayToggle={onPlayToggle} is_playing={is_playing} />
							</div>
							<div class="card">
								<LatestBlogCard blog={blog} />
							</div>
							<div class="card">
								<EpisodeCard episode={old_episode} title="From the archives" onPlayToggle={onPlayToggle} is_playing={is_playing} />
							</div>
							<div class="card">
								<SocialMediaCard />
							</div>
						</Slider>
					</div>
					<div class="home-right">
						<div className="home-player">
							<LatestEpisodePlayer episode={episode} onPlayToggle={onPlayToggle} is_playing={is_playing} />
						</div>
						<MailingList />
					</div>
				</div>
				<div class="clear"></div>
			</div>
		)
	}
}
