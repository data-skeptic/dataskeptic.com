import React from "react"
import {Link} from 'react-router'
import {connect} from 'react-redux'
import moment from 'moment';
import TimePicker from 'rc-time-picker';

class DateTimeSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
			m: moment()
		};
    }

	onChange(value) {
		var dispatch = this.props.dispatch
		console.log(value && value.format(format))
	}

    render() {
		const format = 'h:mm a'
		const now = moment().hour(0).minute(0)
    	return (
			<TimePicker
			    showSecond={false}
			    defaultValue={now}
			    className="date-time-selector"
			    onChange={this.onChange.bind(this)}
			    format={format}
			    use12Hours
			  />
        )
    }
}

export default connect(state => ({timeseries: state.timeseries}))(DateTimeSelector)

