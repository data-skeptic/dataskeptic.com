import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import CMS from './CMS'

class AdminCmsRecent extends Component {
  render() {
    const { history } = this.props

    return (
      <div
      >
        <h3>Recent</h3>

        <CMS admin={this.props.admin} mode="recent" />
      </div>
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminCmsRecent)
