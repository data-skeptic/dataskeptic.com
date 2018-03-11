import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import HomepageController from './HomepageController'

class AdminCmsFeature extends Component {
  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Feature</h3>

        <HomepageController />
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminCmsFeature)
