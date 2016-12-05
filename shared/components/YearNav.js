import React from 'react'
import { connect } from 'react-redux'

@connect((store) => {
	return {
		episodes: store.episodes
	}
})
export default class YearNav extends React.Component {
	onClick(e) {
		var year = this.props.year
		this.props.dispatch({type: "SET_YEAR", payload: year })
	}

	render() {
		var year = this.props.year
		var active = this.props.active
		var down = "menu-button-up"
		if (active) {
			down = "menu-button-down"
		}
		return (
			<div className="episode-year-container">
				<button className="menu-year" className={down} onClick={this.onClick.bind(this)}>{year}</button>
			</div>
		)		
	}
}
