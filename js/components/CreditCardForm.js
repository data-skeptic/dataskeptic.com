import React from 'react'

export default class Episode extends React.Component {
	constructor(props) {
		super(props)
	}
	handleClick(event) {
		console.log("Do some validation here")
		this.props.onSubmit(event)
	}
	render() {
		var onSubmit = this.props.onSubmit
		var paymentError = this.props.paymentError
		var submitDisabled = this.props.submitDisabled
		console.log(onSubmit)
		console.log(submitDisabled)
		return (
			<div class="cc-outer">
				<div class="payment-error"><p>{ paymentError }</p></div>
				<input class="cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
				<input class="cc-yymm" type='text' data-stripe='exp-month' placeholder='month' />
				<input class="cc-yymm" type='text' data-stripe='exp-year' placeholder='year' />
				<input class="cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' /><br />
				<button class="cc-purchase" disabled={submitDisabled} onClick={this.handleClick.bind(this)}>Purchase</button>
			</div>
		)
	}
}