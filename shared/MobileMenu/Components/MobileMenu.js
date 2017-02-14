import React from 'react'

import Menu from '../../components/Menu'
import NavLink from '../../components/NavLink'
import CartMenu from '../../components/CartMenu'

export const MobileMenu = ({ pathname, visible = false, itemClick }) => {
    const classList = 'mobile-menu ' + (visible ? 'overlay': '');

    return (
        <div className={classList}>
            <div class="first">
                <Menu pathname={pathname} itemClick={itemClick}>
                    <NavLink active={pathname} to="/" onClick={itemClick}>Home</NavLink>
                </Menu>
            </div>
            <div class="second">
                <CartMenu pathname={pathname}
                          itemClick={itemClick}
                          cartButton={false}
                />
            </div>
        </div>
    )
};

export default MobileMenu
