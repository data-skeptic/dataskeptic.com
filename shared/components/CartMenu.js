import React from 'react'

import NavLink from './NavLink'
import CartLink from './CartLink'

export const CartMenu = ({pathname, cartItemsCount, cartClick, cartButton = true, itemClick}) => (
    <div className="nav">
        <NavLink active={pathname} to="/members" onClick={itemClick}>Membership</NavLink>
        <NavLink active={pathname} to="/store" onClick={itemClick}>Store</NavLink>
        { cartButton ?
        <CartLink itemCount={cartItemsCount} onClick={cartClick} itemCount={cartItemsCount}/>
        : null }
    </div>
);

export default CartMenu;
