import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import CmsBlogUpdate from "./blog/CmsBlogUpdate";

class AdminCmsBlogUpdate extends Component {
  render() {
    const { history, location: { pathname } } = this.props
    const prettyname = pathname.replace('/admin/cms/blog', '')

    return (
      <AdminLayout history={history}>
        <h3>Update Blog Post</h3>
        
        <CmsBlogUpdate 
          prettyname={prettyname}
        />
      </AdminLayout>
    )
  }
}
export default connect(state => ({
  admin: state.admin
}))(AdminCmsBlogUpdate)
