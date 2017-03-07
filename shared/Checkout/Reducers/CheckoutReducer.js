import Immutable, {fromJS} from 'immutable';

import {CHECKOUT_REQUEST_START, CHECKOUT_REQUEST_SUCCESS, CHECKOUT_REQUEST_FAILED} from '../Actions/CheckoutActions';

const defaultState = {
    error: 'LOH',
    processing: true
};

const initialState = fromJS(defaultState);

export default function CheckoutReducer(state=initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case CHECKOUT_REQUEST_START:
            nstate.error = '';
            break;
        case CHECKOUT_REQUEST_SUCCESS:
            debugger;
            break;
        case CHECKOUT_REQUEST_FAILED:
            nstate.error = action.payload.error;
            break;

        default:
            break;
    }

    return fromJS(nstate);
}