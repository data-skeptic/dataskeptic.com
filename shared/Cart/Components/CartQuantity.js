import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'

class CartQuantity extends React.Component {
	constructor(props) {
		super(props)
	}
	update(delta) {
		var product = this.props.product
		var size = this.props.size
		if (delta == 1) {
			this.props.dispatch({type: "CHANGE_CART_QUANTITY", payload: {product, size, delta} })
		} else {
			this.props.dispatch({type: "CHANGE_CART_QUANTITY", payload: {product, size, delta} })			
		}
	}
	render() {
		if (this.props.updateable) {
			return (
				<div className="cart-quantity-container">
					<button className="cart-button" onClick={this.update.bind(this, -1)}>-</button>
					<span className="cart-quantity">{this.props.quantity}</span>
					<button className="cart-button" onClick={this.update.bind(this, 1)}>+</button>
				</div>
			)
		} else {	
			return (
					<div className="cart-quantity-container">
						{this.props.quantity}
					</div>
			)		
		}		
	}
}

export default connect(state => ({ cart: state.cart }))(CartQuantity)
