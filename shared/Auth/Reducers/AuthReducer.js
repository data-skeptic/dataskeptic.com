import Immutable from 'immutable';
import {fromJS} from 'immutable'

const defaultState = {
    loggedIn: false,
    user: {}
}

const initialState  = fromJS(defaultState);

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTH_USER_REQUEST':
            console.dir(`AUTH_USER_REQUEST`)
            return state;

        case 'AUTH_USER_FAIL':
            console.dir(`AUTH_USER_FAIL`)
            return state;

        case 'AUTH_USER_SUCCESS':
            state = state.setIn(['loggedIn'], true)
            state = state.setIn(['user'], fromJS(action.payload.data))
            return state;

        default:
            return state
    }

}

