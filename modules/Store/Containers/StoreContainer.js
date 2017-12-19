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

export default class StoreContainer extends Component {
    addToCart = item => this.props.addToCart(item)
    changeQuantity = (id,quantity) => this.props.changeQuantity(id,quantity)
    removeItem = id => this.props.removeItem(id)
    clearCart = () => this.props.clearCart()

    render() {
        const {products, amount, cartList,subTotal} = this.props
        return (
            <StoreWrapper>
                <ProductList
                    products={products}
                    addToCart={this.addToCart}
                />

                <CartList
                    amount={amount}
                    cartList={cartList}
                    changeQuantity={this.changeQuantity}
                    removeItem={this.removeItem}
                    clearCart={this.clearCart}
                />
            </StoreWrapper>
        )
    }
}
const StoreWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`