import React from 'react'
import { Link } from 'react-router'
//import asyncLoad from 'react-async-loader'

import Loading from './Loading'
import Cart from './Cart'
import StoreItem from './StoreItem'

export default class Store extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
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
							return <StoreItem key={product.id} product={product} addToCart={me.props.addToCart} />
						})}
					</div>

					<div>
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
