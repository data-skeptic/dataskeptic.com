import React, { Component } from 'react'
import { connect } from 'react-redux'
import RelatedContentList from './RelatedContentList'
import page from '../../Layout/hoc/page'

class AdminCmsRecentRelated extends Component {
  render() {
    const oadmin = this.props.admin.toJS()
    const relatedcontent = oadmin['relatedcontent'] || []

    return (
      relatedcontent && (
        <div>
          <h3>Recent Related</h3>

          <RelatedContentList items={relatedcontent} />
        </div>
      )
    )
  }
}

export default page(
  connect(state => ({
    admin: state.admin
  }))(AdminCmsRecentRelated),
  {
    title: `Admin Recent Related`
  }
)
