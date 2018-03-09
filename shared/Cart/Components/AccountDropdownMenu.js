import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import NavLink from '../../components/NavLink'

const isAdmin = user => user && user.type === 'admin'

export default class AccountDropdownMenu extends Component {
  setWrapperRef = node => (this.filterWrapper = node)
  handleClickOutside = e => {
    if (this.filterWrapper && !this.filterWrapper.contains(e.target)) {
      this.close()
    }
  }
  close = () => this.setState({ show: false })
  toggle = () => {
    this.setState({ show: !this.state.show })
  }
  itemClick = () => {
    this.close()
  }

  constructor() {
    super()

    this.state = {
      show: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render() {
    const { mobile, onClick, user } = this.props
    const { show } = this.state

    if (mobile) {
      return (
        <div>
          <NavLink to="/membership" onClick={onClick}>
            Membership Portal
          </NavLink>
          <NavLink to="/membership/downloads" onClick={onClick}>
            Downloads
          </NavLink>
          <NavLink to="/profile/playlist" onClick={onClick}>
            Playlist
          </NavLink>
          <NavLink to="/logout" onClick={onClick}>
            Logout
          </NavLink>
        </div>
      )
    }

    return (
      <div
        className={classNames('navlink-li-container dropdown', {
          open: show
        })}
        ref={this.setWrapperRef}
      >
        <button
          className="btn btn-default dropdown-toggle navlink-btn"
          type="button"
          data-toggle="dropdown"
          onClick={this.toggle}
        >
          My Account <span className="caret" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to="/membership" onClick={this.itemClick}>
              Membership Portal
            </Link>
          </li>
          <li>
            <Link to="/membership/downloads" onClick={this.itemClick}>
              Downloads
            </Link>
          </li>
          <li>
            <Link to="/profile/playlist" onClick={this.itemClick}>
              Playlist
            </Link>
          </li>

          {isAdmin(user) && <li role="separator" className="divider" />}
          {isAdmin(user) && (
            <li>
              <Link to="/admin" onClick={this.itemClick}>
                Admin
              </Link>
            </li>
          )}

          <li role="separator" className="divider" />
          <li>
            <Link to="/logout" onClick={this.itemClick}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}
