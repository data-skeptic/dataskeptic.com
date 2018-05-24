import React, { Component } from 'react'
import PrivacyText from '../Components/PrivacyText'
import page from '../../Layout/hoc/page'

class PrivacyPageContainer extends Component {
  render() {
    return (
      <div className="center">
        <PrivacyText />
      </div>
    )
  }
}

export default page(PrivacyPageContainer, {
  title: 'Privacy Policy'
})
