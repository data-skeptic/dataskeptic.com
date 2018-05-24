import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import adminPage from '../../Layout/hoc/adminPage'

class AdminHome extends Component {
  render() {
    const { history, children } = this.props

    return (
      <AdminLayout history={history}>
        {children ? (
          children
        ) : (
          <h3>Welcome to dataskeptic.com administration portal.</h3>
        )}
      </AdminLayout>
    )
  }
}
export default adminPage(connect(state => ({}))(AdminHome), {
  title: `Admin Dashboard`
})
