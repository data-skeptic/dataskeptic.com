import {
    fromJS, List, Map
} from 'immutable';

import {
    SET_ADVERTISE_CARD_CONTENT
} from '../Actions/AdvertiseActions';

const defaultState = {
    content: ''
};

const initialState = fromJS(defaultState);

export default function AdvertiseReducer(state = initialState, action) {

    switch (action.type) {
        case SET_ADVERTISE_CARD_CONTENT:
            console.dir('SET_ADVERTISE_CARD_CONTENT')
            state = state.setIn(['content'], action.payload.content);
            return state;

        default:
            return state;
    }

}