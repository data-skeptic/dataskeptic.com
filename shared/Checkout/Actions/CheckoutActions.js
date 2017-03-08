import axios from 'axios';

export const CHECKOUT_REQUEST_START = 'CHECKOUT_REQUEST_START';
export const CHECKOUT_REQUEST_SUCCESS = 'CHECKOUT_REQUEST_SUCCESS';
export const CHECKOUT_REQUEST_FAILED = 'CHECKOUT_REQUEST_FAILED';

export const CHECKOUT_MAKE_ORDER = 'CHECKOUT_MAKE_ORDER';

export function checkout(data) {
    return (dispatch, getState) => {

        dispatch(checkoutRequestStart(data));

        const prod = getState().cart.prod;
        // const key = (prod) ? 'pk_live_JcvvQ05E9jgvtPjONUQdCqYg' : 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo';
        const key = 'pk_test_oYGXSwgw9Jde2TOg7vZtCRGo';

        Stripe.setPublishableKey(key);

        const cardData = {
            number: data.card_number,
            cvc: data.card_cvv,
            exp_month: data.card_month,
            exp_year: data.card_year
        };

        Stripe.createToken(cardData, (status, response) => {
            if (response.error) {
                dispatch(checkoutRequestFailed(response.error.message));
            } else {
                const token = response.id;

                checkoutMakeOrder(data, token, prod)
                    .then((data) => dispatch(checkoutRequestSuccess(data)))
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

export function checkoutRequestSuccess(message) {
    return {
        type: CHECKOUT_REQUEST_SUCCESS,
        payload: {
            message
        }
    }
}

export function checkoutRequestFailed(error) {
    return {
        type: CHECKOUT_REQUEST_FAILED,
        payload: {
            error
        }
    }
}

export function checkoutMakeOrder(data, token, prod) {
    debugger;
    const dt = (new Date()).toString();
    const customer = {
        first_name: data.first_name,
        last_name: data.last_name,
        street_1: data.street_1,
        city: data.city,
        state: data.street_1,
        zip: data.zip,
        email: data.email,
        phone: data.phone,
    };

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
            debugger;
            const result = resp.data;
            let paymentComplete = false;
            let paymentError = '';
            if (result.msg !== 'ok') {
                paymentComplete = false
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
