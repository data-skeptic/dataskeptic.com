import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

import Menu from './Menu'
import CartMenu from './CartMenu'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		// var pathname = this.props.location.pathname

		const {pathname} = this.props
		return (
			<div className='header row'>
				<div className="container-fluid hidden-xs desktop">
					<div className="cart-menu pull-right">
						<CartMenu pathname={CartMenu} />
					</div>
					<div className="logo pull-left">
						<Link to="/" id="logo"><img src="/img/svg/logo.svg" alt="Data Skeptic logo" /></Link>
					</div>
					<div className="mainnav">
						<Menu pathname={pathname} />
					</div>
				</div>
				<div className="container-fluid visible-xs mobile">
					mobile header
				</div>
			</div>
		)
	}
}