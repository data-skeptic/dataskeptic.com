import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import AdminLayout from "./AdminLayout"
import SendEmail from "./SendEmail"

class AdminAddJob extends Component {
  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Add job</h3>


      </AdminLayout>
    )
  }
}
export default connect(state => ({}))(AdminAddJob)
