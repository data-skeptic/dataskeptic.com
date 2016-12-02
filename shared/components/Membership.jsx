import React, { Component, PropTypes } from 'react'
import Loading from './Loading'
import { Link } from 'react-router'
import LightsOut from './LightsOut'
import { connect } from 'react-redux'

class Membership extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			goToCheckout: false
		}
		this.addToCart = this.addToCart.bind(this)
	}

	addToCart(product) {
		this.props.addToCart(product, "")
		this.setState({goToCheckout: true})
	}

	render() {
		console.log("memmmmmmm")
		console.log(this.props)
		console.log(this.context)
		return (
			<div>membership</div>
		)	
	}
}

export default connect(state => ({ episodes: state.episodes }))(Membership)
