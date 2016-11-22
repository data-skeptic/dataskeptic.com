import React, { Component } from 'react'
import { Link } from 'react-router'
import { Redirect } from 'react-router'

import Cart from './Cart'

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			goToCheckout: false
		}
		this.onClick = this.onClick.bind(this)
	}
	onClick(event) {
		event.preventDefault()
		event.stopPropagation()
		console.log("oc")
		this.props.toggleCart()
		this.setState({goToCheckout: true})
	}

    render() {
    	if (this.state.goToCheckout) {
    		var me = this
    		setTimeout(function(){ me.setState({goToCheckout: false}) }, 500)
    		return <Redirect to="/checkout" />
    	}
    	else {
	    	var cls = this.props.cart_visible ? "sidebar-visible": "sidebar-hidden"
		    return (
		    	<div class={cls}>
					<button onClick={this.props.toggleCart}>X - Close</button>
					<div>
						<Cart cart_items={this.props.cart_items} updatable={true} country={this.props.country} updateCartQuantity={this.props.updateCartQuantity} shipping={this.props.shipping} total={this.props.total} onChangeCountry={this.props.onChangeCountry} />
					</div>
					<div class="btnCheckoutContainer">
						<Link class="btnCheckout" to="/checkout" onClick={this.onClick}>Checkout</Link>
					</div>
			    </div>
			)    		
    	}
    }
}
