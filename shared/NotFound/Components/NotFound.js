import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContactFormContainer from '../../Contacts/Containers/ContactFormContainer/ContactFormContainer'
import page from '../../Layout/hoc/page'

class NotFound extends Component {
  render() {
    const { url } = this.props
    const missedMessage = `I was looking for a page on your site at ${url}\n`

    return (
      <div className="notFoundPage">
        <h2>Page Not Found</h2>
        <p>
          If you wouldn't mind, please drop a line and let us know what you were
          looking for.
        </p>

        <div className="feedbackForm">
          <ContactFormContainer
            initialValues={{
              message: missedMessage
            }}
          />
        </div>
      </div>
    )
  }
}

export default page(
  connect((state, ownProps) => ({
    url: ownProps.location.pathname
  }))(NotFound),
  {
    notFoundPage: true,
    title: 'Page Not Found'
  }
)
