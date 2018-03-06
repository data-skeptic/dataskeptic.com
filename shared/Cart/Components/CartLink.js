import React, { Component } from 'react'
import { Link } from 'react-router'

export const CartLink = ({ onClick, itemCount }) => (
  <div className="navlink-li-btn-container">
    <a
      className="navlink-btn btn-open-cart-drawer"
      onClick={e => {
        onClick(e)
      }}
    >
      <div className="menu-cart-wrap">
        <div className="menu-cart-container">
          {itemCount ? (
            <div className="menu-cart-inner">{itemCount}</div>
          ) : null}
        </div>
      </div>
    </a>
  </div>
)

export default CartLink
