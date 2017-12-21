import React, {Component} from 'react'
import styled from 'styled-components'
import {
    addToCart,
    changeQuantity,
    clearCart,
    getCart,
    removeItem,

    checkoutStart,
    checkoutError,
    checkoutSuccess,

    getCheckoutError,
    getCheckoutProcessing
} from "../../../redux/modules/shopReducer"
import {connect} from "react-redux"
import {Form} from "react-final-form"
import Checkout from '../../Forms/Checkout'
import {redirect} from '../../../util'
import axios from "axios/index";
import Ionicon from 'react-ionicons'

function calculateShipping(items, short) {
    if (items == undefined) {
        return 0
    }
    var has_items = 0
    var big_items = 0
    var is_us = 1
    if (short != "us") {
        is_us = 0
    }
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (item.product.type != "membership") {
            has_items = 1
        }
        if (item.product.type != "membership" && item.product.price > 4) {
            big_items = 1
        }
    }
    var shipping = 0
    if (has_items == 1) {
        if (big_items == 1) {
            if (is_us == 1) {
                shipping = 4
            } else {
                shipping = 6
            }
        } else {
            if (is_us == 1) {
                shipping = 1
            } else {
                shipping = 2
            }
        }
    }
    return shipping
}

function calculateTotal(items, country) {
    var shipping = calculateShipping(items, country)
    var total = shipping
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        total += item.product.price * item.quantity
    }
    return total
}


function adjust_for_dynamodb_bug(obj) {
    // Bug described in: https://forums.aws.amazon.com/thread.jspa?threadID=90137
    var obj2 = JSON.parse(JSON.stringify(obj))
    if (typeof(obj2) == "object") {
        var keys = Object.keys(obj2)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var val = obj2[key]
            if (typeof(val) == "string") {
                if (val == "") {
                    obj2[key] = " "
                }
            }
            else if (typeof(val) == "object") {
                obj2[key] = adjust_for_dynamodb_bug(val)
            }
        }
        return obj2
    } else {
        return obj2
    }
}


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

const isProd = (process.env.NODE_ENV === 'production')
const stripeKey = (isProd) ? 'pk_live_JcvvQ05E9jgvtPjONUQdCqYg' : 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo';

const Processing = () =>
    <ProcessingWrapper>
        <Ionicon icon={'md-refresh'} fontSize={'32px'} rotate={true}/>
        <Text>Processing...</Text>
    </ProcessingWrapper>

@connect(
    state => ({
        cart: getCart(state),
        processing: getCheckoutProcessing(state),
        error: getCheckoutError(state)
    }),
    {
        addToCart, changeQuantity, removeItem, clearCart,
        checkoutStart,
        checkoutError,
        checkoutSuccess,
    }
)
export default class CheckoutForm extends Component {

    isEmpty = () => this.props.cart && this.props.cart.length === 0

    error = (error) => this.props.checkoutError(error)

    createToken = (data) => {
        const cardData = {
            number: data.card,
            cvc: data.cvv,
            exp_month: data.month,
            exp_year: data.year
        };

        this.props.checkoutStart()

        Stripe.createToken(cardData, (status, response) => {
            if (response.error) {
                this.error(response.error.message);
            } else {
                if (!data['street_2']) {
                    data['street_2'] = ""
                }

                const token = response.id;

                this.order(token, data)
            }
        })
    }

    order = (token, data) => {
        const dt = (new Date()).toString();
        const customer = {
            first_name: data.firstName,
            last_name: data.lastName,
            street_1: data.streetAddress,
            street_2: data.apt,
            city: data.city,
            state: data.state,
            zip: data.postal,
            email: data.email,
            phone: data.phone
        }

        let order = {
            customer,
            products: data.products,
            total: data.total,
            paymentComplete: false,
            token,
            paymentError: '',
            prod: isProd,
            country: data.country,
            dt,
            shipping: data.shipping
        }

        order = adjust_for_dynamodb_bug(order);
        axios.post("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/order", order)
            .then((resp) => {
                const result = resp.data;
                let paymentComplete = false;
                ;
                let paymentError = '';
                if (result.msg !== 'ok') {
                    paymentComplete = false;
                    paymentError = result.msg || result.errorMessage || "";
                } else {
                    paymentComplete = true
                }

                if (paymentComplete) {
                    this.complete(result)
                } else {
                    this.error(paymentError);
                }
            });
    }

    checkout = async (data) => {
        const products = this.props.cart.map(({size, quantity, ...rest}) => {
            return {
                product: {
                    ...rest
                },
                size,
                quantity
            }
        })

        const total = calculateTotal(products, data.country)
        const shipping = calculateShipping(products, data.country)

        Stripe.setPublishableKey(stripeKey);
        this.createToken({
            ...data,
            products,
            total,
            shipping
        })
    }

    complete = (res) => {
        window.scrollTo(0, 0)
        redirect(`/checkout/success`)
        this.props.checkoutSuccess()
        this.props.clearCart()
    }

    render() {
        const {error, processing} = this.props

        if (this.isEmpty()) {
            return <div/>
        }

        return (
            <Wrapper>
                <Title>Checkout</Title>

                <Form
                    render={Checkout}
                    validate={validate}
                    onSubmit={this.checkout}
                    subscription={{submitting: true, pristine: true}}
                />

                {processing && <Processing/>}
                {error && <Error>{error}</Error>}
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

const Error = styled.div`
    color: indianred;
    margin: 0 0 10.5px;
`

const ProcessingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Text = styled.p``