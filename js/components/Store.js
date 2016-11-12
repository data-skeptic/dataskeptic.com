import React from 'react'
import { Link } from 'react-router'
//import asyncLoad from 'react-async-loader'

import Loading from './Loading'
import Cart from './Cart'
import SizeSelector from './SizeSelector'

export default class Store extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
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
			var size = ""
			if (product["id"] == id) {
				if (product['sizes'] != undefined) {
					size = this.state.sizeSelected[product.id]
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
		if (!this.props.products_loaded) {
			return <div><Loading /></div>
		}
		else {
			var products = this.props.products
			products = products.sort(function(a, b) {
				var s1 = 1
				if (a['type'] == 'membership') {
					s1 = 1000
				}
				var s2 = 1
				if (b['type'] == 'membership') {
					s2 = 1000
				}
				var x = a['price'] * s1
				var y = b['price'] * s2
				return x - y
			})
			var me = this
			var shipping = this.props.shipping
			var total = this.props.total
			return (
				<div class="center">
					<div class="store-items">
						<div class="product-outer">
							<div class="product-header">
								<div class="product-header-item">Item</div>
								<div class="product-header-options"></div>
								<div class="product-header-price">Price</div>
							</div>
							<div class="clear"></div>
						</div>
						{products.map(function(product) {
							if (product.active == 1 && product.type != "membership") {
								var btnId = "add_" + product.id
								var sizeSelectorId = "ss_" + product.id
								var selection = me.state.sizeSelected[product.id]
								return (
									<div key={product.id} class="product-outer">
										<div class="product-row">
											<div class="product-main">
												<img class="product-image" src={product.img} />
												<span class="product-title">{product.title}</span><br />
											</div>

											<div class="product-right">
												<div class="product-right-top">
													<div class="product-pull-down">
														<SizeSelector id={sizeSelectorId} sizes={product['sizes']} value={selection} onChange={me.onSizeSelection.bind(me)} />
													</div>
													<div class="product-price">
														${product.price}
														<button class="add-to-cart" id={btnId} onClick={me.onAddToCart.bind(me)}>+</button>
													</div>
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
						<Cart cart_items={this.props.cart_items} updatable={true} country={this.props.country} updateCartQuantity={this.props.updateCartQuantity} shipping={shipping} total={total} onChangeCountry={this.props.onChangeCountry} />
					</div>
					<div class="btnCheckoutContainer">
						<Link class="btnCheckout" to="/checkout">Checkout</Link>
					</div>
				</div>
			)
		}
	}
}
