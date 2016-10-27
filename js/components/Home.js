import React from "react"
import ReactDOM from "react-dom"

import Slider from "react-slick"

import Episode from "./Episode"
import MailingList from "./MailingList"
import SocialMediaCard from "./SocialMediaCard"

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
	    var settings = {
	      dots: true,
	      infinite: true,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      arrows: 1,
	      adaptiveHeight: 1,
	      accessibility: 1,
	      autoplay: 1,
	      autoplaySpeed: 3000,
	      pauseOnHover: 1
	    };
		return (
			<div class="center">
				<div class="home-top-row">
					<div className="carousel">
						<Slider {...settings}>
							<div class="card">
								Latest episode
							</div>
							<div class="card">
								Some live statistics
							</div>
							<div class="card">
								Latest blog posts
							</div>
							<div class="card">
								<SocialMediaCard />
							</div>
						</Slider>
					</div>
					<div class="home-right">
						<div className="home-player">
							<span class="player-label">Latest episode:</span>
						</div>
						<MailingList />
					</div>
				</div>
				<div class="clear"></div>
			</div>
		)
	}
}
