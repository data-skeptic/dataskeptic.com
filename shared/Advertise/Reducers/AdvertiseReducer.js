import {
    fromJS, List, Map
} from 'immutable';

import {
    SET_ADVERTISE_CARD_CONTENT,
    SET_ADVERTISE_BANNER_CONTENT
} from '../Actions/AdvertiseActions';

const defaultState = {
    card: '',
    banner: '',
};

const initialState = fromJS(defaultState);

export default function AdvertiseReducer(state = initialState, action) {

    switch (action.type) {
        case SET_ADVERTISE_CARD_CONTENT:
            console.dir('SET_ADVERTISE_CARD_CONTENT')
            state = state.setIn(['card'], action.payload.content);
            return state;

        case SET_ADVERTISE_BANNER_CONTENT:
            state = state.setIn(['banner'], action.payload.content);
            return state;

        default:
            return state;
    }

}