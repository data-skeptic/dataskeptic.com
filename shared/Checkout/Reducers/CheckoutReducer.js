import Immutable, {fromJS} from 'immutable';

import {CHECKOUT_REQUEST_START, CHECKOUT_REQUEST_SUCCESS, CHECKOUT_REQUEST_FAILED} from '../Actions/CheckoutActions';

const defaultState = {};

const initialState = fromJS(defaultState);

export default function CheckoutReducer(state = initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case CHECKOUT_REQUEST_START:
            break;
        case CHECKOUT_REQUEST_SUCCESS:
            break;
        case CHECKOUT_REQUEST_FAILED:
            break;

        default:
            break;
    }

    return fromJS(nstate);
}