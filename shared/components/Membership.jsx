import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Loading from '../Common/Components/Loading'
import Error from '../Common/Components/Error'
import LightsOut from './LightsOut'

import {get_products} from '../utils/redux_loader'

import {changePageTitle} from '../Layout/Actions/LayoutActions';

class Membership extends Component {
	constructor(props, context) {
		super(props, context)
		this.addToCart = this.addToCart.bind(this)
	}

	componentWillMount() {
		var oproducts = this.props.products.toJS()
		if (oproducts.products.length == 0) {
			get_products(this.props.dispatch)			
		}

        const {dispatch} = this.props;
        const {title} = Membership.getPageMeta();

        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Membership | Data Skeptic'
        }
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
					<p>If you are already a member, you can log-in <a href="/login">here</a>.</p>
					<p>Your membership supports Data Skeptic's ability to continue delivering quality content on a weekly basis and expand into new mediums.  For $1 per episode, your contributions can help us launch more projects and continuously improve the content of the podcast.</p>
					<p>Sign up now so you don't miss out.  If you'd like, you can play <Link to="/lightsout">lights out</Link> on this site.</p>
					<div>
						<h3>Donations</h3>
						<p>If you prefer to make a one time contribution, you can do so via the Paypal button below.</p>
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
							<input type="hidden" name="cmd" value="_s-xclick" />
							<input type="hidden" name="hosted_button_id" value="3FNHXLXMGRGFY" />
							<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
							<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
						</form>
					</div>
					<h3>Monthly Memberships</h3>
					<div className="row">
						{products.map(function(product) {
							if (product.active == 1 && product.type=="membership" && product.price < 128) {
								const pid = product.id;
								const uid = product.sku.toLowerCase();
								return (
									<div key={pid} className={`col-xs-12 col-sm-4 membership-container membership-${uid}`}>
										<div className="membership-inner">
											<div className="membership-title">{product.title}</div>
											<div className="membership-desc">{product.desc}</div>
											<div className="membership-bottom-container">
												<div className="membership-price">${product.price} <span className="per_month">/ month</span></div>
												<div className="membership-btn">
													<button className="membership-add" onClick={me.addToCart.bind(me, product)}>Add to Cart</button>
													<p>or</p>
													<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
														<input type="hidden" name="cmd" value="_s-xclick" />
														<input type="hidden" name="hosted_button_id" value={product.paypal} />
														<input type="submit" className="membership-add-paypal" value="Subscribe with Paypal" />
														<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
													</form>
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
