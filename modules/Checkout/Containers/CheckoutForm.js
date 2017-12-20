import React, {Component} from 'react'
import styled from 'styled-components'
import {
    addToCart,
    changeQuantity,
    clearCart,
    getCart,
    removeItem
} from "../../../redux/modules/shopReducer"
import {connect} from "react-redux"
import { Form } from "react-final-form"
import Checkout from "../../Forms/Checkout"

@connect(
    state => ({
        cart: getCart(state)
    }),
    {addToCart,changeQuantity,removeItem,clearCart}
)
export default class CheckoutForm extends Component {

    isEmpty = () => this.props.cart && this.props.cart.length === 0

    render() {
        const { cart } = this.props

        if (this.isEmpty()) {
            return <div/>
        }

        return (
            <Wrapper>
                <Form
                    onSubmit={(data) => alert(data)}
                    render={Checkout}
                    subscription={{submitting: true, pristine: true}}
                />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div``