import React from "react"
import ReactDOM from "react-dom"

import Episode from "./Episode"

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		var year = (new Date()).getYear()
		if (this.props.episodes.length > 0) {
			(this.props.episodes[0].pubDate).getYear()
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
		var year = this.state.max_year
		var num = this.props.episodes.length
		var years = []
		while (year > 113) {
			years.push(year)
			year -= 1
		}
		if (num == 0) {
			return (
				<div class="center">
				Loading episodes...
				</div>
			)
		} else {
			var me = this
			var dyear = this.state.year
			return (
				<div class="center">
					{years.map(function(year) {
						var down = "menu-button-up"
						if (dyear == year) {
							down = "menu-button-down"
						}
						return <button class="menu-year" class={down} onClick={me.changeYear.bind(me, year)}>{year+1900}</button>
					})}
					{this.props.episodes.map(function(episode) {
						if (episode.pubDate.getYear() == dyear) {
							return <Episode key={episode.guid} episode={episode} />
						}
					})}
				</div>
			)
		}
	}
}
