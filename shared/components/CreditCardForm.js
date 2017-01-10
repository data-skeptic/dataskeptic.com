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
		var n = e.target.value
		console.log(n)
		var error_msg = ""
		if (n=="") {
			this.setState({numeric_error: false, error_msg})
		}
		else if (!(!isNaN(parseFloat(n)) && isFinite(n))) {
			error_msg = "Numeric values only please."
			this.setState({numeric_error: true, error_msg})
		} else {
			var x = parseInt(n)
			if (n < 1 || n > 12) {
				error_msg = "<img>"
				this.setState({numeric_error: true, error_msg})
			} else {
				this.setState({numeric_error: false, error_msg})				
			}
		}
	}
	render() {
		console.log("render CreditCardForm")
		var ocart = this.props.cart.toJS()
		var paymentError = ocart.paymentError
		var submitDisabled = ocart.submitDisabled
		var abox = <div></div>
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
		return (
			<div className="cc-container">
				<div className="col-xs-12 shipping-address-title">Credit Cart Info</div>
				{spinner}
				<div className="cc-outer">
					<form onSubmit={this.handleSubmit.bind(this)}>
						{abox}
						<div className="row">
							<input className="col-xs-12 cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
						</div>
						{errors}
						<div className="row">
							<input className="col-xs-4 cc-yymm" type='text' data-stripe='exp-month' placeholder='month' onChange={this.onCCChange.bind(this)} />
							<input className="col-xs-4 cc-yymm" type='text' data-stripe='exp-year' placeholder='year' onChange={this.onCCChange.bind(this)} />
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
