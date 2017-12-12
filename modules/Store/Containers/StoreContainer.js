import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts, addToCart, getCartAmount, getCart} from "../../../redux/modules/shopReducer";
import ProductList from '../Components/ProductList'
import CartLit from '../Components/CartList'
import styled from 'styled-components'

@connect(
    state => ({
        products: getProducts(state),
        amount: getCartAmount(state),
        cartList: getCart(state)
    }),
    {addToCart}
)

export default class StoreContainer extends Component {
    addToCart = item => this.props.addToCart(item)

    render() {
        const {products, amount,cartList} = this.props
        return (
            <StoreWrapper>
                <ProductList
                    products={products}
                    addToCart={this.addToCart}
                />
                <CartLit
                    amount={amount}
                    cartList={cartList}
                />

            </StoreWrapper>
        )
    }
}
const StoreWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`