import React from 'react'
import YearNav from './YearNav.js'

export default class YearSelector extends React.Component {
	render() {
		var dyear = this.props.year
		return (
			<div className="year-select-outer">
				<div className="episode-selector">
					{this.props.years.map(function(year) {
						var key = Math.random().toString().substring(2,99)
						var active = (dyear == year)
						return <YearNav key={key} year={year} active={active} />
					})}
				</div>
			</div>
		)
	}
}
