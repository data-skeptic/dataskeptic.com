import Immutable, {fromJS} from 'immutable';

const defaultState = {
    state: 'un-initialized',
    query_console_state: 'idle'
};

const initialState = fromJS(defaultState);

export default function TimeSeriesReducer(state=initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case 'INITIALIZE_TIME_SERIES_EXPLORER':
            // Get indexes, tags, fields, function, resolution
            nstate.state = 'initializing';
            break;
        case 'TSE_QUERY':
            nstate.query_console_state = 'querying'
            var q = action.payload.q
            alert(q)
            // Call influxdb
            // Render results
            break;
        default:
            break;
    }

    return fromJS(nstate);
}