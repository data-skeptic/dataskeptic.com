import React, { Component } from 'react'
import { connect } from 'react-redux'
import CMS from './CMS'

class AdminCmsRecent extends Component {
  render() {
    return (
      <div>
        <h3>Recent</h3>

        <CMS admin={this.props.admin} mode="recent" />
      </div>
    )
  }
}
export default page(connect(state => ({
  admin: state.admin
}))(AdminCmsRecent), {
  title: `Recent`
})
