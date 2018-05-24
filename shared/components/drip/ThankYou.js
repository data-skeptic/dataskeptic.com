import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import page from '../../Layout/hoc/page'

class DripThankYou extends Component {
  render() {
    return (
      <div className="center">
        <h2>Thanks for your feedback!</h2>
        <p>
          As you can imagine, we're collecting your feedback as training data.
        </p>
        <p>
          In time, this page will be improved to provide you personalized
          feedback about how your rating compares to others. So keep waiting and
          rating, as we build that out.
        </p>
      </div>
    )
  }
}

export default page(
  connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(
    DripThankYou
  ),
  {
    title: 'Thank You'
  }
)
