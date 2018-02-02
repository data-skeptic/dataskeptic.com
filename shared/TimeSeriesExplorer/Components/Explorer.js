import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

import Options from "./Options";
import Plot from "./Plot";
import Tools from "./Tools";
import QueryConsole from "./QueryConsole";

class Explorer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    	var dispatch = this.props.dispatch
    	console.log("dispatch--------------------------------------------")
    	dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
    }

    render() {
    	var otimeseries = this.props.timeseries.toJS()
    	var state = otimeseries.state
        return (
        	<div className="time-series-explorer">
        		Explorer: {state}
                <Options />
                <Plot />
                <Tools />
                <QueryConsole />
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(Explorer)

