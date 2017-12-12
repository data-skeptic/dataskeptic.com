import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    getProducts,
    addToCart,
    getCartAmount,
    getCart,
    getSubTotal,
    changeQuantity,
    removeItem
} from "../../../redux/modules/shopReducer";
import ProductList from '../Components/ProductList'
import CartLit from '../Components/CartList'
import styled from 'styled-components'

@connect(
    state => ({
        products: getProducts(state),
        amount: getCartAmount(state),
        cartList: getCart(state),
        subTotal: getSubTotal(state)
    }),
    {addToCart,changeQuantity,removeItem}
)

export default class StoreContainer extends Component {
    addToCart = item => this.props.addToCart(item)
    changeQuantity = (id,quantity) => this.props.changeQuantity(id,quantity)
    removeItem = id => this.props.removeItem(id)

    render() {
        const {products, amount, cartList,subTotal} = this.props
        return (
            <StoreWrapper>
                {JSON.stringify(subTotal)}
                <ProductList
                    products={products}
                    addToCart={this.addToCart}
                />
                <CartLit
                    amount={amount}
                    cartList={cartList}
                    changeQuantity={this.changeQuantity}
                    removeItem={this.removeItem}
                />

            </StoreWrapper>
        )
    }
}
const StoreWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`