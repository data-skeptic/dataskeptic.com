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
		var abox = <div></div>
		if (paymentError != "") {
			abox = (
				<div class="row">
					<div class="col-xs-12 payment-error"><p>{ paymentError }</p></div>
				</div>
			)
		}
		return (
			<div class="cc-outer">
				<form onSubmit={this.handleSubmit.bind(this)}>
					{abox}
					<div class="row">
						<input class="col-xs-12 cc-num" type='text' data-stripe='number' placeholder='credit card number' /><br />
					</div>
					<div class="row">
						<input class="col-xs-4 cc-yymm" type='text' data-stripe='exp-month' placeholder='month' />
						<input class="col-xs-4 cc-yymm" type='text' data-stripe='exp-year' placeholder='year' />
						<input class="col-xs-4 cc-cvc" type='text' data-stripe='cvc' placeholder='cvc' /><br />
					</div>
					<div class="row">
						<input class="col-xs-12 cc-purchase" type='submit' disabled={submitDisabled} value='Purchase' />
					</div>
				</form>
			</div>
		)
	}
}