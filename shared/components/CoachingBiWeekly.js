import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class CoachingBiWeekly extends Component {
	addToCart() {
		var product = {
			active: 1,
			desc: "Weekly check-ins for advice, portfolio development, tutoring, and interview prep.",
			id:"coaching-biweekly",
			img:"https://s3.amazonaws.com/data-skeptic-bonus-feed/data-skeptic.jpg",
			price: 275.00,
			sku: "coaching-biweekly",
			title: "Professional development coaching",
			type:"membership"
		}
		var size = ""
		this.props.dispatch({type: "ADD_TO_CART", payload: {product, size} })
		this.props.dispatch({type: "SHOW_CART", payload: true })
	}
	render() {
		var oproducts = this.props.products.toJS()
		return (
			<div className="center">
				<h2>Professional development coaching</h2>
					<div className="coaching-inner">
					<div className="membership-bottom-container">
						<div className="membership-price">$275.00<span className="per_month">/ month</span></div>
						<div className="coaching-desc"><p>We'll coordinate a set time every other week to meet on Skype for a one hour session structured in a way that most benefits your goals and needs.</p></div>
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

export default connect(state => ({ products: state.products }))(CoachingBiWeekly)
