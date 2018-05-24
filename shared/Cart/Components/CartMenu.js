import React from 'react'

import NavLink from '../../components/NavLink'
import CartLink from './CartLink'
import AccountDropdownMenu from './AccountDropdownMenu'
import SearchArea from '../../Search/Containers/SearchArea'
import withUser from '../../Layout/hoc/withUser'

export const CartMenu = ({
  pathname,
  cartItemsCount,
  cartClick,
  cartButton = true,
  itemClick,
  mobile,
  loggedIn
}) => (
  <div className="nav">
    {loggedIn ? (
      <AccountDropdownMenu onClick={itemClick} mobile={mobile} />
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

export default withUser(CartMenu)
