import React, { Component } from 'react'
import { Link } from 'react-router'
import { Redirect } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'

import CartContainer from '../Cart/Containers/CartContainer'

import { toggleCart } from '../Cart/Actions/CartActions'

class Sidebar extends Component {
	constructor(props) {
		super()
		this.onClick = this.onClick.bind(this)
		this.toggleCart = this.toggleCart.bind(this)
	}
	onClick(event) {
		this.props.toggleCart();
	}
	toggleCart() {
		this.props.toggleCart();
	}
    render() {
    	var ocart = this.props.cart.toJS()
    	var cart_visible = ocart.cart_visible
    	var cart_items = ocart.cart_items
    	var country_long = ocart.country_long
    	var total = ocart.total
    	var shipping = ocart.shipping

	    return (
	    	<div className={ classNames('sidebar', { 'opened': cart_visible, 'closed': !cart_visible }) }>
		    	<div className="inner">
					<button className="sidebar-close" onClick={this.toggleCart}><img src="https://s3.amazonaws.com/dataskeptic.com/img/svg/x.svg" alt=""/></button>

					<CartContainer
						needCheckout={true}
						onCheckoutClick={this.onClick}
						updatable={true} />
			    </div>
		    </div>
		)

    }
}

export default connect(
	state => ({
		cart: state.cart
	}),
	dispatch => bindActionCreators({
		toggleCart
	}, dispatch)
)(Sidebar)
