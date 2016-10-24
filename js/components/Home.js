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
			console.log(this.props)
			var dyear = this.state.year
			var onPlayToggle = this.props.onPlayToggle
			return (
				<div class="center">
					<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us9.list-manage.com","uuid":"65e63d6f84f1d87759105d133","lid":"dc60d554db"}) })</script>
					<div class="episode-selector">
						{years.map(function(year) {
							var down = "menu-button-up"
							if (dyear == year) {
								down = "menu-button-down"
							}
							console.log("warnings.js.45 to be resolved here")
							return <button class="menu-year" class={down} onClick={me.changeYear.bind(me, year)}>{year+1900}</button>
						})}
					</div>
					<div class="episodes-container">
						{this.props.episodes.map(function(episode) {
							if (episode.pubDate.getYear() == dyear) {
								return <Episode key={episode.guid} episode={episode} onPlayClick={onPlayToggle(episode)} />
							}
						})}
					</div>
				</div>
			)
		}
	}
}
