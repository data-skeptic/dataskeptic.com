import React from 'react'
//import asyncLoad from 'react-async-loader'

import AddressForm from './AddressForm'
import CreditCardForm from './CreditCardForm'
import Loading from './Loading'
import Cart from './Cart'
import SizeSelector from './SizeSelector'
import ThankYouPage from './ThankYouPage'

export default class Checkout extends React.Component {
	constructor(props) {
		super(props)
		var prod = false
		this.state = {
			stripeLoading: false,
			stripeLoadingError: false,
			submitDisabled: false,
			paymentError: null,
			paymentComplete: false,
			token: null,
			prod: prod,
			sizeSelected: {}
		}
		if (prod) {
			var key = 'pk_live_voDrzfYzsfKP33iuzmhxL4JY'
		} else {
			var key = 'pk_test_y5MWdr7S7Sx6dpRCUTKOWfpf'
		}
		Stripe.setPublishableKey(key)
	}

	onScriptLoaded() {
		console.log("test")
	}

	onScriptError() {
		console.log("err")
	}

	onSubmit(event) {
		var self = this;
		event.preventDefault();
		this.setState({ submitDisabled: true, paymentError: null });
		// send form here
		Stripe.createToken(event.target, function(status, response) {
			if (response.error) {
				self.setState({ paymentError: response.error.message, submitDisabled: false });
				console.log("error!")
			} else {
				self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
				// make request to your server here!
				// TODO: call Lambda API to record it
				console.log("yay!")
			}
		});
	}

	render() {
		var products = this.props.products
		if (this.state.stripeLoading) {
			return <div><Loading /></div>
		}
		else if (this.state.stripeLoadingError) {
			return <div>Error</div>
		}
		else if (this.state.paymentComplete) {
			return <ThankYouPage />
		}
		else {
			var me = this
			var checkout = <div></div>
			if (this.props.cart_items.length > 0) {
				checkout = (
					<div>
						<h3>Checkout</h3>
						<div class="checkout-box">
						    <div class="checkout-row">
						        <AddressForm title="Shipping Address" />
						        <CreditCardForm onSubmit={this.onSubmit.bind(this)} paymentCompleteError={this.state.paymentError} submitDisabled={this.state.submitDisabled} />
						    </div>
						    <div class="clear"></div>
						</div>
					</div>
				)
			}
			return (
				<div class="center">
					<Cart cart_items={this.props.cart_items} updateable={false} updateCartQuantity={this.props.updateCartQuantity} />
					{checkout}
				</div>
			)
		}
	}
}
