import React, { Component } from 'react'
import { connect } from 'react-redux'

import CartContainer from '../../../Cart/Containers/CartContainer'
import Error from '../../../Common/Components/Error'
import Loading from '../../../Common/Components/Loading'
import CheckoutThankYouRoute from '../ThankYouRoute/ThankYouRoute'

import CheckoutFormContainer from '../../Containers/CheckoutFormContainer'
import page from '../../../Layout/hoc/page'

class Checkout extends Component {
  redirectToSuccessPage = ({ stripe_order_id }) => {
    window.scrollTo(0, 0)
    return (window.location.href = `/checkout/thank-you?num=${stripe_order_id}`)
  }

  render() {
    const ocart = this.props.cart.toJS()
    const cart_items = ocart.cart_items
    const country_long = ocart.country_long
    const address = ocart.address
    const stripeLoading = ocart.stripeLoading
    const stripeLoadingError = ocart.stripeLoadError
    const paymentComplete = ocart.paymentComplete

    if (stripeLoading) {
      return (
        <div>
          <Loading />
        </div>
      )
    }
    if (stripeLoadingError) {
      return <Error />
    }
    if (paymentComplete) {
      return <CheckoutThankYouRoute />
    }
    if (cart_items.length === 0) {
      return <CartContainer updateable={true} />
    }

    return (
      <div className="checkout-page">
        <div className="checkout-cart">
          <CartContainer updateable={true} />
        </div>
        <div className="checkout-form">
          <div className="inner">
            <h2>Checkout</h2>

            <CheckoutFormContainer redirect={this.redirectToSuccessPage} />
          </div>
        </div>
      </div>
    )
  }
}

export default page(connect(state => ({ cart: state.cart }))(Checkout), {
  title: 'Checkout | Data Skeptic'
})
