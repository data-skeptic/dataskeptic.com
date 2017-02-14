import React from 'react'

import Menu from '../../components/Menu'
import CartMenu from '../../components/CartMenu'

export const MobileMenu = ({ pathname, visible = false, itemClick }) => {
    const classList = 'mobile-menu ' + (visible ? 'overlay': '');

    return (
        <div className={classList}>
            <div class="first">
                <Menu pathname={pathname} itemClick={itemClick}/>
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
