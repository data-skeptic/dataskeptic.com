import React from "react"
import ReactDOM from "react-dom"

import Episode from "./Episode"

export default class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
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
						return <Episode key={episode.guid} episode={episode} />
					})}
				</div>
			)
		}
	}
}
