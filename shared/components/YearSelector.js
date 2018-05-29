import React from 'react'
import YearNav from './YearNav.js'

export default class YearSelector extends React.Component {
  render() {
    const dyear = this.props.year
    return (
      <div className="year-select-outer">
        <div className="episode-selector">
          <YearNav
            key={'all'}
            year={-1}
            label={`All`}
          />
          {this.props.years.map((year, index) => {
            const active = dyear && dyear == year
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
