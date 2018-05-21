import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import page from '../../Layout/hoc/page'

class DripUnsubscribe extends Component {
  render() {
    return (
      <div className="center">
        <h2>We're sorry to see you go</h2>
        <p>Your email has been marked for no further emails.</p>
        <p>
          If you have a moment to send feedback about why you unsubscribed, we'd
          appreciate your insights. Send to kyle@dataskeptic.com
        </p>
      </div>
    )
  }
}

export default page(
  connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(
    DripUnsubscribe
  ),
  {
    title: `Drip Unsubscribe`
  }
)
