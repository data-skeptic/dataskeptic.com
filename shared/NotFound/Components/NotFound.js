import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changePageTitle } from '../../Layout/Actions/LayoutActions'
import ContactFormContainer from '../../Contacts/Containers/ContactFormContainer/ContactFormContainer'

class NotFound extends Component {
  static getPageMeta() {
    return {
      notFoundPage: true,
      title: 'Page Not Found'
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(changePageTitle('Page Not Found'))
  }

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

export default connect((state, ownProps) => ({
  url: ownProps.location.pathname
}))(NotFound)
