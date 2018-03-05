import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import AlertsListItem from './AlertsListItem'

class AlertsList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    //dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
  }

  render() {
    var alerts = this.props.alerts || []
    if (alerts.length == 0) {
      return (
        <div className="time-series-alerts-list">
          <h4>Active Alerts</h4>
          <p>No alerts to show.</p>
        </div>
      )
    } else {
      return (
        <div className="time-series-alerts-list">
          <h4>Active Alerts</h4>
          {alerts.map(alert => <AlertsListItem alert={alert} />)}
        </div>
      )
    }
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(AlertsList)
