import React from "react"
import ReactDOM from "react-dom"

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
		return (
			<div>
				Latest episode
				Latest Tweet
				Some live statistic
				Carousel of interesting content (blog, videos)
				Sign up for mailing list
			</div>
		)
	}
}
