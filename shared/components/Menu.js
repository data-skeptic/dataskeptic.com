import React, { Component } from 'react'

import NavLink from './NavLink'

class Menu extends Component {
  constructor(props) {
    super(props)
  }

  isLinkActive(link) {
    const { pathname } = this.props

    return pathname.indexOf(link) === 0
  }

  render() {
    const { itemClick, children } = this.props

    const links = [
      { to: '/podcast', name: 'Podcasts' },
      { to: '/blog', name: 'Blog' },
      { to: '/contact-us', name: 'Contact Us' },
      { to: '/services', name: 'Services' },
      { to: '/about', name: 'About' }
    ]

    return (
      <div className="nav">
        {children}

        {links.map(({ to, name }, ind) => (
          <NavLink
            key={ind}
            isActive={this.isLinkActive(to)}
            to={to}
            onClick={itemClick}
          >
            {name}
          </NavLink>
        ))}
      </div>
    )
  }
}

export default Menu
