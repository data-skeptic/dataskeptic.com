import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import SendEmail from './SendEmail'

class AdminEmailsSend extends Component {
  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Send Email</h3>

        <SendEmail />
      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminEmailsSend)
