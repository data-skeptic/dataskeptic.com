import React from 'react'
import { Link } from 'react-router'
//import asyncLoad from 'react-async-loader'

import AddressForm from './AddressForm'
import CreditCardForm from './CreditCardForm'
import Loading from './Loading'
import Cart from './Cart'
import SizeSelector from './SizeSelector'

export default class Store extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stripeLoading: false,
			stripeLoadingError: false,
			submitDisabled: false,
			paymentError: null,
			paymentComplete: false,
			token: null,
			sizeSelected: {}
		}
		this.onSizeSelection = this.onSizeSelection.bind(this)
	}

	onAddToCart(event) {
		var btn = event.target
		var id = btn.id.split("_")[1]
		var products = this.props.products
		for (var i in products) {
			var product = products[i]
			if (product["id"] == id) {
				if (product['sizes'] != undefined) {
					var size = this.state.sizeSelected[product.id]
					if (size == undefined) {
						alert("Please select a size first")
						return;
					}
				}
				this.props.addToCart(product, size)
			}
		}
	}

	onSizeSelection(event) {
		var select = event.target
		var id = select.id.split("_")[1]
		var val = select.value
		var sizeSelected = this.state.sizeSelected
		sizeSelected[id] = val
		this.setState({sizeSelected})
	}

	render() {
		var products = this.props.products
		if (this.state.stripeLoading || !this.props.products_loaded) {
			return <div><Loading /></div>
		}
		else if (this.state.stripeLoadingError) {
			return <div>Error</div>
		}
		else if (this.state.paymentComplete) {
			return (
				<div class="thank-you">
				<h1>Thank you!</h1>
				<p>Payment Complete.</p>
				<p>Please allow 2-4 weeks for delivery.</p>
				</div>
			)
		}
		else {
			var me = this
			return (
				<div class="center">
					<div class="store-items">
						<div class="product-outer">
							<div class="product-header">
								<div class="product-header-item">Item</div>
								<div class="product-header-options">Options</div>
								<div class="product-header-price">Price</div>
							</div>
							<div class="clear"></div>
						</div>
						{products.map(function(product) {
							if (product.active == 1) {
								var btnId = "add_" + product.id
								var sizeSelectorId = "ss_" + product.id
								var selection = me.state.sizeSelected[product.id]
								return (
									<div key={product.id} class="product-outer">
										<div class="product-row">
											<div class="product-main">
												<img class="product-image" src={product.img} />
												<span class="product-title">{product.title}</span><br />
												<p>{product.desc}</p>
											</div>

											<div class="product-right">
												<div class="product-right-top">
													<div class="product-pull-down">
														<SizeSelector id={sizeSelectorId} sizes={product['sizes']} value={selection} onChange={me.onSizeSelection.bind(me)} />
													</div>
													<div class="product-price">
														${product.price}
													</div>
												</div>
												<div class="product-right-bottom">
													<button class="add-to-cart" id={btnId} onClick={me.onAddToCart.bind(me)}>+</button>
												</div>
											</div>
										</div>
										<div class="clear"></div>
									</div>
								)
							}
						})}
					</div>

					<div>
						<h3>Cart</h3>
						<Cart cart_items={this.props.cart_items} />
					</div>
					<Link to="/checkout">Checkout</Link>
				</div>
			)
		}
	}
}
