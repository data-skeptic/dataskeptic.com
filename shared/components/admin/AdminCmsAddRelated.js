import React, { Component } from 'react'
import { connect } from 'react-redux'
import RelatedContent from './RelatedContent'
import page from '../../Layout/hoc/page'

class AdminCmsAddRelated extends Component {
  render() {
    return (
      <div>
        <h3>Related Content</h3>

        <RelatedContent />
      </div>
    )
  }
}
export default page(connect(state => ({}))(AdminCmsAddRelated), {
  title: `Admin Related Content`
})
