import React from 'react'

export default class Episode extends React.Component {
	render() {
		var onSubmit = this.props.onSubmit
		var paymentError = this.props.paymentError
		var submitDisabled = this.props.submitDisabled
		return (
			<div class="cc-outer">
				<form onSubmit={onSubmit} >
					<div class="payment-error"><p>{ paymentError }</p></div>
					<input class="cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
					<input class="cc-yymm" type='text' data-stripe='exp-month' placeholder='month' />
					<input class="cc-yymm" type='text' data-stripe='exp-year' placeholder='year' />
					<input class="cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' /><br />
					<input class="cc-purchase" disabled={submitDisabled} type='submit' value='Purchase' />
				</form>
			</div>
		)
	}
}