import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import AlertsAdd from './AlertsAdd'
import AlertList from './AlertsList'

class Alerts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    //dispatch({type: "INITIALIZE_TIME_SERIES_EXPLORER", payload: {}})
  }

  render() {
    var alerts = this.props.alerts
    var alert_type = this.props.alert_type
    var escalation_policy = this.props.escalation_policy
    var escalation_policies = this.props.escalation_policies
    var contact_methods = this.props.contact_methods
    return (
      <div className="time-series-alerts">
        <AlertsAdd
          alert_type={alert_type}
          escalation_policy={escalation_policy}
          escalation_policies={escalation_policies}
          contact_methods={contact_methods}
        />
        <AlertList alerts={alerts} />
        <hr />
      </div>
    )
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(Alerts)
