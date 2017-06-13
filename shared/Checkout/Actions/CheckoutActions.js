import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import {clearCart} from '../../Cart/Actions/CartActions';

export const CHECKOUT_REQUEST_START = 'CHECKOUT_REQUEST_START';
export const CHECKOUT_REQUEST_SUCCESS = 'CHECKOUT_REQUEST_SUCCESS';
export const CHECKOUT_REQUEST_FAILED = 'CHECKOUT_REQUEST_FAILED';

export const CHECKOUT_MAKE_ORDER = 'CHECKOUT_MAKE_ORDER';

const SUCCESS_REDIRECT_DELAY = 1000;

function redirectToThankYouPage() {
    window.location.href = '/thank-you';
}

export function checkout(data) {
    return (dispatch, getState) => {
        dispatch(checkoutRequestStart(data));

        const prod = getState().cart.get('prod');
        const key = (prod) ? 'pk_live_JcvvQ05E9jgvtPjONUQdCqYg' : 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo';

        Stripe.setPublishableKey(key);

        const cardData = {
            number: data.card_number,
            cvc: data.card_cvv,
            exp_month: data.card_month,
            exp_year: data.card_year
        };

        Stripe.createToken(cardData, (status, response) => {

            if (response.error) {
                dispatch(checkoutRequestFailed(response.error.message, data));
            } else {
                if (data['street_2'] == undefined) {
                    data['street_2'] = ""
                }
                const token = response.id;

                checkoutMakeOrder(data, token, prod)
                    .then((successData) => {
                        dispatch(checkoutRequestSuccess(successData, data));
                        setTimeout(() => {
                            dispatch(clearCart());
                            // react-redux-router push doesn't work
                            redirectToThankYouPage();
                        }, SUCCESS_REDIRECT_DELAY);
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

export function checkoutRequestSuccess(message, data) {
    const emailData = {
        msg: `
            Hi ${data.first_name}.
            
            Thank you for order!
        `,
        to: data.email,
        subject: 'Your order is completed!'
    };

    axios.post('/api/v1/mail', emailData)
        .then(() => console.info('Email delivered '))
        .catch((err) => console.error(err))


    return {
        type: CHECKOUT_REQUEST_SUCCESS,
        payload: {
            message
        }
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

export function checkoutMakeOrder(data, token, prod) {
    const dt = (new Date()).toString();
    const customer = {
        first_name: data.first_name,
        last_name: data.last_name,
        street_1: data.street_1,
        street_2: data.street_2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        email: data.email,
        phone: data.phone
    };

    //if (isEmpty(data.street_2)) {
    ///    delete customer.street_2;
    //}

    let order = {
        customer: customer,
        products: data.products,
        total: data.total,
        paymentComplete: false,
        token,
        paymentError: '',
        prod,
        country: data.country,
        dt,
        shipping: data.shipping
    };

    order = adjust_for_dynamodb_bug(order);
    return axios
        .post("https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/order", order)
        .then(function(resp) {
            const result = resp.data;
            let paymentComplete = false;;
            let paymentError = '';
            if (result.msg !== 'ok') {
                paymentComplete = false;
                paymentError = result.msg || result.errorMessage || "";
            } else {
                paymentComplete = true
            }

            if (paymentComplete) {
                return result;
            } else {
                throw new Error(paymentError);
            }
        });
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
