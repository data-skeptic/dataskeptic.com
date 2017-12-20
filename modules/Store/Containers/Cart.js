import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    getProducts,
    addToCart,
    getCartAmount,
    getCart,
    getSubTotal,
    changeQuantity,
    removeItem,
    clearCart
} from "../../../redux/modules/shopReducer";
import ProductList from '../Components/ProductList'
import CartList from '../Components/CartList'
import styled from 'styled-components'

@connect(
    state => ({
        products: getProducts(state),
        amount: getCartAmount(state),
        cartList: getCart(state),
        subTotal: getSubTotal(state)
    }),
    {addToCart,changeQuantity,removeItem,clearCart}
)
export default class Cart extends Component {

    addToCart = item => this.props.addToCart(item)

    changeQuantity = (id,quantity) => this.props.changeQuantity(id,quantity)

    removeItem = id => this.props.removeItem(id)

    clearCart = () => this.props.clearCart()

    render() {
        const {checkoutButton, amount, cartList} = this.props

        return (
            <CartList
                amount={amount}
                cartList={cartList}
                changeQuantity={this.changeQuantity}
                removeItem={this.removeItem}
                clearCart={this.clearCart}
                checkoutButton={checkoutButton}
            />
        )
    }
}

const CartArea = styled.div`
  
`