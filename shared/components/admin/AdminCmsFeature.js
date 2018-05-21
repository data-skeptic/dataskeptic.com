import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomepageController from './HomepageController'
import page from '../../Layout/hoc/page'

class AdminCmsFeature extends Component {
  render() {
    return (
      <div>
        <h3>Feature</h3>

        <HomepageController />
      </div>
    )
  }
}

export default page(connect(state => ({}))(AdminCmsFeature), {
  title: `Admin 
  Feature`
})
