import React from 'react'
//import asyncLoad from 'react-async-loader'

import AddressForm from './AddressForm'
import CreditCardForm from './CreditCardForm'


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
				// TODO: call Lambda API to record it
				console.log("yay!")
			}
		});
	}

	render() {
		var products = this.props.products
		if (this.state.stripeLoading || !this.props.products_loaded) {
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
					<div class="store-items">
						<h3>Items</h3>
						<div class="product-outer">
							<div class="product-header">
								<div class="product-header-item">Item</div>
								<div class="product-header-options">Options</div>
								<div class="product-header-price">Price</div>
							</div>
							<div class="clear"></div>
						</div>
						{products.map(function(product) {
							if (product.active == 1) {
							return (
								<div class="product-outer">
									<div class="product-row" key={product.id} >
										<div class="product-main">
											<span class="product-title">{product.title}</span><br />
											<p>{product.desc}</p>
										</div>

										<div class="product-right">
											<div class="product-right-top">
												<div class="product-pull-down">
													Pull down
												</div>
												<div class="product-price">
													{product.price}
												</div>
											</div>
											<div class="product-right-bottom">
												<button class="add-to-cart">+</button>
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
						Cart goes here.
					</div>
					<div>
						<h3>Checkout</h3>
						<div class="checkout-box">
						    <div class="checkout-row">
						        <AddressForm />
						        <CreditCardForm onSubmit={this.onSubmit.bind(this)} paymentError={this.state.paymentError} submitDisabled={this.state.submitDisabled} />
						    </div>					
						</div>
					</div>
				</div>
			)
		}
	}
}
