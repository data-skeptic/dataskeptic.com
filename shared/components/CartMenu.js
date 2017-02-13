import React from 'react'
import { connect } from 'react-redux'

import NavLink from './NavLink'
import CartLink from './CartLink'

class CartMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick() {
    this.props.dispatch({type: "TOGGLE_CART", payload: {} })
  }

  render() {
    let {pathname, cart} = this.props;

    return (
      <div className="nav">
        <NavLink active={pathname} to="/sponsor">Sponsor</NavLink>
        <NavLink active={pathname} to="/store">Store</NavLink>
        <CartLink cart={cart}/>
      </div>
    )
  }
}

export default connect(state => ({ cart: state.cart }))(CartMenu)
