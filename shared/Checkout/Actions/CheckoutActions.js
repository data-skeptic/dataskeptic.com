import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import {clearCart} from '../../Cart/Actions/CartActions';

export const CHECKOUT_REQUEST_START = 'CHECKOUT_REQUEST_START';
export const CHECKOUT_REQUEST_SUCCESS = 'CHECKOUT_REQUEST_SUCCESS';
export const CHECKOUT_REQUEST_FAILED = 'CHECKOUT_REQUEST_FAILED';

export const RECEIPT_REQUEST_START = 'RECEIPT_REQUEST_START';
export const RECEIPT_REQUEST_SUCCESS = 'RECEIPT_REQUEST_SUCCESS';
export const RECEIPT_REQUEST_FAILED = 'RECEIPT_REQUEST_FAILED';

export const CHECKOUT_MAKE_ORDER = 'CHECKOUT_MAKE_ORDER';

const SUCCESS_REDIRECT_DELAY = 1000;

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../../config/config.json')
var base_url = c[env] + env

export function checkout(data, redirect) {
    return (dispatch, getState) => {
        dispatch(checkoutRequestStart(data));

        const prod = getState().cart.get('prod');
        const stripe_publishable = 'pk_live_JcvvQ05E9jgvtPjONUQdCqYg'
        const key = (prod) ? stripe_publishable : 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo'

        Stripe.setPublishableKey(key);

        const cardData = {
            number: data.card_number,
            cvc: data.card_cvv,
            exp_month: data.card_month,
            exp_year: data.card_year
        };

        Stripe.createToken(cardData, (status, response) => {

            if (response.error) {
                console.log("ERRRO!")
                console.log(response.error)
                dispatch(checkoutRequestFailed(response.error.message, data));
            } else {
                if (data['street_2'] == undefined) {
                    data['street_2'] = ""
                }
                const token = response.id;
                console.log("checkoutMakeOrder")
                console.log(data)
                console.log(prod)
                checkoutMakeOrder(data, token, prod)
                    .then((successData) => {
                        console.log("success")
                        console.log(successData)
                        if (successData.status == "ok") {
                            dispatch(checkoutRequestSuccess(successData, data, redirect))
                        } else {
                            dispatch(checkoutRequestFailed(successData.msg))
                        }
                    })
                    .catch(({message}) => dispatch(checkoutRequestFailed(message)));
            }
        })
    }
}

export function checkoutRequestStart(data) {
    return {
        type: CHECKOUT_REQUEST_START,
        payload: {
            data
        }
    }
}

export function checkoutRequestSuccess(message, data, redirectClb) {
    const emailData = {
        ...data,
        type: 'checkout',
        to: data.email,
        subject: 'Your dataskeptic.com order confirmation'
    };
    //
    // axios.post('/api/v1/mail', emailData)
    //     .then(() => console.info('Email delivered '))
    //     .catch((err) => console.error(err))

    return (dispatch) => {
        // dispatch(clearCart());
        dispatch({
          type: CHECKOUT_REQUEST_SUCCESS,
          payload: {
            message,
            data
          }
        })

        setTimeout(() => {
	        redirectClb(data)
        }, SUCCESS_REDIRECT_DELAY);
        dispatch()
    }
}

export function checkoutRequestFailed(error, data) {
    const emailData = {
        msg: `
            Error message: ${error},
            User details:
            ${JSON.stringify(data)}    
        `,
        to: 'kyle@dataskeptic.com',
        subject: 'Error in Order Processing'
    };

    axios.post('/api/v1/mail', emailData)
        .then(() => console.info('Email delivered '))
        .catch((err) => console.error(err))

    return {
        type: CHECKOUT_REQUEST_FAILED,
        payload: {
            error: `Cannot process your transaction: '${error}'`
        }
    }
}

export function loadReceipt(id) {
	return (dispatch) => {
        dispatch(loadReceiptStart())

        axios.get(`/api/v1/orders${id}`)
          .then((resp) => dispatch(loadReceiptSuccess(resp.data)))
          .catch((err) => dispatch(loadReceiptFailed(err)))
	}
}


export function loadReceiptStart() {
	return {
		type: RECEIPT_REQUEST_START,
	}
}

export function loadReceiptSuccess(data) {
	return {
		type: RECEIPT_REQUEST_SUCCESS,
		payload: {
			data
		}
	}
}

export function loadReceiptFailed(error) {
	return {
		type: RECEIPT_REQUEST_FAILED,
		payload: {
			error
		}
	}
}

export function checkoutMakeOrder(data, token, prod) {
    console.log('checkoutMakeOrder----')
    var email = data.email
    var shipping = data.shipping
    const customer = {
        first_name: data.first_name,
        last_name: data.last_name,
        street_1: data.street_1,
        street_2: data.street_2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        email,
        phone: data.phone
    };

    var products = data.products.toJS()
    for (var product of products) {
        if (product.size) {
            product.product.sku = product.product.sku + '_' + product.size
        }
    }

    var total = data.total
    let order = {
        customer,
        products,
        total,
        token,
        country: data.country,
        shipping
    };
    console.log(JSON.stringify(order))
    console.log("CheckoutActions starting with stripe")
    var url0 = '/api/order/add'
    return axios
        .post(url0, order)
        .then(function(resp) {
            console.log('resp')
            var d = resp.data
            console.log(d)
            return d
        })
}


function adjust_for_dynamodb_bug(obj) {
    // Bug described in: https://forums.aws.amazon.com/thread.jspa?threadID=90137
    var obj2 = JSON.parse(JSON.stringify(obj))
    if (typeof(obj2)=="object") {
        var keys = Object.keys(obj2)
        for (var i=0; i < keys.length; i++) {
            var key = keys[i]
            var val = obj2[key]
            if (typeof(val)=="string") {
                if (val=="") {
                    obj2[key] = " "
                }
            }
            else if (typeof(val)=="object") {
                obj2[key] = adjust_for_dynamodb_bug(val)
            }
        }
        return obj2
    } else {
        return obj2
    }
}
