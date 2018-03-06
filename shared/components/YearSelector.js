import React from 'react'
import YearNav from './YearNav.js'

export default class YearSelector extends React.Component {
  render() {
    var dyear = this.props.year
    return (
      <div className="year-select-outer">
        <div className="episode-selector">
          {this.props.years.map(function(year, index) {
            var active = dyear === year
            return <YearNav key={index} year={year} active={active} />
          })}
        </div>
      </div>
    )
  }
}
