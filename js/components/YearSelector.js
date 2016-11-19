import React from 'react'
import YearNav from './YearNav.js'

export default class YearSelector extends React.Component {
	render() {
		var dyear = this.props.year
		var changeYear = this.props.changeYear
		return (
			<div class="year-select-outer">
				<div class="episode-selector">
					{this.props.years.map(function(year) {
						var key = Math.random().toString().substring(2,99)
						var active = (dyear == year)
						return <YearNav key={key} year={year} changeYear={changeYear} active={active} />
					})}
				</div>
			</div>
		)
	}
}
