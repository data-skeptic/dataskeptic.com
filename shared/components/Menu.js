import React from 'react'
import { connect } from 'react-redux'

import NavLink from './NavLink'

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { pathname, itemClick } = this.props

    return (
      <div className="nav">
        <NavLink active={pathname} to="/podcast" onClick={itemClick}>Podcasts</NavLink>
        <NavLink active={pathname} to="/blog" onClick={itemClick}>Blog</NavLink>
        <NavLink active={pathname} to="/projects" onClick={itemClick}>Projects</NavLink>
        <NavLink active={pathname} to="/services" onClick={itemClick}>Services</NavLink>
      </div>
    )
  }
}

export default Menu;
