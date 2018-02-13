import React from "react"
import {Link} from 'react-router'
import {connect} from 'react-redux'
import Select from 'react-select'

class TagSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    handleFrequencyChoice(selectedOption) {
        var dispatch = this.props.dispatch
        //dispatch({type: "TSE_SET_ESCALATION_POLICY", payload: {selectedOption}})
    }

    render() {
    	var values = this.props.tags //["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    	var options = []
    	for (var value of values) {
    		var label = value
	        var option = {value, label}
	        options.push(option)    		
    	}
    	var value = this.props.tag
    	return (
            <div>
                Tags:
            	<Select
                    name="escalation_policy"
                    value={value}
                    onChange={this.handleFrequencyChoice.bind(this)}
                    options={options}
                />
            </div>
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(TagSelector)

