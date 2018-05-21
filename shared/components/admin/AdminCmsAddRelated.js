import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import RelatedContent from './RelatedContent'

class AdminCmsAddRelated extends Component {
  render() {
    const { history } = this.props

    return (
      <div history={history}>
        <h3>Related Content</h3>

        <RelatedContent />
      </div>
    )
  }
}
export default connect(state => ({}))(AdminCmsAddRelated)
