import React from 'react'

import NavLink from '../../components/NavLink'
import CartLink from './CartLink'
import AccountDropdownMenu from './AccountDropdownMenu'
import SearchArea from '../../Search/Containers/SearchArea'

export const CartMenu = ({
  pathname,
  cartItemsCount,
  cartClick,
  cartButton = true,
  itemClick,
  mobile,
  loggedIn,
  user
}) => (
  <div className="nav">
    {loggedIn ? (
      <AccountDropdownMenu onClick={itemClick} mobile={mobile} user={user} />
    ) : (
      <NavLink active={pathname} to="/members" onClick={itemClick}>
        <span className="membership-link">Membership</span>
      </NavLink>
    )}

    <NavLink active={pathname} to="/store" onClick={itemClick}>
      Store
    </NavLink>

    {!mobile && <SearchArea />}

    {cartButton && <CartLink itemCount={cartItemsCount} onClick={cartClick} />}
  </div>
)

export default CartMenu
