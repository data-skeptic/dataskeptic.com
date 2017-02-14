import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

import Menu from './Menu'
import CartMenu from './CartMenu'

import CartLink from './CartLink'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {pathname} = this.props

		return (
			<div className='header'>
				<div className="container-fluid hidden-xs desktop">
					<div className="cart-menu pull-right">
						<CartMenu pathname={pathname} />
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
						<button type="button" className="btn-collapse">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="cart pull-right">
						<CartLink itemCount={2}/>
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