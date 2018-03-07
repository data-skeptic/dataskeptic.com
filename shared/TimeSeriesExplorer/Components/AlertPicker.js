import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Select from 'react-select'

class AlertPicker extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    //dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
  }

  handleAlertPicked(selectedOption) {
    console.log('hi')
    var dispatch = this.props.dispatch
    dispatch({ type: 'TSE_SET_ALERT_TYPE', payload: { selectedOption } })
  }

  render() {
    var alert_type = this.props.alert_type
    return (
      <div className="time-series-alert-picker">
        <div className="row">
          <div className="col-xs-12 col-sm-2">Type:</div>
          <div className="col-xs-12 col-sm-10">
            <Select
              name="alert_type"
              value={alert_type}
              onChange={this.handleAlertPicked.bind(this)}
              options={[
                {
                  value: 'FLOOR',
                  label: 'FLOOR - a metric falls below a threshold'
                },
                {
                  value: 'CEILING',
                  label: 'CEILING - a metric exceeds a threshold'
                },
                { value: 'N_STDDEV', label: '&mu;/&sigma;' }
              ]}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(AlertPicker)
