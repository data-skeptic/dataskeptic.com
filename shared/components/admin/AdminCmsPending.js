import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import CMS from './CMS'

class AdminCmsPending extends Component {
  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Pending</h3>

        <CMS admin={this.props.admin} mode="pending" />
      </AdminLayout>
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminCmsPending)
