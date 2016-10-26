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
			<div class="center">
				<p>Latest episode</p>
				<p>Latest Tweet</p>
				<p>Some live statistic</p>
				<p>Carousel of interesting content (blog, videos)</p>
				<p>Sign up for mailing list</p>
			</div>
		)
	}
}
