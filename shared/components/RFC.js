import React from 'react'
import { connect } from 'react-redux'


class Cart extends React.Component {
	render() {
		return (
			<div>RFC</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(Cart)
