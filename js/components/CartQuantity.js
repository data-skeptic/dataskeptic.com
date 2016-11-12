import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import axios from "axios"

export default class Checkout extends React.Component {
	constructor(props) {
		super(props)
	}
	update(delta) {
		var product = this.props.product
		var size = this.props.size
		this.props.updateCartQuantity(product, size, delta)
	}
	render() {
		if (this.props.updateable) {
			return (
				<div class="cart-quantity-container">
					<button class="cart-button" onClick={this.update.bind(this, -1)}>-</button>
					<span class="cart-quantity">{this.props.quantity}</span>
					<button class="cart-button" onClick={this.update.bind(this, 1)}>+</button>
				</div>
			)
		} else {	
			return (
					<div class="cart-quantity-container">
						{this.props.quantity}
					</div>
			)		
		}		
	}
}
