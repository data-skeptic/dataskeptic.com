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
    resolution: "15m",
    alert_type: undefined,
    escalation_policy: undefined,
    escalation_policies: undefined,
    contact_methods: [
        {type: "email", value: ""},
        {type: "sms", value: ""},
        {type: "voice_call", value: ""}
    ],
    alerts: []
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

function tse_get_tags(payload) {
    var dispatch = payload.dispatch
    var measuremento = payload.measurement
    console.log(measuremento)
    var measurement = measuremento['name']
    console.log(measurement)
    var url = `/api/influx/measurement/${measurement}/tags`
    console.log(url)
    axios.get(url).then(function(resp) {
        var tags = resp['data']
        dispatch({type: "TSE_UPDATE_TAGS", payload: {tags, dispatch}})
    }).catch(function(err) {
        var details = JSON.stringify(err)
        var msg = "Error getting tags"
        dispatch({type: "TSE_ERROR", payload: {msg, details}})
        console.log(details)
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
            var url2 = "/api/influx/escalation_policy/list"
            axios.get(url2).then(function(resp) {
                var escalation_policies = resp['data']
                dispatch({type: "TSE_SET_ESCALATION_POLICIES", payload: {escalation_policies, dispatch}})
            }).catch(function(err) {
                var details = JSON.stringify(err)
                var msg = "Error getting escalation_policies"
                dispatch({type: "TSE_ERROR", payload: {msg, details}})
                console.log(details)
            })
            // TODO: Get Alerts from database
            break;
        case 'TSE_UPDATE_DATABASES':
            var dispatch = action.payload.dispatch
            nstate.databases = action.payload.databases
            nstate.state = 'Loading measurements'
            var url = "/api/influx/measurements/list"
            console.log(url)
            axios.get(url).then(function(resp) {
                console.log('resp')
                console.log(resp)
                var measurements = resp['data']
                console.log(measurements)
                dispatch({type: "TSE_UPDATE_MEASUREMENTS", payload: {measurements, dispatch}})
            })
            break;
        case 'TSE_GET_TAGS':
            console.log('TSE_GET_TAGS')
            var payload = action.payload
            tse_get_tags(payload)
            break
        case 'TSE_UPDATE_TAGS':
            var tags = []
            for (var tag of action.payload.tags) {
                tags.push(tag['tagKey'])
            }
            nstate.tags = tags
            break
        case 'TSE_ERROR':
            nstate.state = action.payload.msg
            break
        case 'TSE_UPDATE_MEASUREMENTS':
            console.log('TSE_UPDATE_MEASUREMENTS')
            var dispatch = action.payload.dispatch
            nstate.measurements = action.payload.measurements
            if (nstate.measurements != undefined && nstate.measurements.length > 0) {
                var measurement = nstate.measurements[0]
                nstate.measurement = measurement
                console.log('TSE_UPDATE_MEASUREMENTS2')
                var payload = {measurement, dispatch}
                tse_get_tags(payload)
                console.log('TSE_UPDATE_MEASUREMENTS3')
            }
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
        case 'TSE_SET_ALERT_TYPE':
            var selectedOption = action.payload.selectedOption
            nstate.alert_type = selectedOption.value
        case 'TSE_SET_ESCALATION_POLICY':
            var id = action.payload.selectedOption
            for (var policy of nstate.escalation_policies) {
                if (policy.id == id) {
                    nstate.escalation_policy = policy                    
                }
            }
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
        case 'TSE_SET_ESCALATION_POLICIES':
            nstate.escalation_policies = action.payload.escalation_policies
            break
        case 'TSE_ADD_ESCALATION_POLICY':
            console.log("TODO: implement persistence of TSE_SET_ESCALATION_POLICIES")
            var cms = nstate.contact_methods
            var escalation_policy = {methods:[]}
            for (var cm of cms) {
                var type = cm.type
                var value = cm.value
                var id = "1001"
                if (value != "") {
                    escalation_policy.methods.push({id, type, value})
                }
            }
            nstate.escalation_policy = escalation_policy
            if (nstate.escalation_policies == undefined) {
                nstate.escalation_policies = []
            }
            nstate.escalation_policies.push(escalation_policy)
            break
        case 'TSE_UPDATE_CONTACT_INFO':
            var payload = action.payload
            var type = payload.type
            var value = payload.value
            var cms = nstate.contact_methods
            var i = 0
            for (var cm of cms) {
                if (cm.type == type) {
                    nstate.contact_methods[i].value = value
                }
                i += 1
            }
            break
        case 'TSE_SAVE_ALERT':
            var dispatch = action.payload.dispatch
            var query = nstate.query
            var database = nstate.database
            var measurement = nstate.measurement
            var field = nstate.field
            var func = nstate.func
            var range = nstate.range
            var resolution = nstate.resolution
            var escalation_policy = nstate.escalation_policy
            var alert = {query, database, measurement, field, func, range, resolution, escalation_policy}
            nstate.alerts.push(alert)
            break
        default:
            break
    }
    return fromJS(nstate);
}