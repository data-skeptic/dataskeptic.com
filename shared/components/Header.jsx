import React from "react"
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router'

import { toggleMobileMenu } from '../Layout/Actions/LayoutActions';

import Menu from './Menu'
import CartMenu from './CartMenu'

import CartLink from './CartLink'
import { getItemsCount as getCartItemsCount } from '../Cart/Helpers';

class Header extends React.Component {
	constructor(props) {
		super(props)

		this.onCartClick = this.onCartClick.bind(this)
		this.onToggleMenuClick = this.onToggleMenuClick.bind(this)
	}

	/**
	 * Handler for cart button click
	 *
	 */
	onCartClick() {
		this.props.dispatch({type: "TOGGLE_CART", payload: {}})
	}

	/**
	 * Handler for toggle main site menu visibility button click
	 * 
	 */
	onToggleMenuClick() {
		this.props.toggleMobileMenu()
	}

	render() {
		const {pathname, isMobileMenuVisible, cart} = this.props
		const itemsCount = getCartItemsCount(cart.toJS().cart_items);

		return (
			<div className='header'>
				<div className="container-fluid hidden-xs desktop">
					<div className="cart-menu pull-right">
						<CartMenu pathname={pathname}
								  cartItemsCount={itemsCount}
								  cartClick={this.onCartClick}
						/>
					</div>
					<div className="logo pull-left">
						<Link to="/" id="logo_desktop"><img src="/img/svg/logo.svg" alt="Data Skeptic logo" /></Link>
					</div>
					<div className="mainnav">
						<Menu pathname={pathname} />
					</div>
				</div>
				<div className="visible-xs mobile">
					<div className="menu-collapse pull-left">
						<button type="button" className="btn-collapse" onClick={this.onToggleMenuClick}>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="cart pull-right">
						<CartLink itemCount={itemsCount} onClick={this.onCartClick} />
					</div>
					<div className="logo">
						<Link to="/" id="logo_mobile">
							<img src="/img/svg/logo-min.svg" alt="Data Skeptic logo" />
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		isMobileMenuVisible: state.layout.getIn(['isMobileMenuVisible']),
		cart: state.cart
	}),
	dispatch => bindActionCreators({
		toggleMobileMenu
	}, dispatch)
)(Header)