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
		var cart_link = <NavLink to="/checkout" active={pathname}>
		<div class="menu-cart-container"><div class="menu-cart-inner">{item_count}</div></div>
		</NavLink>
	}
	return (
		<div className="menu col-sm-12">
			<ul class="topnav">
				<NavLink active={pathname} to="/">Home</NavLink>
				<NavLink active={pathname} to="/podcast">Podcast</NavLink>
				<NavLink active={pathname} to="/blog">Blog</NavLink>
				<NavLink active={pathname} to="/video">Videos</NavLink>
				<NavLink active={pathname} to="/store">Store</NavLink>
				<NavLink active={pathname} to="/proj">Projects</NavLink>
				<NavLink active={pathname} to="/services">Services</NavLink>
				<NavLink active={pathname} to="/members">Membership</NavLink>
				{cart_link}
			</ul>
		</div>
	)
}

export default Menu