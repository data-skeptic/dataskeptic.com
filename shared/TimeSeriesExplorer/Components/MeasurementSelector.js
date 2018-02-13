import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class MeasurementSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    	var measurements = this.props.measurements
    	if (measurements == undefined) {
    		measurements = []
    	}
    	if (measurements.length == 0) {
    		return (
    			<div className="measurement-selector">
    				Loading...
    			</div>
    		)
    	}
        return (
   			<div className="measurement-selector">
                Measurement:
                <select className="tse-selector">
                {measurements.map(measurement => (
                  <option>{measurement.name}</option>
                ))}
                </select>
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(MeasurementSelector)

