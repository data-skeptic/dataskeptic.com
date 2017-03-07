export const CHECKOUT_REQUEST_START = 'CHECKOUT_REQUEST_START';
export const CHECKOUT_REQUEST_SUCCESS = 'CHECKOUT_REQUEST_SUCCESS';
export const CHECKOUT_REQUEST_FAILED = 'CHECKOUT_REQUEST_FAILED';

export function checkout(data) {
    return (dispatch) => {

        dispatch(checkoutRequestStart(data));
    }
}

export function checkoutRequestStart(data) {
    return {
        type: CHECKOUT_REQUEST_START,
        data
    }
}

export function checkoutRequestSuccess(message) {
    return {
        type: CHECKOUT_REQUEST_SUCCESS,
        message
    }
}

export function checkoutRequestFailed(error) {
    return {
        type: CHECKOUT_REQUEST_FAILED,
        error
    }
}