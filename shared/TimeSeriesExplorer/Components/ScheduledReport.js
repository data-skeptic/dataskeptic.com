import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Alerts from "./Alerts";

class ScheduledReport extends React.Component {
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
        	<div className="time-series-schedule-report">
                Coming soon: Have the current plot you're looking at
                automatically emailed to you on a schedule.
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(ScheduledReport)

