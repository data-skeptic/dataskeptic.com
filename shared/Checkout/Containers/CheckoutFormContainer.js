import React, { Component } from 'react'
import { connect } from 'react-redux'

import CheckoutForm from '../Components/CheckoutForm';

export class CheckoutFormContainer extends Component {

	render() {
		return (
			<div>
				<CheckoutForm></CheckoutForm>
			</div>
		)
	}
}

export default CheckoutFormContainer;