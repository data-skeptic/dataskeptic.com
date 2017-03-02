import React from 'react'
import { connect } from 'react-redux'

import {pay_invoice} from '../../utils/redux_loader';

class CreditCardForm2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			numeric_error: false,
			error_msg: ""
		}
	}
	componentWillMount() {
		var dispatch = this.props.dispatch
		dispatch({type: "RESET_INVOICE", payload: {}})
	}
	handleSubmit(event) {
		var ocart = this.props.cart.toJS()
		var prod = ocart.prod
		// Stripe.card.validateExpiry
		event.preventDefault()
		event.stopPropagation()
		var dispatch = this.props.dispatch
		var id = this.props.invoice_id
		var amount = this.props.total
		pay_invoice(prod, dispatch, event, id, amount)
	}
	isNumeric(n) {
	  return ;
	}
	onCCChange(e) {
		var id = e.target.id
		var n = e.target.value
		var error_msg = ""
		if (id == "cc-m") {
			if (n=="") {
				this.setState({numeric_error: false, error_msg})
			}
			else if (!(!isNaN(parseFloat(n)) && isFinite(n))) {
				error_msg = "Numeric values only please."
				this.setState({numeric_error: true, error_msg})
			} else {
				var x = parseInt(n)
				if (x < 1 || x > 12) {
					error_msg = "<img>"
					this.setState({numeric_error: true, error_msg})
				} else {
					this.setState({numeric_error: false, error_msg})				
				}
			}
		}
		else if (id == "cc-y") {
			var now = (new Date()).getYear()+1900
			if (n=="") {
				this.setState({numeric_error: false, error_msg})
			}
			else if (!(!isNaN(parseFloat(n)) && isFinite(n))) {
				error_msg = "Numeric values only please."
				this.setState({numeric_error: true, error_msg})
			} else {
				var x = parseInt(n)
				if (x < now && n.length >= 4) {
					error_msg = "Due to the limits of causality, we are unable to use credit cards with expirations in the past."
					this.setState({numeric_error: true, error_msg})
				} else {
					this.setState({numeric_error: false, error_msg})				
				}
			}
		}
		else if (id == "cc-c") {
			if (n.length >= 3) {
				var test = Stripe.card.validateCVC(n)
				if (!test) {
					var error_msg = "Please check the CVC"
					this.setState({numeric_error: true, error_msg})
				} else {
					this.setState({numeric_error: false, error_msg: ""})
				}
			} else {
				this.setState({numeric_error: false, error_msg: ""})
			}
			
		}
		else if (id == "cc-n") {
			var cardType = Stripe.card.cardType(n)
		}
	}
	render() {
		var ocart = this.props.cart.toJS()
		var paymentError = ocart.invoice.paymentError
		var paymentComplete = ocart.invoice.paymentComplete
		var submitDisabled = ocart.invoice.submitDisabled
		console.log("ocart.invoice")
		console.log(ocart.invoice)
		var abox = <div></div>
		var prod = ocart.prod
		if (paymentError != "") {
			abox = (
				<div className="row">
					<div className="col-xs-12 payment-error"><p>{ paymentError }</p></div>
				</div>
			)
		}
		var spinner = <div></div>
		if (submitDisabled) {
			spinner = <div className="spinner">
				<img src="/img/svg/spinner.svg" />
			</div>
		}
		var errors = <div></div>
		if (this.state.numeric_error) {
			errors = <div>{this.state.error_msg}</div>
		}
		if (this.state.error_msg == "<img>") {
			errors = <div><p>For your month m, please ensure that</p><img src="/img/svg/cc-error.svg" /></div>
		}
		var devmsg = <div></div>
		if (!prod) {
			devmsg = <div>Development mode</div>
		}
		if (paymentComplete) {
			return (
				<div className="cc-container">
					<div className="cc-outer">
						Thank you for your business.
					</div>
				</div>
			)
		}
		return (
			<div className="cc-container">
				<div className="col-xs-12 shipping-address-title">Billing Details</div>
				{spinner}
				{devmsg}
				<div className="cc-outer">
					<form onSubmit={this.handleSubmit.bind(this)}>
						{abox}
						<div className="row">
							<input id="cc-n" className="col-xs-12 cc-num" type='text' disabled={submitDisabled} data-stripe='number' placeholder='credit card number' onChange={this.onCCChange.bind(this)} /><br />
						</div>
						{errors}
						<div className="row">
							<input id="cc-m" className="col-xs-4 cc-yymm" type='text' disabled={submitDisabled} data-stripe='exp-month' placeholder='month' onChange={this.onCCChange.bind(this)} />
							<input id="cc-y" className="col-xs-4 cc-yymm" type='text' disabled={submitDisabled} data-stripe='exp-year' placeholder='year' onChange={this.onCCChange.bind(this)} />
							<input id="cc-c" className="col-xs-4 cc-cvc" type='text' disabled={submitDisabled} data-stripe='cvc' placeholder='cvc' onChange={this.onCCChange.bind(this)} /><br />
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

export default connect(state => ({ cart: state.cart }))(CreditCardForm2)
