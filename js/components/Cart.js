import React from 'react'

import CartQuantity from './CartQuantity'
import CountrySelector from './CountrySelector'
import EmptyCart from './EmptyCart'

const Cart = props => {
	if (props.cart_items == undefined || props.cart_items.length == 0) {
		return <EmptyCart />
	} else {
		return (
			<div class="cart-rows">
				<table class="cart-table">
					<tbody>
						{props.cart_items.map(function(item) {
							var subtotal = item.product.price * item.quan
							var title = item.product.title
							if (item.size != "") {
								title += " (" + item.size + ")"
							}
							var key = "key_" + item.product.id
							return (
								<tr key={key}>
									<td class="cart-title">{title}</td>
									<td class="cart-price">${item.product.price}</td>
									<td class="cart-quan">
										<CartQuantity quantity={item.quan} updateable={true} product={item.product} size={item.size} updateCartQuantity={props.updateCartQuantity} />
									</td>
									<td class="cart-subtotal">${subtotal}</td>
								</tr>
							)
						})}
						<tr key="countryrow">
							<td>Country: <CountrySelector onChangeCountry={props.onChangeCountry} country={props.country} /></td>
							<td></td>
							<td class="cart-total">Shipping:</td>
							<td class="cart-total">${props.shipping}</td>
						</tr>
						<tr key="totalrow">
							<td></td>
							<td></td>
							<td class="cart-total">Total:</td>
							<td class="cart-total">${props.total}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Cart