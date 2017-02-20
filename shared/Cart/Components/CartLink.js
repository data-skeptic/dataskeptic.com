import React, { Component } from 'react'
import { Link } from 'react-router'

export const CartLink = ({onClick, itemCount}) => (
    <div className="navlink-li-container">
        <a className="btn-open-cart-drawer" onClick={ (e) => { onClick(e) } }>
            <div className="menu-cart-wrap">
                <div className="menu-cart-container">
                    { itemCount ? <div className="menu-cart-inner">{itemCount}</div> : null }
                </div>
            </div>
        </a>
    </div>
);

CartLink.propTypes = {
    onClick: React.PropTypes.func,
    itemCount: React.PropTypes.number
};

export default CartLink;