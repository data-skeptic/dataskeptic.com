import React from 'react'
import {connect} from 'react-redux'

import NavLink from './NavLink'
import CartLink from './CartLink'

class CartMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onCartClick = this.onCartClick.bind(this);
    }

    onCartClick() {
        this.props.dispatch({type: "TOGGLE_CART", payload: {}})
    }

    getCartItemsCount() {
        const items = this.props.cart.toJS().cart_items;
        return items.reduce((mem, item) => {
            mem += item.quantity
        }, 0);
    }

    render() {
        const {pathname} = this.props;
        const cartItemsCount = this.getCartItemsCount();

        return (
            <div className="nav">
                <NavLink active={pathname} to="/members">Membership</NavLink>
                <NavLink active={pathname} to="/store">Store</NavLink>
                <CartLink itemCount={cartItemsCount} onClick={this.onCartClick}/>
            </div>
        )
    }
}

export default connect(state => ({cart: state.cart}))(CartMenu)
