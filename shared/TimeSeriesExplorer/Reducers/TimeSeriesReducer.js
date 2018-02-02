import Immutable, {fromJS} from 'immutable';

const defaultState = {
    state: 'un-initialized',
};

const initialState = fromJS(defaultState);

export default function TimeSeriesReducer(state=initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case 'INITIALIZE_TIME_SERIES_EXPLORER':
            console.log("here")
            nstate.state = 'initializing';
            break;
        default:
            break;
    }

    return fromJS(nstate);
}