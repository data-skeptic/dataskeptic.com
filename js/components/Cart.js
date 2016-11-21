import React from 'react'

import CartQuantity from './CartQuantity'
import CountrySelector from './CountrySelector'
import EmptyCart from './EmptyCart'

const Cart = props => {
	if (props.cart_items == undefined || props.cart_items.length == 0) {
		return <EmptyCart />
	} else {
		return (
			<div>
				<h2>Cart</h2>
				<div class="row cart-rows">
					<div class="col-sm-12">
						{props.cart_items.map(function(item) {
							var subtotal = item.product.price * item.quan
							var title = item.product.title
							var key = "key_" + item.product.id
							if (item.size != "") {
								title += " (" + item.size + ")"
								key += "_" + item.size
							}
							return (
								<div key={key} class="row">
									<div class="col-xs-5 cart-title">{title}</div>
									<div class="col-xs-1 cart-price">${item.product.price}</div>
									<div class="col-xs-4 cart-quan">
										<CartQuantity quantity={item.quan} updateable={true} product={item.product} size={item.size} updateCartQuantity={props.updateCartQuantity} />
									</div>
									<div class="col-xs-2 cart-subtotal">${subtotal}</div>
								</div>
							)
						})}
						<div class="cart-end">
							<div class="row">
								<div class="col-xs-8"><CountrySelector onChangeCountry={props.onChangeCountry} country={props.country} /></div>
								<div class="col-xs-2 cart-total">Shipping:</div>
								<div class="col-xs-2 cart-total">${props.shipping}</div>
							</div>
							<div class="row">
								<div class="col-xs-8"></div>
								<div class="col-xs-2 cart-total">Total:</div>
								<div class="col-xs-2 cart-total">${props.total}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Cart