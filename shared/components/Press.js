import React, { Component } from 'react'
import { connect } from 'react-redux'
import page from '../Layout/hoc/page'

class Coaching extends Component {
  addToCart() {
    var product = {
      active: 1,
      desc:
        'Weekly check-ins for advice, portfolio development, tutoring, and interview prep.',
      id: 'coaching',
      img: '',
      price: 550.0,
      sku: 'coaching',
      title: 'Professional development coaching',
      type: 'membership'
    }
    var size = ''
    this.props.dispatch({
      type: 'ADD_TO_CART',
      payload: { product, size }
    })
    this.props.dispatch({ type: 'SHOW_CART', payload: true })
  }

  render() {
    return (
      <div className="center">
        <br />
        <br />
        <p>
          Broadly, I'm available for comment on issues related to data science,
          artificial intelligence, machine learning, data visualization, big
          data, cloud computing, and technology.
        </p>
        <p>
          I'm also eager to provide clarification, follow up, or deeper details
          related to any episodes of the show and the topics covered.
        </p>
        <br />
        <br />
        <div className="row coaching-end-box">
          <div className="col-xs-12 col-sm-5 coaching-left">
            <img src="/img/png/kyle-polich.png" />
            <div className="coach-caption">
              <p>
                <span className="coaching-name">Kyle Polich</span>
              </p>
              <p>
                <span className="coaching-title">
                  Data Skeptic, Executive Producer
                </span>
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-7 coaching-right">
            <h2>Let's start a conversation</h2>
            <p>
              If we haven't made contact yet, feel free to reach out to me via{' '}
              <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a>.
            </p>
            <p>
              If I've previously agreed to be available for comment with you,
              schedule a time for us to chat via the link below.
            </p>
            <div className="book-me">
              <a className="book-me-link" href="https://calendly.com/polich">
                <span className="book-me-1">Book me on </span>
                <span className="book-me-2">calendly.com/polich</span>
              </a>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    )
  }
}

export default page(
  connect(state => ({ products: state.products }))(Coaching),
  {
    title: 'Coaching'
  }
)
