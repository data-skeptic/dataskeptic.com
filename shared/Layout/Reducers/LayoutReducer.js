import Immutable, { fromJS } from 'immutable';
import {TOGGLE_MOBILE_MENU} from '../Actions/LayoutActions';

const init = {
    isMobileMenuVisible: false
}

const defaultState = fromJS(init);

export default function LayoutReducer(state = defaultState, action) {
    const {type} = action;

    switch (type) {
        case TOGGLE_MOBILE_MENU:
            const nextVisible = !state.get('isMobileMenuVisible')
            state = state.setIn(['isMobileMenuVisible'], nextVisible)
            return state;
        default:
            return state
    }
}