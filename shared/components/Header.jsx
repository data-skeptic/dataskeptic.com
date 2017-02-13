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
				<div className="container-fluid">
					<div className="col-md-2">
						<Link to="/" id="logo"><img src="/img/svg/logo.svg" alt="Data Skeptic logo" /></Link>
					</div>
					<div className="col-md-offset-2 col-md-4">
						<Menu pathname={pathname} />
					</div>
					<div className="cart-menu pull-right">
						<CartMenu pathname={CartMenu} />
					</div>
				</div>
			</div>
		)
	}
}