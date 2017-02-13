import React, { Component } from 'react'
import { Link } from 'react-router'

export const CartLink = ({onClick, item_count = 2}) => (
    <div className="navlink-li-container">
        <a className="btn-open-cart-drawer" onClick={onClick}>
            <div className="menu-cart-wrap">
                <div className="menu-cart-container">
                    <div className="menu-cart-inner">{item_count}</div>
                </div>
            </div>
        </a>
    </div>
);

// class CartLink extends Component {
//
//
//     render() {
//
//         var ocart = this.props.cart.toJS()
//         if (pathname == '/index.htm') {
//             pathname = '/'
//         }
//         var item_count = 0
//         var cart_items = ocart.cart_items
//         for (var i=0; i < cart_items.length; i++) {
//             var item = cart_items[i]
//             item_count += item.quantity
//         }
//         if (item_count == 0) {
//             var cart_link = <NavLink to="/checkout" active={pathname}>
//                 <div className="menu-cart-container"></div>
//             </NavLink>
//         } else {
//             var cart_link = (
//
//             )
//         }
//
//         var onClick = this.props.onClick
//         var to = this.props.to
//         var active = this.props.active
//         var isActive = active == to
//         var className = isActive ? "menu-active" : "menu-inactive";
//         return (
//             <div className="navlink-li-container">
//                 <Link to={to} onClick={onClick} className={className}>{this.props.children}</Link>
//             </div>
//         );
//     }
// }

CartLink.contextTypes = {
    router: React.PropTypes.object
};

export default CartLink;