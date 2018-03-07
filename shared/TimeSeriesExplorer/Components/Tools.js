import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Alerts from './Alerts'

class Tools extends React.Component {
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
      <div className="time-series-tools">
        Make this a tab view with single tab for Alerts and second tab with TBD
        <Alerts />
      </div>
    )
  }
}

export default connect(state => ({ timeseries: state.timeseries }))(Tools)
