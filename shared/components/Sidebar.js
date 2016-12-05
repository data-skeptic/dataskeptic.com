import React, { Component } from 'react'
import { Link } from 'react-router'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import Cart from './Cart'

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
	}
	onClick(event) {
		this.props.dispatch({type: "TOGGLE_CART", payload: {} })
	}
	toggleCart() {
		this.props.dispatch({type: "TOGGLE_CART", payload: {} })
	}

    render() {
    	var ocart = this.props.cart.toJS()
    	var cart_visible = ocart.cart_visible
    	var cart_items = ocart.cart_items
    	var country_long = ocart.country_long
    	var total = ocart.total
    	var shipping = ocart.shipping

	    var cls = cart_visible ? "sidebar-visible": "sidebar-hidden"
	    return (
	    	<div className="sidebar">
		    	<div className={cls}>
					<button onClick={this.toggleCart.bind(this)}>X - Close</button>
					<div>
						<Cart updatable={true} />
					</div>
					<div className="btnCheckoutContainer">
						<Link className="btnCheckout" to="/checkout" onClick={this.onClick.bind(this)}>Checkout</Link>
					</div>
			    </div>
		    </div>
		)

    }
}

export default connect(state => ({ cart: state.cart }))(Sidebar)
