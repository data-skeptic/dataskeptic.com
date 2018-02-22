import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class QueryConsole extends React.Component {
    constructor(props) {
        super(props)
    }

    query() {
        var dispatch = this.props.dispatch
        dispatch({type: "TSE_QUERY", payload: {dispatch}})
    }

    handleChange(event) {
        var q = event.target.value
        var dispatch = this.props.dispatch
        dispatch({type: "TSE_UPDATE_QUERY", payload: {q}})
    }

    componentWillMount() {
    	var dispatch = this.props.dispatch
    	//dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            console.log('enter press here! ')
            console.log(event.key)
        }
    }

    render() {
    	var otimeseries = this.props.timeseries.toJS()
        var query = otimeseries['query']
        var query_results = otimeseries['query_results']
        console.log(query_results)
        return (
        	<div className="time-series-alerts-query-console">
                <textarea className="query-console-input" onChange={this.handleChange.bind(this)} value={query} onKeyPress={this.handleKeyPress} />
                <button onClick={this.query.bind(this)} className="query-console-btn">Query</button>
                <h4>Output</h4>
                <textarea className="query-console-output" value={query_results} disabled />                
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(QueryConsole)

