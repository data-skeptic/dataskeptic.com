import React, { Component } from 'react'
import { connect } from 'react-redux'
import CMS from './CMS'
import page from '../../Layout/hoc/page'

class AdminCmsPending extends Component {
  render() {
    return (
      <div>
        <h3>Pending</h3>

        <CMS admin={this.props.admin} mode="pending" />
      </div>
    )
  }
}
export default page(
  connect(state => ({
    admin: state.admin
  }))(AdminCmsPending),
  {
    title: `Admin Pending`
  }
)
