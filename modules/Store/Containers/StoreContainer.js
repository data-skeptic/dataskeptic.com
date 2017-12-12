import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProducts, addToCart} from "../../../redux/modules/shopReducer";
import ProductList from '../Components/ProductList'
import styled from 'styled-components'

@connect(
    state => ({
        products: getProducts(state)
    }),
    {addToCart}
)

export default class StoreContainer extends Component {
    addToCart = item => this.props.addToCart(item)

    render() {
        const {products} = this.props
        return (
            <StoreWrapper>
                <ProductList
                    products={products}
                    addToCart={this.addToCart}
                />
            </StoreWrapper>
        )
    }
}
const StoreWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`