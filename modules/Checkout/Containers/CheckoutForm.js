import React, {Component} from 'react'
import styled from 'styled-components'
import {
    addToCart,
    changeQuantity,
    clearCart,
    getCart,
    removeItem,
    checkout
} from "../../../redux/modules/shopReducer"
import {connect} from "react-redux"
import {Form} from "react-final-form"
import Checkout from '../../Forms/Checkout'
import {redirect} from '../../../util'

const validate = (values) => {
    const errors = {}

    if (!values.firstName) {
        errors.firstName = "Please provide your first Name"
    }

    if (!values.lastName) {
        errors.lastName = "Please provide your last Name"
    }

    if (!values.streetAddress) {
        errors.streetAddress = "Please provide shipping street address"
    }

    if (!values.city) {
        errors.city = "Please provide city"
    }

    if (!values.country) {
        errors.country = "Please choose country"
    }

    if (!values.state) {
        errors.state = "Please provide state"
    }

    if (!values.postal) {
        errors.postal = "Please provide postal code"
    }

    if (!values.email) {
        errors.email = "Please provide email address"
    }

    if (!values.phone) {
        errors.phone = "Please provide phone number"
    }

    if (!values.card) {
        errors.card = "Please provide card number"
    }

    if (!values.cardHolder) {
        errors.cardHolder = "Please provide cardholder name"
    }

    if (!values.month) {
        errors.month = "Please provide expiration month"
    }

    if (!values.year) {
        errors.year = "Please provide expiration year"
    }

    if (!values.cvv) {
        errors.cvv = "Please provide Card CVV"
    }

    return errors
}


const formMock = {
    "firstName": "Firts",
    "lastName": "Name",
    "streetAddress": "Addr",
    "apt": "ap",
    "city": "Los",
    "country": "country",
    "state": "state",
    "postal": "postal",
    "email": "gleb@thespoon.co",
    "phone": "phone",
    "card": "424242424",
    "cardHolder": "jonh",
    "month": "12",
    "year": "2020",
    "cvv": "cvv"
}

@connect(
    state => ({
        cart: getCart(state)
    }),
    { addToCart, changeQuantity, removeItem, clearCart, checkout}
)
export default class CheckoutForm extends Component {

    isEmpty = () => this.props.cart && this.props.cart.length === 0

    checkout = async (data) => {
        const checkoutData = {
            ...data
        }

        const {success} = await this.props.checkout(checkoutData)

        if (success) {
            window.scrollTo(0, 0)
            redirect(`/checkout/success`)
        }
    }

    render() {
        const {cart} = this.props

        if (this.isEmpty()) {
            return <div/>
        }

        return (
            <Wrapper>
                <Title>Checkout</Title>

                <Form
                    render={Checkout}
                    validate={validate}
                    initialValues={formMock}
                    onSubmit={this.checkout}
                    subscription={{submitting: true, pristine: true}}
                />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`margin-bottom: -20px;`

const Title = styled.h2`
    font-size: 32px;
    margin: 0px;
    padding: 0px;
`