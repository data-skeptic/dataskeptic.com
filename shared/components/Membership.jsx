import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Loading from './Loading'
import Error from './Error'
import LightsOut from './LightsOut'

class Membership extends Component {
	constructor(props, context) {
		super(props, context)
		this.addToCart = this.addToCart.bind(this)
	}

	addToCart(product) {
		console.log("addToCart")
		console.log(product)
		var size = ""
		this.props.dispatch({type: "ADD_TO_CART", payload: {product, size} })
		this.props.dispatch({type: "SHOW_CART", payload: true })
	}

	render() {
		var ocart = this.props.cart.toJS()
		var oproducts = this.props.products.toJS()
		var products = oproducts.products
		var products_loaded = oproducts.products_loaded
		if (products_loaded == 0) {
			return <div><Loading /></div>
		} else if (products_loaded == -1) {
			return <div><Error /></div>
		} else {
			products = oproducts.products
			products.sort(function(a, b) {
				return a['price'] - b['price']
			})
			var me = this
			return (
				<div className="center">
					<h2>Data Skeptic Membership</h2>
					<p>Are you a corporation or group?  <a href="#corporate">Check here</a>.</p>
					<p>Your membership supports Data Skeptic's ability to continue delivering quality content on a weekly basis and expand into new mediums.  For $1 per episode, your contributions can help us launch more projects and continuously improve the content of the podcast.</p>
					<p>We have some surprise members only perks planned for 2017.  Sign up now so you don't miss out.  If you'd like, you can play <Link to="/lightsout">lights out</Link> on this site.</p>
					<h3>Monthly Memberships</h3>
					<div className="row">
						{products.map(function(product) {
							if (product.active == 1 && product.type=="membership" && product.price < 128) {
								var pid = product.id
								return (
									<div key={pid} className="col-xs-12 col-sm-4 membership-container">
										<div className="membership-inner">
											<img className="membership-img" src={product.img} />
											<div className="membership-title">{product.title}</div>
											<div className="membership-desc">{product.desc}</div>
											<div className="membership-bottom-container">
												<div className="membership-price">${product.price} <span className="per_month">/ month</span></div>
												<div className="membership-btn">
													<button className="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
												</div>
											</div>
										</div>
									</div>
								)
							}
						})}
					</div>
					<div className="clear"></div>
					<a name="corporate" />
					<h3>Corporate Memberships</h3>
					<p>We reserve the right to gratiously decline sponsors for any reason including but not limited to companies whose products are pornographic, offensive, etc.  More realistically, we may regret to decline sponsors due to existing exclusivity agreements.</p>
					<div className="row">
						{products.map(function(product) {
							if (product.active == 1 && product.type=="membership" && product.price >= 128) {
								var pid = product.id
								return (
									<div key={pid} className="col-xs-12 col-sm-4 membership-container">
										<div className="membership-inner">
											<img className="membership-img" src={product.img} />
											<div className="membership-title">{product.title}</div>
											<div className="membership-desc">{product.desc}</div>
											<div className="membership-bottom-container">
												<div className="membership-price">${product.price} <span className="per_month">/ month</span></div>
												<div className="membership-btn">
													<button className="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
												</div>
											</div>
										</div>
									</div>
								)
							}
						})}
					</div>
					<div className="clear"></div>
				</div>
			)			
		}

	}
}

export default connect(state => ({ products: state.products, cart: state.cart }))(Membership)
