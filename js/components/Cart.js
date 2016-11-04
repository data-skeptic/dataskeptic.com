import React from 'react'

const Cart = props => {
	if (props.cart_items == undefined || props.cart_items.length == 0) {
		return <div>There is nothing in your cart.</div>
	} else {
		var total = 0
		return (
			<div class="cart-rows">
				<table>
					<thead>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Sub-total</th>
						</tr>
					</thead>
					<tbody>
						{props.cart_items.map(function(item) {
							var subtotal = item.product.price * item.quan
							total += subtotal
							var title = item.product.title
							if (item.size != undefined) {
								title += " (" + item.size + ")"
							}
							return (
								<tr key={item.id}>
									<td>{title}</td>
									<td>{item.product.price}</td>
									<td>{item.quan}</td>
									<td>{subtotal}</td>
								</tr>
							)
						})}
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td>{total}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Cart