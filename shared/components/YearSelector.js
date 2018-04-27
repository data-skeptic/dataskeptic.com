import React from 'react'
import YearNav from './YearNav.js'

export default class YearSelector extends React.Component {
  render() {
    const dyear = this.props.year
    return (
      <div className="year-select-outer">
        <div className="episode-selector">
          {this.props.years.map((year, index) => {
            const active = dyear == year
            return (
              <YearNav
                key={index}
                year={year}
                active={active}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
