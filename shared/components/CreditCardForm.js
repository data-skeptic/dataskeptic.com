import React from 'react'
import { connect } from 'react-redux'

class CreditCardForm extends React.Component {
	constructor(props) {
		super(props)
	}
	handleSubmit(event) {
		event.preventDefault()
		event.stopPropagation()
		var dispatch = this.props.dispatch
		dispatch((dispatch) => {
			this.props.dispatch({type: "DO_CHECKOUT", payload: { event, dispatch } })
		})
	}
	render() {
		console.log("render CreditCardForm")
		var ocart = this.props.cart.toJS()
		var paymentError = ocart.paymentError
		console.log(ocart)
		console.log(paymentError)
		var submitDisabled = ocart.submitDisabled
		var abox = <div></div>
		if (paymentError != "") {
			abox = (
				<div className="row">
					<div className="col-xs-12 payment-error"><p>{ paymentError }</p></div>
				</div>
			)
		}
		return (
			<div className="cc-container">
				<div className="col-xs-12 shipping-address-title">Credit Cart Info</div>
				<div className="cc-outer">
					<form onSubmit={this.handleSubmit.bind(this)}>
						{abox}
						<div className="row">
							<input className="col-xs-12 cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
						</div>
						<div className="row">
							<input className="col-xs-4 cc-yymm" type='text' data-stripe='exp-month' placeholder='month' />
							<input className="col-xs-4 cc-yymm" type='text' data-stripe='exp-year' placeholder='year' />
							<input className="col-xs-4 cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' /><br />
						</div>
						<div className="row">
							<input className="col-xs-12 cc-purchase" type='submit' disabled={submitDisabled} value='Purchase' />
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(CreditCardForm)
