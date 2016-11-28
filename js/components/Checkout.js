import React from 'react'
//import asyncLoad from 'react-async-loader'

import AddressForm from './AddressForm'
import CreditCardForm from './CreditCardForm'
import Loading from './Loading'
import Cart from './Cart'
import SizeSelector from './SizeSelector'
import ThankYouPage from './ThankYouPage'
import axios from "axios"

export default class Checkout extends React.Component {
	constructor(props) {
		super(props)
		var prod = this.props.prod

		this.state = {
			stripeLoading: false,
			stripeLoadingError: false,
			submitDisabled: false,
			paymentError: "",
			paymentComplete: false,
			token: null,
			sizeSelected: {},
			address: {
				first_name: "",
				last_name: "",
				street_1: "",
				street_2: "",
				city: "",
				state: "",
				zip: "",
				phone: "",
				email: ""
			},
			focus: "",
			focus_msg: ""
		}
		if (prod) {
			var key = 'pk_live_voDrzfYzsfKP33iuzmhxL4JY'
		} else {
			var key = 'pk_test_y5MWdr7S7Sx6dpRCUTKOWfpf'
		}
		Stripe.setPublishableKey(key)
		this.adjust_for_dynamodb_bug = this.adjust_for_dynamodb_bug.bind(this)
		this.onAddressChange = this.onAddressChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onScriptLoaded() {
		console.log("test")
	}

	onScriptError() {
		console.log("err")
	}

	adjust_for_dynamodb_bug(obj) {
		// Bug described in: https://forums.aws.amazon.com/thread.jspa?threadID=90137
		var obj2 = JSON.parse(JSON.stringify(obj))
		if (typeof(obj2)=="object") {
			var keys = Object.keys(obj2)
			for (var i=0; i < keys.length; i++) {
				var key = keys[i]
				var val = obj2[key]
				if (typeof(val)=="string") {
					if (val=="") {
						obj2[key] = " "
					}
				}
				else if (typeof(val)=="object") {
					obj2[key] = this.adjust_for_dynamodb_bug(val)
				}
			}
			return obj2
		} else {
			return obj2
		}
	}

	validate(address) {
		if (address.last_name.trim() == "") {
			return {isvalid: false, msg: "Please enter your name", focus: "last_name", focus_msg: "Please enter your name"}
		}
		if (address.street_1.trim() == "") {
			return {isvalid: false, msg: "Please provide a street address", focus: "street_1", focus_msg: "Please enter your street address"}
		}
		if (address.city.trim() == "") {
			return {isvalid: false, msg: "Please provide a valid city", focus: "city", focus_msg: "Please enter your city"}
		}
		if (address.state.trim() == "") {
			return {isvalid: false, msg: "Please provide a state / province", focus: "state", focus_msg: "Please enter your state/province"}
		}
		if (address.zip.trim() == "") {
			return {isvalid: false, msg: "Please provide a postal code", focus: "zip", focus_msg: "Please enter your postal code"}
		}
		if (address.phone.trim() == "") {
			return {isvalid: false, msg: "Please provide a phone number", focus: "phone", focus_msg: "Please enter your phone number"}
		}
		return {isvalid: true, msg: "", focus: "", focus_msg: ""}
	}

	onSubmit(event) {
		var self = this
		this.setState({ submitDisabled: true, paymentError: "" })
		var msg = ""
		var valid = true
		var address = this.state.address
		// TODO: do some validation on the address
		var res = this.validate(address)
		var valid = res.isvalid
		var msg = ""
		var focus = res.focus
		var focus_msg = res.focus_msg
		if (!valid) {
			console.log("not valid: " + msg)
			this.setState({ submitDisabled: false, paymentError: msg, focus, focus_msg })
			return false
		}
		/*
var stripe = require("stripe")("sk_test_JDu4VvArX2Oa2vh0DOek972y");

// Get the credit card details submitted by the form
var token = request.body.stripeToken; // Using Express

stripe.customers.create({
  source: token,
  plan: "gold",
  email: "payinguser@example.com"
}, function(err, customer) {
  // ...
});
https://stripe.com/docs/subscriptions/tutorial		
		*/
		Stripe.createToken(event.target, function(status, response) {
			var paymentError = ""
			var paymentComplete = false
			var token = response.id
			var prod = self.props.prod
			var customer = address
			var country = self.props.country.short
			var products = self.props.cart_items
			var total    = self.props.total
			if (response.error) {
				paymentError = response.error.message
				self.setState({ paymentError, focus_msg: "", submitDisabled: false });
				console.log("error: " + paymentError)
				return
			} else {
				paymentComplete = true
				self.setState({ paymentComplete, submitDisabled: false, token });
				self.props.clearCart()
				console.log("order complete")
			}
			// Save in database
			var dt = (new Date()).toString()
			var order = {customer, products, total, paymentComplete, token, paymentError, prod, country, dt}
			order = self.adjust_for_dynamodb_bug(order)
			console.log(JSON.stringify(order))
			axios
				.post("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/order", order)
				.then(function(result) {
					console.log(result)
					console.log("Success")
				})
				.catch(function(err) {
					console.log(err)
				})
		});
	}

	onAddressChange(event) {
		var address = JSON.parse(JSON.stringify(this.state.address))
		var target = event.target
		var cls = target.className
		cls = cls.replace("address-input ", "")
		var val = target.value
		address[cls] = val
		this.setState({address})
	}
	render() {
		var products = this.props.products
		var country = this.props.country.long
		var address = this.state.address
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
						<div class="row checkout-box">
						    <div class="col-xs-12 col-sm-8">
						        <AddressForm focus={this.state.focus} focus_msg={this.state.focus_msg} title="Shipping Address" country={country} onAddressChange={this.onAddressChange.bind(this)} address={address} />
						    </div>
						    <div class="col-xs-12 col-sm-4">
						        <CreditCardForm onSubmit={this.onSubmit.bind(this)} paymentError={this.state.paymentError} submitDisabled={this.state.submitDisabled} />
						    </div>
						    <div class="clear"></div>
						</div>
					</div>
				)
			}
			return (
				<div class="center">
					<Cart cart_items={this.props.cart_items} updateable={false} country={this.props.country} updateCartQuantity={this.props.updateCartQuantity} onChangeCountry={this.props.onChangeCountry} shipping={this.props.shipping} total={this.props.total} />
					{checkout}
				</div>
			)
		}
	}
}
