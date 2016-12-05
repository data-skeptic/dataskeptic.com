import React from 'react'
import { connect } from 'react-redux'

import NavLink from './NavLink'

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick() {
    this.props.dispatch({type: "TOGGLE_CART", payload: {} })
  }

  render() {
    var ocart = this.props.cart.toJS()
    var pathname = this.props.pathname
    if (pathname == '/index.htm') {
      pathname = '/'
    }
    var item_count = 0
    var cart_items = ocart.cart_items
    for (var i=0; i < cart_items.length; i++) {
      var item = cart_items[i]
      item_count += item.quantity
    }
    if (item_count == 0) {
      var cart_link = <NavLink to="/checkout" active={pathname}>
      <div className="menu-cart-container"></div>
      </NavLink>
    } else {
      var cart_link = (
        <div className="navlink-li-container">
          <div className="menu-cart-wrap">
            <button className="btn-open-cart-drawer" onClick={this.onClick.bind(this)}>
              <div className="menu-cart-container">
                <div className="menu-cart-inner">{item_count}</div>
              </div>
            </button>
          </div>
        </div>
      )
    }
    return (
      <div className="menu col-sm-12">
        <div className="menu-container">
          <div className="menu-container-inner">
            <ul className="topnav">
              <NavLink active={pathname} to="/">Home</NavLink>
              <NavLink active={pathname} to="/podcast">Podcasts</NavLink>
              <NavLink active={pathname} to="/blog">Blog</NavLink>
              <NavLink active={pathname} to="/store">Store</NavLink>
              <NavLink active={pathname} to="/projects">Projects</NavLink>
              <NavLink active={pathname} to="/services">Services</NavLink>
              <NavLink active={pathname} to="/members">Membership</NavLink>
              {cart_link}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ cart: state.cart }))(Menu)
