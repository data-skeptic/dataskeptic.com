import React from 'react'
//import asyncLoad from 'react-async-loader'

export default class Store extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stripeLoading: false,
			stripeLoadingError: false,
			submitDisabled: false,
			paymentError: null,
			paymentComplete: false,
			token: null
		}
		var test_key = 'pk_test_y5MWdr7S7Sx6dpRCUTKOWfpf'
		var key = test_key
		Stripe.setPublishableKey(key)
		this.onSubmit = this.onSubmit.bind(this)
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
				console.log("yay!")
			}
		});
	}

	render() {
		if (this.state.stripeLoading) {
			return <div>Loading</div>
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
			return (
				<div class="center">
					<div>
						<h3>Items</h3>
					</div>
					<div>
						<h3>Cart</h3>
					</div>
					<div>
						<h3>Checkout</h3>
						<div class="checkout-box">
							<form onSubmit={this.onSubmit} >
								<p>{ this.state.paymentError }</p>
								<input class="cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
								<input class="cc-yymm" type='text' data-stripe='exp-month' placeholder='month' />
								<input class="cc-yymm" type='text' data-stripe='exp-year' placeholder='year' />
								<input class="cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' /><br />
								<input class="cc-purchase" disabled={this.state.submitDisabled} type='submit' value='Purchase' />
							</form>
						</div>
					</div>
				</div>
			)
		}
	}
}
