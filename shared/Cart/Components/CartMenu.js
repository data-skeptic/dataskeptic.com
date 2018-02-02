import React from 'react'

import NavLink from '../../components/NavLink'
import CartLink from './CartLink'
import AccountDropdownMenu from "./AccountDropdownMenu";

export const CartMenu = ({pathname, cartItemsCount, cartClick, cartButton = true, itemClick, mobile, loggedIn, user}) => (
    <div className="nav">
        {loggedIn
            ? <AccountDropdownMenu onClick={itemClick} mobile={mobile} user={user}/>
            : <NavLink active={pathname} to="/members" onClick={itemClick}><span className="membership-link">Membership</span></NavLink>
        }

        <NavLink active={pathname} to="/store" onClick={itemClick}>Store</NavLink>

        { cartButton ?
        <CartLink itemCount={cartItemsCount} onClick={cartClick} itemCount={cartItemsCount}/>
        : null }
    </div>
);

export default CartMenu;
