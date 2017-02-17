import React from 'react'
import { connect } from 'react-redux'

import CartQuantity from '../Components/CartQuantity'
import CountrySelector from '../../components/CountrySelector'
import EmptyCart from '../Components/EmptyCart'
import CartItem from '../Components/CartItem'

class CartContainer extends React.Component {
	render() {
		var ocart = this.props.cart.toJS()
		var cart_items = ocart.cart_items
		var shipping = ocart.shipping
		var total = ocart.total
		if (cart_items == undefined || cart_items.length == 0) {
			return <EmptyCart />
		} else {
			return (
				<div>
					<h2>Cart</h2>
					<div className="cart-rows">
						<div className="col-sm-12 cart-top cart-inner">
							{cart_items.map(function(item) {
								console.dir(item);
								var subtotal = item.product.price * item.quantity
								var title = item.product.title
								var key = "key_" + item.product.id
								if (item.size != "") {
									title += " (" + item.size + ")"
									key += "_" + item.size
								}
								return (
									<CartItem key={key}
											  title={title}
											  product={item.product}
											  subtype={item.size}
											  quantity={item.quantity}
											  size={item.size}
											  subtotal={subtotal.toFixed(2)}
									/>
								)
							})}
							<div className="cart-end">
								<div className="row">
									<div className="col-xs-6"><CountrySelector /></div>
									<div className="col-xs-3 cart-total">Shipping:</div>
									<div className="col-xs-2 cart-total">${shipping}</div>
								</div>
								<div className="row">
									<div className="col-xs-6"></div>
									<div className="col-xs-3 cart-total">Total:</div>
									<div className="col-xs-2 cart-total">${total}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default connect(
	state => ({ cart: state.cart })
)(CartContainer)
