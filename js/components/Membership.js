import React from 'react'
import { Redirect } from 'react-router'
import Loading from './Loading'
import { Link } from 'react-router'
import LightsOut from './LightsOut'

import { MemoryRouter, BrowserRouter } from 'react-router';

const navigator = global && global.navigator && global.navigator.userAgent;
const hasWindow = typeof window !== 'undefined';
const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;
const Router = isBrowser ? BrowserRouter : MemoryRouter;

export default class Membership extends React.Component {
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
		var pathname = this.props.location.pathname
		if (!this.props.products_loaded) {
			return <div><Loading /></div>
		} else if (this.state.goToCheckout) {
			console.log("hi")
			return (
				<Redirect to="/checkout" />
			)
		} else {
			var products = this.props.products
			products.sort(function(a, b) {
				return a['price'] - b['price']
			})
			var me = this
			return (
				<div class="center">
					<h2>Data Skeptic Membership</h2>
					<p>Are you a corporation or group?  <a href="#corporate">Check here</a>.</p>
					<p>Your membership supports Data Skeptic's ability to continue delivering quality content on a weekly basis and expand into new mediums.  For $1 per episode, your contributions can help us launch more projects and continuously improve the content of the podcast.</p>
					<p>We have some surprise members only perks planned for 2017.  Sign up now so you don't miss out.  If you'd like, you can play <Link to="/lightsout">lights out</Link> on this site.</p>
					<h3>Monthly Memberships</h3>
					<div class="row">
						{products.map(function(product) {
							if (product.active == 1 && product.type=="membership" && product.price < 128) {
								var pid = product.id
								return (
									<div key={pid} class="col-xs-12 col-sm-4 membership-container">
										<div class="membership-inner">
											<img class="membership-img" src={product.img} />
											<div class="membership-title">{product.title}</div>
											<div class="membership-desc">{product.desc}</div>
											<div class="membership-bottom-container">
												<div class="membership-price">${product.price} <span class="per_month">/ month</span></div>
												<div class="membership-btn">
													<button class="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
												</div>
											</div>
										</div>
									</div>
								)
							}
						})}
					</div>
					<div class="clear"></div>
					<a name="corporate" />
					<h3>Corporate Memberships</h3>
					<p>We reserve the right to gratiously decline sponsors for any reason including but not limited to companies whose products are pornographic, offensive, etc.  More realistically, we may regret to decline sponsors due to existing exclusivity agreements.</p>
					<div class="row">
						{products.map(function(product) {
							if (product.active == 1 && product.type=="membership" && product.price >= 128) {
								var pid = product.id
								return (
									<div key={pid} class="col-xs-12 col-sm-3 membership-container">
										<div class="membership-inner">
											<img class="membership-img" src={product.img} />
											<div class="membership-title">{product.title}</div>
											<div class="membership-desc">{product.desc}</div>
											<div class="membership-bottom-container">
												<div class="membership-price">${product.price} <span class="per_month">/ month</span></div>
												<div class="membership-btn">
													<button class="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
												</div>
											</div>
										</div>
									</div>
								)
							}
						})}
					</div>
					<div class="clear"></div>
				</div>
			)
		}		
	}
}