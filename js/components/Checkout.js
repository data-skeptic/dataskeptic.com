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
		var prod = false

		this.state = {
			stripeLoading: false,
			stripeLoadingError: false,
			submitDisabled: false,
			paymentError: null,
			paymentComplete: false,
			token: null,
			prod: prod,
			sizeSelected: {},
			address: {
				first_name: "",
				last_name: "",
				street_1: "",
				street_2: "",
				city: "",
				state: "",
				zip: "",
				phone: ""
			}
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
			return {isvalid: false, msg: "Please enter your name"}
		}
		if (address.street_1.trim() == "") {
			return {isvalid: false, msg: "Please provide a street address"}
		}
		if (address.city.trim() == "") {
			return {isvalid: false, msg: "Please provide a valid city"}
		}
		if (address.state.trim() == "") {
			return {isvalid: false, msg: "Please provide a state / province"}
		}
		if (address.zip.trim() == "") {
			return {isvalid: false, msg: "Please provide a postal code"}
		}
		if (address.phone.trim() == "") {
			return {isvalid: false, msg: "Please provide a phone number"}
		}
		return {isvalid: true, msg: ""}
	}

	onSubmit(event) {
		console.log("onSubmit")
		var self = this
		event.preventDefault()
		this.setState({ submitDisabled: true, paymentError: null })
		var msg = ""
		var valid = true
		var address = this.state.address
		var res = this.validate(address)
		var valid = res.isvalid
		var msg = res.msg
		if (!valid) {
			console.log("not valid")
			this.setState({ submitDisabled: false, paymentError: msg })
			return false
		}
		Stripe.createToken(event.target, function(status, response) {
			var paymentError = ""
			var paymentComplete = false
			var token = response.id
			var prod = self.state.prod
			var customer = {
				name: "n/a"
			}
			var country = self.props.country.short
			var products = self.props.cart_items
			var total    = self.props.total
			if (response.error) {
				paymentError = response.error.message
				self.setState({ paymentError, submitDisabled: false });
				console.log("error: " + paymentError)
				return
			} else {
				paymentComplete = true
				self.setState({ paymentComplete, submitDisabled: false, token });
				self.props.clearCart()
				console.log("order complete")
			}
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
		var val = target.value
		address[cls] = val
		console.log(address)
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
						<div class="checkout-box">
						    <div class="checkout-row">
						        <AddressForm title="Shipping Address" country={country} onAddressChange={this.onAddressChange.bind(this)} address={address} />
						        <CreditCardForm onSubmit={this.onSubmit.bind(this)} paymentError={this.state.paymentError} submitDisabled={this.state.submitDisabled} />
						    </div>
						    <div class="clear"></div>
						</div>
					</div>
				)
			}
			return (
				<div class="center">
					<h2>Cart</h2>
					<Cart cart_items={this.props.cart_items} updateable={false} country={this.props.country} updateCartQuantity={this.props.updateCartQuantity} onChangeCountry={this.props.onChangeCountry} shipping={this.props.shipping} total={this.props.total} />
					{checkout}
				</div>
			)
		}
	}
}
