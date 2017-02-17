import React from 'react'
import {connect} from 'react-redux'

import { Link } from 'react-router'

import CartQuantity from '../Components/CartQuantity'
import CountrySelector from '../../components/CountrySelector'
import EmptyCart from '../Components/EmptyCart'
import CartItem from '../Components/CartItem'

class CartContainer extends React.Component {

    renderCartItems(items = []) {
        items = items.concat(items)
        items = items.concat(items)

        return items.map((item, index) => {
            const subtotal = (item.product.price * item.quantity)
            let title = item.product.title
            let key = "key_" + item.product.id
            if (item.size != "") {
                title += " (" + item.size + ")"
                key += "_" + item.size
            }

            key = index
            return (
                <CartItem key={key}
                          title={title}
                          product={item.product}
                          subtype={item.size}
                          quantity={item.quantity}
                          size={item.size}
                          subtotal={subtotal.toFixed(2)}
                />
            )
        })
    }

    render() {
        var ocart = this.props.cart.toJS()
        var cart_items = ocart.cart_items || []
        var shipping = ocart.shipping
        var total = ocart.total

        const { onCheckoutClick, needCheckout } = this.props

        const subtotal = 0.00
        if (cart_items.length == 0) {
            return <EmptyCart />
        } else {
            const items = this.renderCartItems(cart_items);
            return (
                <div>
                    <h2>Cart</h2>
                    <div className="cart-rows">
                        <div className="cart-inner">
                            <div className="cart-items">
                                <div className="cart-items-list">{items}</div>
                            </div>
                        </div>
                    </div>
                    <div className="cart-end">
                        <div className="cart-value subtotal">
                            <div className="price"><span>${subtotal.toFixed(2)}</span></div>
                            <div className="attribute"><span>Subtotal</span></div>
                        </div>
                        <div className="cart-value shipping">
                            <div className="price"><span>${shipping.toFixed(2)}</span></div>
                            <div className="attribute"><span>Shipping</span></div>
                        </div>
                        <div className="cart-value title">
                            <div className="price"><span className="usd">usd</span><span>${total.toFixed(2)}</span></div>
                            <div className="attribute"><span>Total</span></div>
                        </div>

                        {needCheckout ?
                            <Link className="btn-checkout" to="/checkout" onClick={onCheckoutClick}>Continue To Checkout</Link>
                            : null
                        }

                    </div>
                </div>
            )
        }
    }
}

// <CountrySelector />

export default connect(
    (state, ownProps) => ({
        cart: state.cart,
        onCheckoutClick: ownProps.onCheckoutClick,
        needCheckout: ownProps.needCheckout
    })
)(CartContainer)
