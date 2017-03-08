import Immutable, {fromJS} from 'immutable';

import {CHECKOUT_REQUEST_START, CHECKOUT_REQUEST_SUCCESS, CHECKOUT_REQUEST_FAILED} from '../Actions/CheckoutActions';

const defaultState = {
    error: '',
    success: '',
    processing: false
};

const initialState = fromJS(defaultState);

export default function CheckoutReducer(state=initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case CHECKOUT_REQUEST_START:
            nstate.error = '';
            nstate.processing = true;
            break;
        case CHECKOUT_REQUEST_SUCCESS:
            debugger;
            nstate.processing = false;
            break;
        case CHECKOUT_REQUEST_FAILED:
            debugger;
            nstate.error = action.payload.error;
            nstate.processing = true;
            break;

        default:
            break;
    }

    return fromJS(nstate);
}