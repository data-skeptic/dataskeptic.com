import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { toggleMobileMenu } from '../Layout/Actions/LayoutActions'

import Menu from './Menu'
import CartMenu from '../Cart/Components/CartMenu'
import CartLink from '../Cart/Components/CartLink'

import { toggleCart } from '../Cart/Actions/CartActions'

import { getItemsCount as getCartItemsCount } from '../Cart/Helpers/getItemsCount'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.onCartClick = this.onCartClick.bind(this)
    this.onToggleMenuClick = this.onToggleMenuClick.bind(this)
  }

  /**
   * Handler for cart button click
   *
   */
  onCartClick() {
    this.props.toggleCart()
  }

  /**
   * Handler for toggle main site menu visibility button click
   *
   */
  onToggleMenuClick() {
    this.props.toggleMobileMenu()
  }

  /**
   * Collect class list for current state
   *
   * @param isMobileMenuVisible
   * @returns {string} classList List of component styles
   */
  getClassList({ isMobileMenuVisible }) {
    let classList = ['header']

    if (isMobileMenuVisible) {
      classList.push('collapsed')
    }

    return classList.join(' ')
  }

  render() {
    const { pathname, isMobileMenuVisible, cart, loggedIn, user } = this.props
    const itemsCount = getCartItemsCount(cart.toJS().cart_items)
    const classList = this.getClassList({ isMobileMenuVisible })

    return (
      <div className={classList}>
        <div className="hidden-xs desktop">
          <div className="cart-menu pull-right">
            <CartMenu
              loggedIn={loggedIn}
              pathname={pathname}
              cartItemsCount={itemsCount}
              cartClick={this.onCartClick}
              user={user}
            />
          </div>
          <div className="cart-menu pull-right" />
          <div className="logo pull-left">
            <Link to="/" id="logo_desktop">
              <img src="/img/svg/logo.svg" alt="Data Skeptic logo" />
            </Link>
          </div>
          <div className="mainnav">
            <Menu pathname={pathname} />
          </div>
        </div>
        <div className="visible-xs mobile">
          <div className="menu-collapse pull-left">
            <button
              type="button"
              className="btn-collapse"
              onClick={this.onToggleMenuClick}
            >
              <div className="icon-container">
                <span className="icon-bar icon-bar-f" />
                <span className="icon-bar icon-bar-s" />
                <span className="icon-bar icon-bar-t" />
              </div>
            </button>
          </div>
          <div className="cart pull-right">
            <CartLink itemCount={itemsCount} onClick={this.onCartClick} />
          </div>
          <div className="logo">
            <Link to="/" id="logo_mobile">
              <img src="/img/svg/logo-min.svg" alt="Data Skeptic logo" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.auth.getIn(['user']).toJS(),
    loggedIn: state.auth.getIn(['loggedIn']),
    isMobileMenuVisible: state.layout.getIn(['isMobileMenuVisible']),
    cart: state.cart
  }),
  dispatch =>
    bindActionCreators(
      {
        toggleMobileMenu,
        toggleCart
      },
      dispatch
    )
)(Header)
