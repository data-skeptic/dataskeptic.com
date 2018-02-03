import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

import AlertsAdd from "./AlertsAdd";
import AlertList from "./AlertsList";

class Alerts extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    	var dispatch = this.props.dispatch
    	//dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
    }

    render() {
    	var otimeseries = this.props.timeseries.toJS()
        return (
        	<div className="time-series-alerts">
        		<AlertsAdd />
                <AlertList />
                <hr />
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(Alerts)

