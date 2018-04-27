import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { setYear } from '../reducers/EpisodesReducer'

class YearNav extends React.Component {
  onClick(e) {
    e.preventDefault()
    const year = this.props.year === -1 ? null : this.props.year
    this.props.dispatch(setYear(year))
  }
  getClassNames(isActive) {
    var selectors = 'episode-year-container'
    if (isActive) {
      selectors += ' active'
    }
    return selectors
  }
  render() {
    const { year, label, active } = this.props
    var down = 'menu-button-up'
    if (active) {
      down = 'menu-button-down'
    }
    var to = '&year=' + year
    var selectors = this.getClassNames(active)
    return (
      <div className={selectors}>
        <Link
          key={to}
          onClick={this.onClick.bind(this)}
          className="menu-year"
          to={to}
        >
          {label ? label : year}
        </Link>
      </div>
    )
  }
}
export default connect(state => ({ episodes: state.episodes }))(YearNav)
