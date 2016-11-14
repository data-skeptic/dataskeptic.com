import React from 'react'

export default class Episode extends React.Component {
	constructor(props) {
		super(props)
	}
	handleSubmit(event) {
		event.preventDefault()
		event.stopPropagation()
		console.log("Do some validation here!!")
		this.props.onSubmit(event)
	}
	render() {
		var paymentError = this.props.paymentError
		var submitDisabled = this.props.submitDisabled
		return (
			<div class="cc-outer">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div class="payment-error"><p>{ paymentError }</p></div>
					<input class="cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
					<input class="cc-yymm" type='text' data-stripe='exp-month' placeholder='month' />
					<input class="cc-yymm" type='text' data-stripe='exp-year' placeholder='year' />
					<input class="cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' /><br />
					<input class="cc-purchase" type='submit' disabled={submitDisabled} value='Purchase' />
				</form>
			</div>
		)
	}
}