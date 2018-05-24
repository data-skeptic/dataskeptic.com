import React, { Component } from 'react'
import page from '../../../Layout/hoc/page'

class ProposalsThankYouPage extends Component {
  render() {
    return (
      <div className="thank-you">
        <h1>Thank you for your input!</h1>
        <p>
          If you have anything you'd like to add or follow up on, feel free to
          reach out to kyle@dataskeptic.com directly.
        </p>
      </div>
    )
  }
}

export default page(ProposalsThankYouPage, {
  title: 'Thank you'
})
