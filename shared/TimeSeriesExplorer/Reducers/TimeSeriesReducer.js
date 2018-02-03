import Immutable, {fromJS} from 'immutable';
import axios from "axios"

const defaultState = {
    state: 'un-initialized',
    query_console_state: 'idle',
    query: 'SELECT COUNT(lat) as val FROM impression where time > now() -2h GROUP BY time(1m)',
    query_results: '',
    plot_data: undefined,
    databases: [],
    measurements: [],
    tags: [],
    fields: [],
    function: [],
    resolution: [],
    range: [],
    database: "defaultdb",
    measurement: "impression",
    field: "lat",
    func: "COUNT",
    range: "-1d",
    resolution: "15m"
};

const initialState = fromJS(defaultState);

function dbquery(dispatch, nstate) {
    nstate.query_console_state = 'querying'
    nstate.query_results = 'Loading...'
    var q = nstate.query
    // Render results
    var url = "/api/influx/query?q=" + q
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
}

export default function TimeSeriesReducer(state=initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case 'INITIALIZE_TIME_SERIES_EXPLORER':
            var dispatch = action.payload.dispatch
            // Get indexes, tags, fields, function, resolution
            nstate.state = 'Loading databases'
            var url = "/api/influx/databases/list"
            axios.get(url).then(function(resp) {
                var databases = resp['data']
                dispatch({type: "TSE_UPDATE_DATABASES", payload: {databases, dispatch}})
            }).catch(function(err) {
                var details = JSON.stringify(err)
                var msg = "Error getting databases"
                dispatch({type: "TSE_ERROR", payload: {msg, details}})
                console.log(details)
            })
            break;
        case 'TSE_UPDATE_DATABASES':
            var dispatch = action.payload.dispatch
            nstate.databases = action.payload.databases
            nstate.state = 'Loading measurements'
            var url = "/api/influx/measurements/list"
            console.log(url)
            axios.get(url).then(function(resp) {
                var measurements = resp['data']
                dispatch({type: "TSE_UPDATE_MEASUREMENTS", payload: {measurements, dispatch}})
            }).catch(function(err) {
                var details = JSON.stringify(err)
                var msg = "Error getting databases"
                dispatch({type: "TSE_ERROR", payload: {msg, details}})
                console.log(details)
            })
            break;
        case 'TSE_ERROR':
            nstate.state = action.payload.msg
            break
        case 'TSE_UPDATE_MEASUREMENTS':
            var dispatch = action.payload.dispatch
            nstate.measurements = action.payload.measurements
            nstate.state = 'Loading done'
            break;
        case 'TSE_QUERY':
            var dispatch = action.payload.dispatch
            dbquery(dispatch, nstate)
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
        case 'TSE_SET_FUNC':
            var selectedOption = action.payload.selectedOption
            nstate.func = selectedOption.value
            break
        case 'TSE_SET_RESOLUTION':
            var selectedOption = action.payload.selectedOption
            nstate.resolution = selectedOption.value
            break
        case 'TSE_SET_RANGE':
            var selectedOption = action.payload.selectedOption
            nstate.range = selectedOption.value
            break
        case 'TSE_SEARCH':
            var dispatch = action.payload.dispatch
            // nstate.database?
            var func = nstate.func
            var field = nstate.field
            var measurement = nstate.measurement
            var range = nstate.range
            var resolution = nstate.resolution
            var query = `
                SELECT ${func}(${field}) as val 
                FROM ${measurement} 
                where time > now() ${range} 
                GROUP BY time(${resolution})
                `
            console.log(query)
            nstate.query = query
            dbquery(dispatch, nstate)
            break
        default:
            break
    }
    return fromJS(nstate);
}