import React from 'react'

import NavLink from './NavLink'

const Menu = props => {
	var pathname = props.location.pathname
	if (pathname == '/index.htm') {
		pathname = '/'
	}
	var item_count = props.item_count
	if (item_count == 0) {
		var cart_link = <NavLink to="/checkout" active={pathname}>
		<div class="menu-cart-container"></div>
		</NavLink>
	} else {
		var cart_link = (
			<div class="menu-cart-wrap">
				<button class="btn-open-cart-drawer" onClick={props.toggleCart}>
					<div class="menu-cart-container">
						<div class="menu-cart-inner">{item_count}</div>
					</div>
				</button>
			</div>
		)
	}
	var onClick = props.onClick
	return (
		<div className="menu col-sm-12">
			<div class="menu-container">
				<div class="menu-container-inner">
					<ul class="topnav">
						<NavLink onClick={onClick} active={pathname} to="/">Home</NavLink>
						<NavLink onClick={onClick} active={pathname} to="/podcast">Podcasts</NavLink>
						<NavLink onClick={onClick} active={pathname} to="/blog">Blog</NavLink>
						<NavLink onClick={onClick} active={pathname} to="/store">Store</NavLink>
						<NavLink onClick={onClick} active={pathname} to="/proj">Projects</NavLink>
						<NavLink onClick={onClick} active={pathname} to="/services">Services</NavLink>
						<NavLink onClick={onClick} active={pathname} to="/members">Membership</NavLink>
						{cart_link}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Menu