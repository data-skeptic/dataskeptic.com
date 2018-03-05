import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class AlertsListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var alert = this.props.alert
    console.log(alert)
    if (alert == undefined) {
      return (
        <div className="time-series-alerts-list-item">
          Error occurred populating alert list items.
        </div>
      )
    }
    return <div className="time-series-alerts-list-item">{alert.query}</div>
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(
  AlertsListItem
)
