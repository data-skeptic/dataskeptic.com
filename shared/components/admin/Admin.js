import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Admin extends Component {
	render() {
		return (
			<div className="center">
				<h2>Admin</h2>
				<h3>Order processing</h3>
				<h4>Mark Fulfilled in Stripe</h4>
				<h4>Fulfill Order</h4>
				<h4>Send Confirmation Email</h4>
				<h4>Send Shipped Email</h4>
				<div className="clear" />
			</div>
		)
	}
}

export default connect(state => ({ products: state.products }))(Admin)

