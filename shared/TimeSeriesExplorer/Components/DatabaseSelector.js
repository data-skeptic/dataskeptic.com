import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';

class DatabaseSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    	var databases = this.props.databases
    	if (databases == undefined) {
    		databases = []
    	}
    	if (databases.length == 0) {
    		return (
    			<div className="database-selector">
    				Loading...
    			</div>
    		)
    	}
        return (
   			<div className="database-selector">
                Database:
                <select className="tse-selector">
                {databases.map(database => (
                  <option>{database.name}</option>
                ))}
                </select>
        	</div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(DatabaseSelector)

