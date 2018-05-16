import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { changePageTitle } from '../../../Layout/Actions/LayoutActions'
import { loadReceipt } from '../../Actions/CheckoutActions'
import Receipt from '../../Components/Receipt'

const getLocationQuery = search => {
  const params = search.replace('?', '').split('=')
  let query = !!params[1] ? params[1] : ''
  if (query) {
    query = decodeURIComponent(query)
  }

  return query
}

class ThankYouRoute extends Component {
  static getPageMeta() {
    return {
      title: `Payment Complete | Data Skeptic`
    }
  }

  componentDidMount() {
    const id = getLocationQuery(this.props.location.search)
    if (isEmpty(id)) {
      return this.props.router.push('/')
    }

    if (isEmpty(this.props.receipt)) {
      this.props.dispatch(loadReceipt(id))
    }

    const { title } = ThankYouRoute.getPageMeta()
    this.props.dispatch(changePageTitle(title))
  }

  render() {
    const { loaded, receipt } = this.props

    return (
      <div className="thank-you">
        <div>
          <h1>Thank you!</h1>
          <p>Payment Complete.</p>
          <img
            src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
            width="200"
            style={{ marginBottom: '-45px' }}
          />
        </div>

        {loaded ? (
          <Receipt {...receipt} />
        ) : (
          <span className="loading">Processing...</span>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  error: state.checkout.get('error'),
  loaded: state.checkout.get('loaded'),
  processing: state.checkout.get('processing'),
  receipt: state.checkout.get('receipt').toJS()
}))(ThankYouRoute)
