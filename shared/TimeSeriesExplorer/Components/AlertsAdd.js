import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class AlertsAdd extends React.Component {
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
                <h4>Add</h4>
        		&mu; <input />
                &sigma; <input />
                distribution-policy <select />
                <button>Quick add</button>
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(AlertsAdd)

