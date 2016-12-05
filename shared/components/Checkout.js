import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import axios from "axios"

import AddressForm from './AddressForm'
import Cart from './Cart'
import CreditCardForm from './CreditCardForm'
import Error from './Error'
import Loading from './Loading'
import SizeSelector from './SizeSelector'
import ThankYouPage from './ThankYouPage'

class Checkout extends React.Component {
	constructor(props) {
		super(props)
		var prod = this.props.prod

		this.state = {
		}
		if (prod) {
			var key = 'pk_live_voDrzfYzsfKP33iuzmhxL4JY'
		} else {
			var key = 'pk_test_y5MWdr7S7Sx6dpRCUTKOWfpf'
		}
		Stripe.setPublishableKey(key)
		this.adjust_for_dynamodb_bug = this.adjust_for_dynamodb_bug.bind(this)
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
		Stripe.createToken(event.target, function(status, response) {
			var paymentError = ""
			var paymentComplete = false
			var token = response.id
			var prod = self.props.prod
			var customer = address
			var country = self.props.country.short
			var products = self.props.cart_items
			var total    = self.props.total
			var shipping = self.props.shipping
			if (response.error) {
				paymentError = response.error.message
				self.setState({ paymentError, focus_msg: "", submitDisabled: false });
				console.log("error: " + paymentError)
				return
			} else {
				self.setState({ submitDisabled: true, token });
				var dt = (new Date()).toString()
				var order = {customer, products, total, paymentComplete, token, paymentError, prod, country, dt, shipping}
				order = self.adjust_for_dynamodb_bug(order)
				console.log(JSON.stringify(order))
				console.log(token)
				axios
					.post("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/order", order)
					.then(function(resp) {
						console.log(resp)
						var result = resp["data"]
						console.log(result)
						if (result["status"] != "ok") {
							console.log(result["msg"])
							self.setState({ paymentComplete: false, submitDisabled: false, paymentError: result["msg"] });
							console.log("order api error")
						} else {
							console.log("Success")
							self.setState({ paymentComplete: true, submitDisabled: false });
							self.props.clearCart()
							console.log("order complete")
						}
					})
					.catch(function(err) {
						console.log("order error")
						console.log(err)
						var msg = "Error placing your order: " + err
						self.setState({ paymentComplete: false, submitDisabled: false, paymentError: msg });
					})
			}
		});
	}

	render() {
		var ocart = this.props.cart.toJS()
		var cart_items = ocart.cart_items
		var country_long = ocart.country_long
		var address = ocart.address
		var stripeLoading = ocart.stripeLoading
		var stripeLoadingError = ocart.stripeLoadError
		var paymentComplete = ocart.paymentComplete
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
			return <Cart updateable={true} />
		}
		else {
			var me = this
			var checkout = <div></div>
			return (
				<div className="center">
					<Cart updateable={false} />
					<div>
						<h2>Checkout</h2>
					    <div className="col-xs-12">
					        <AddressForm title="Shipping Address" />
					    </div>
					    <div>&nbsp;</div>
					    <div className="col-xs-12">
					        <CreditCardForm />
					    </div>
					    <div className="clear"></div>
					</div>
				    <div>&nbsp;</div>
				    <div>&nbsp;</div>
				</div>
			)
		}
	}
}

export default connect(state => ({ cart: state.cart }))(Checkout)
