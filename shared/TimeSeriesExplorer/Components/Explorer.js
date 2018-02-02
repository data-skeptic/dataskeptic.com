import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Explorer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(props) {
    	var dispatch = props.dispatch
    	console.log("dispatch")
    	dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
    }

    render() {
    	var otimeseries = this.props.timeseries.toJS()
    	var state = otimeseries.state
        return (
        	<div className="time-series-explorer">
        		Explorer {state}
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(Explorer)

