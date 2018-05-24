import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Options from './Options'
import Plot from './Plot'
import Alerts from './Alerts'
import QueryConsole from './QueryConsole'
import ScheduledReport from './ScheduledReport'
import page from '../../Layout/hoc/page'

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tabIndex: 0 }
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    dispatch({
      type: 'INITIALIZE_TIME_SERIES_EXPLORER',
      payload: { dispatch }
    })
  }

  render() {
    var otimeseries = this.props.timeseries.toJS()
    var state = otimeseries.state
    var databases = otimeseries.databases
    var measurements = otimeseries.measurements
    var database = otimeseries.database
    var measurement = otimeseries.measurement
    var func = otimeseries.func
    var range = otimeseries.range
    var resolution = otimeseries.resolution
    var fields = otimeseries.fields
    var field = otimeseries.field
    var tags = otimeseries.tags
    var tag = otimeseries.tag
    var config = {
      databases,
      measurements,
      database,
      measurement,
      field,
      fields,
      tag,
      tags,
      func,
      range,
      resolution
    }

    var alerts = otimeseries.alerts
    var alert_type = otimeseries.alert_type
    var escalation_policies = otimeseries.escalation_policies
    var escalation_policy = otimeseries.escalation_policy
    var contact_methods = otimeseries.contact_methods

    return (
      <div className="time-series-explorer">
        Explorer: {state}
        <Options config={config} />
        <Plot />
        <br />
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => this.setState({ tabIndex })}
        >
          <TabList>
            <Tab>Alerts</Tab>
            <Tab>Scheduled Reports</Tab>
            <Tab>Query Console</Tab>
            <Tab disabled>Forecasts</Tab>
            <Tab disabled>Machine Learning</Tab>
          </TabList>
          <TabPanel>
            <Alerts
              alerts={alerts}
              alert_type={alert_type}
              escalation_policy={escalation_policy}
              escalation_policies={escalation_policies}
              contact_methods={contact_methods}
            />
          </TabPanel>
          <TabPanel>
            <ScheduledReport />
          </TabPanel>
          <TabPanel>
            <QueryConsole />
          </TabPanel>
          <TabPanel>Coming soon</TabPanel>
          <TabPanel>Coming soon</TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default page(
  connect(state => ({ timeseries: state.timeseries }))(Explorer),
  {
    title: `Admin Explorer
  `
  }
)
