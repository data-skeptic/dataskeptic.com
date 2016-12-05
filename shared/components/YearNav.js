import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

@connect((store) => {
	return {
		episodes: store.episodes
	}
})
export default class YearNav extends React.Component {
	render() {
		var year = this.props.year
		var active = this.props.active
		var down = "menu-button-up"
		if (active) {
			down = "menu-button-down"
		}
		var to = "/podcast/" + year
		return (
			<div className="episode-year-container">
		            <Link key={to} className="menu-year" to={to}>{year}</Link>
			</div>
		)		
	}
}
