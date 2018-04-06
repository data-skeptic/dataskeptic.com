import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import ContributorAddFormController from './contributors/ContributorAddFormController'

class AdminCmsContributorAdd extends Component {
  render() {
    const { history } = this.props

    return (
      <AdminLayout history={history}>
        <h3>Add Contributor</h3>

        <ContributorAddFormController />
      </AdminLayout>
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminCmsContributorAdd)
