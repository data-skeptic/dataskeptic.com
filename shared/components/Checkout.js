import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import AddressForm from './AddressForm'
import CartContainer from '../Cart/Containers/CartContainer'
import CreditCardForm from './CreditCardForm'
import Error from './Error'
import Loading from './Loading'
import SizeSelector from './SizeSelector'
import ThankYouPage from './ThankYouPage'

class Checkout extends Component {
	constructor(props) {
		super(props)
	}

	onScriptLoaded() {
		console.log("onScriptLoaded")
	}

	onScriptError() {
		console.log("onScriptError")
	}

	render() {
		const ocart = this.props.cart.toJS();
		const cart_items = ocart.cart_items;
		const country_long = ocart.country_long;
		const address = ocart.address;
		const stripeLoading = ocart.stripeLoading;
		const stripeLoadingError = ocart.stripeLoadError;
		const paymentComplete = ocart.paymentComplete;

		if (stripeLoading) {
			return <div><Loading /></div>
		}
		if (stripeLoadingError) {
			return <Error />
		}
		if (paymentComplete) {
			return <ThankYouPage />
		}
		if (cart_items.length == 0) {
			return <CartContainer updateable={true} />
		}
		else {
			return (
				<div className="checkout-page">
					<div className="checkout-cart">
						<CartContainer updateable={true} />
					</div>
					<div className="checkout-form">
						<h2>Checkout</h2>

						<AddressForm title="Shipping Information" />
						<CreditCardForm title="Billing Information"/>
					    <div className="clear"></div>
					</div>
				</div>
			)
		}
	}
}

export default connect(state => ({ cart: state.cart }))(Checkout)
