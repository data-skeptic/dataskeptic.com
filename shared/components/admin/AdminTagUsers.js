import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import TagUsers from './TagUsers'

class AdminTagUsers extends Component {
  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Tag Users</h3>

        <TagUsers />
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminTagUsers)
