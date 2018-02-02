import Immutable, {fromJS} from 'immutable';
import axios from "axios"

const defaultState = {
    state: 'un-initialized',
    query_console_state: 'idle',
    query: 'SELECT "lat", time from impression where time > now() -2m',
    query_results: '',
    plot_data: undefined
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
            var dispatch = action.payload.dispatch
            nstate.query_console_state = 'querying'
            nstate.query_results = 'Loading...'
            var q = nstate.query
            // Render results
            var url = "/api/influx?q=" + q
            console.log(url)
            axios.get(url).then(function(resp) {
                var data = resp['data']
                var result = JSON.stringify(data)
                dispatch({type: "TSE_UPDATE_RESULT", payload: {result}})
                dispatch({type: "TSE_UPDATE_PLOT_DATA", payload: {data}})
            }).catch(function(err) {
                var result = JSON.stringify(err)
                dispatch({type: "TSE_UPDATE_RESULT", payload: {result}})
            })
            break;
        case 'TSE_UPDATE_PLOT_DATA':
            nstate.plot_data = action.payload.data
            break
        case 'TSE_UPDATE_RESULT':
            var result = action.payload.result
            nstate.query_results = result
            break;
        case 'TSE_UPDATE_QUERY':
            nstate.query = action.payload.q
            break
        default:
            break;
    }

    return fromJS(nstate);
}