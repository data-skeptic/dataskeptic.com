import React from 'react'

import CartQuantity from './CartQuantity'

const Cart = props => {
	if (props.cart_items == undefined || props.cart_items.length == 0) {
		return <div>There is nothing in your cart.</div>
	} else {
		var total = 0
		return (
			<div class="cart-rows">
				<table class="cart-table">
					<thead>
						<tr>
							<th class="cart-thl">Item</th>
							<th class="cart-thc">Price</th>
							<th class="cart-thc">Quantity</th>
							<th class="cart-thr">Sub-total</th>
						</tr>
					</thead>
					<tbody>
						{props.cart_items.map(function(item) {
							var subtotal = item.product.price * item.quan
							total += subtotal
							var title = item.product.title
							if (item.size != "") {
								title += " (" + item.size + ")"
							}
							return (
								<tr key={item.id}>
									<td class="cart-title">{title}</td>
									<td class="cart-price">${item.product.price}</td>
									<td class="cart-quan">
										<CartQuantity quantity={item.quan} updateable={true} product={item.product} size={item.size} updateCartQuantity={props.updateCartQuantity} />
									</td>
									<td class="cart-subtotal">${subtotal}</td>
								</tr>
							)
						})}
						<tr>
							<td></td>
							<td></td>
							<td>Total:</td>
							<td class="cart-total">${total}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Cart