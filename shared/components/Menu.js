import React from 'react'
import { connect } from 'react-redux'

import NavLink from './NavLink'

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {pathname} = this.props

    return (
      <div className="nav">
        <NavLink active={pathname} to="/podcast">Podcasts</NavLink>
        <NavLink active={pathname} to="/blog">Blog</NavLink>
        <NavLink active={pathname} to="/projects">Projects</NavLink>
        <NavLink active={pathname} to="/services">Services</NavLink>
      </div>
    )
  }
}

export default connect(state => ({ cart: state.cart }))(Menu)
