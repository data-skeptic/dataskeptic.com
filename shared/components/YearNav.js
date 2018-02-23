import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import {get_podcasts} from '../utils/redux_loader'

class YearNav extends React.Component {
	onClick() {
		var dispatch = this.props.dispatch
		var year = this.props.year
		var pathname = "/podcast/" + year
		get_podcasts(dispatch, pathname)
	}
	getClassNames(isActive) {
		var selectors = 'episode-year-container';
		if (isActive) {
			selectors += ' active'
		}
		return selectors;
	}
	render() {
		var year = this.props.year
		var active = this.props.active
		var down = "menu-button-up"
		if (active) {
			down = "menu-button-down"
		}
		var to = "/podcast/" + year
		var selectors = this.getClassNames(active);
		return (
			<div className={selectors}>
		            <Link key={to} onClick={this.onClick.bind(this)} className="menu-year" to={to}>{year}</Link>
			</div>
		)		
	}
}
export default connect(state => ({ episodes: state.episodes }))(YearNav)
