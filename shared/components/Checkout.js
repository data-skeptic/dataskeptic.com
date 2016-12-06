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
	}

	onScriptLoaded() {
		console.log("onScriptLoaded")
	}

	onScriptError() {
		console.log("onScriptError")
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
