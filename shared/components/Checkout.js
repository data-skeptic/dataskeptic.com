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
