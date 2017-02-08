import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Coaching extends Component {
	addToCart() {
		var product = {
			active: 1,
			desc: "Weekly check-ins for advice, portfolio development, tutoring, and interview prep.",
			id:"coaching",
			img:"",
			price: 550.00,
			sku: "coaching",
			title: "Professional development coaching",
			type:"membership"
		}
		var size = ""
		this.props.dispatch({type: "ADD_TO_CART", payload: {product, size} })
		this.props.dispatch({type: "SHOW_CART", payload: true })
	}
	render() {
		var oproducts = this.props.products.toJS()
		console.log(oproducts)
		return (
			<div className="center">
				<h2>Professional development coaching</h2>
					<div className="coaching-inner">
					<div className="membership-bottom-container">
						<div className="membership-price">$550.00<span className="per_month">/ month</span></div>
						<div className="membership-btn">
							<button className="membership-add" onClick={this.addToCart.bind(this)}>Add to Cart</button>
						</div>
					</div>
				</div>
				<div><p> &nbsp; </p></div>
				<div><p> &nbsp; </p></div>
				<div><p> &nbsp; </p></div>
			</div>
		)
	}
}

export default connect(state => ({ products: state.products }))(Coaching)
