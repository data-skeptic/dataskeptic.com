import React from "react"
import ReactDOM from "react-dom"

import Slider from "react-slick"

import Episode from "./Episode"

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
							Follow on twitter
							<p>Latest Tweet</p>
						</div>
						<div>2</div>
						<div>3</div>
						<div>4</div>
						<div>5</div>
						<div>6</div>
					</Slider>
				</div>
				<p>Sign up for mailing list</p>
			</div>
		)
	}
}
