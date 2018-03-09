import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import RelatedContentList from './RelatedContentList'

class AdminCmsRecentRelated extends Component {
  render() {
    const { history } = this.props
    const oadmin = this.props.admin.toJS()
    const relatedcontent = oadmin['relatedcontent'] || []

    return (
      relatedcontent && (
        <AdminLayout history={history}>
          <h3>Recent Related</h3>

          <RelatedContentList items={relatedcontent} />
        </AdminLayout>
      )
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminCmsRecentRelated)
