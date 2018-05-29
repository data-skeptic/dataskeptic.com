import React, { Component } from 'react'
import Analytic from '../Analytic/Analytic'
import authPage from '../Layout/hoc/authPage'

class AnalyticsPage extends Component {
  render() {
    return (
      <div className="center">
        <Analytic />
      </div>
    )
  }
}

export default authPage(AnalyticsPage, {
  title: 'Analytics'
})
