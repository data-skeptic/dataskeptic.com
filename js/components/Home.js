import React from "react"
import ReactDOM from "react-dom"

import Episode from "./Episode"

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var year = (new Date()).getYear()
		var num = this.props.episodes.length
		if (num ==0) {
			return (
				<div class="center">
				Loading episodes...
				</div>
			)
		} else {
			return (
				<div class="center">
					{this.props.episodes.map(function(episode) {
						if (episode.pubDate.getYear()==year) {
							return <Episode key={episode.guid} episode={episode} />
						} else {
							return <div></div>
						}
					})}
				</div>
			)
		}
	}
}
