import Immutable, { fromJS } from 'immutable';
import {TOGGLE_MOBILE_MENU, CHANGE_PAGE_TITLE} from '../Actions/LayoutActions';

const IS_CLIENT = (() => {
    let isDefined = false;
    try {
        (window);
        isDefined = true;
    }
    catch (x) {}
    return isDefined;
})();

const init = {
    isMobileMenuVisible: false,
    title: 'Data Skeptic'
};

const defaultState = fromJS(init);
const setWindowTitle = (title) => {
    if (!IS_CLIENT) return; // not server side rendering

    document.title = title;
};

export default function LayoutReducer(state = defaultState, action) {
    const {type} = action;

    switch (type) {
        case TOGGLE_MOBILE_MENU:
            const nextVisible = !state.get('isMobileMenuVisible');
            state = state.setIn(['isMobileMenuVisible'], nextVisible);
            return state;

        case CHANGE_PAGE_TITLE:
            state = state.set('title', action.payload.title);
            setWindowTitle(action.payload.title);
            return state;

        default:
            return state
    }
}