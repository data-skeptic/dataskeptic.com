import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Alerts from './Alerts'
import FrequencySelector from './FrequencySelector'
import DateTimeSelector from './DateTimeSelector'

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
        <div className="row">
          <div className="col-xs-2  col-sm-1">Every:</div>
          <div className="col-xs-10 col-sm-5">
            <FrequencySelector />
          </div>
          <div className="col-xs-2  col-sm-1">At:</div>
          <div className="col-xs-10 col-sm-5">
            <DateTimeSelector />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <select>
              <option>abstract component on other page</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button className="time-series-scheduled-report-save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(
  ScheduledReport
)
