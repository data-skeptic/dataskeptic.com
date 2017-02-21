import React from 'react'
import { connect } from 'react-redux'

class CreditCardForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			numeric_error: false,
			error_msg: ""
		}
	}
	handleSubmit(event) {
		// Stripe.card.validateExpiry
		event.preventDefault()
		event.stopPropagation()
		var dispatch = this.props.dispatch
		dispatch((dispatch) => {
			this.props.dispatch({type: "DO_CHECKOUT", payload: { event, dispatch } })
		})
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
		const { title } = this.props;
		const ocart = this.props.cart.toJS();
		const paymentError = ocart.paymentError;
		const submitDisabled = ocart.submitDisabled;
		let abox = <div></div>;
		if (paymentError != "") {
			abox = (
				<div className="row">
					<div className="col-xs-12 payment-error"><p>{ paymentError }</p></div>
				</div>
			)
		}
		let spinner = <div></div>;
		if (submitDisabled) {
			spinner = <div className="spinner">
				<img src="/img/svg/spinner.svg" />
			</div>
		}
		let errors = <div></div>;
		if (this.state.numeric_error) {
			errors = <div>{this.state.error_msg}</div>
		}
		if (this.state.error_msg === "<img>") {
			errors = <div><p>For your month m, please ensure that</p><img src="/img/svg/cc-error.svg" /></div>
		}
		return (
			<div className="credit-cart-form">
				<div className="shipping-address-title">{title}</div>
				{spinner}
				<div className="">
					<form onSubmit={this.handleSubmit.bind(this)}>
						{abox}
						<div>
							<input id="cc-n" className="cc-num" type='text' data-stripe='number' placeholder='credit card number' onChange={this.onCCChange.bind(this)} /><br />
						</div>
						{errors}
						<div>
							<input id="cc-m" className="cc-yymm" type='text' data-stripe='exp-month' placeholder='month' onChange={this.onCCChange.bind(this)} />
							<input id="cc-y" className="cc-yymm" type='text' data-stripe='exp-year' placeholder='year' onChange={this.onCCChange.bind(this)} />
							<input id="cc-c" className="cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' onChange={this.onCCChange.bind(this)} /><br />
						</div>
						<div>
							<input className="" type='submit' disabled={submitDisabled} value='Purchase' />
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(CreditCardForm)
