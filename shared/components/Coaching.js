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
        <h2>Professional development coaching</h2>
        <p>
          I remember when I left school to enter the job market. There was so
          much I didn't know! I worked hard and got good grades, but I realize
          that was only half the recipe for success. I had to learn about how to
          interview, how to negotiate, when to make a career move, and what
          skills I needed to make myself more attractive to employers. It was a
          long and slow process. In retrospect, I wish I had a mentor to help me
          along the way.
        </p>
        <p>
          Many years later, I find myself in a position to help people like
          that. I bring my industry experience, knowledge of data science, and
          connections in the industry to the table to help people prepare for
          and execute their next career move.
        </p>
        <p>
          My services include a weekly 1 hour Skype session where we define your
          goals, discuss your questions, and I share relevant knowledge,
          contacts, and references. With most of the people I work with, this
          means technical walkthroughs where I teach them tools like SQL,
          sk-learn, dplyr, Spark, etc. Other times we focus more on interview
          preparation or portfolio building. Basically, I'm here to develop a
          custom plan that works for you.
        </p>
        <p>
          In addition to our hour weekly checkin, I'm happy to have some email
          back and forth or a Slack discussion when we're both online. We'll
          usually set goals in each Skype session, so this is helpful if there
          are stumbling blocks along the way and we don't lose a week.
        </p>
        <p>
          Overall, my vision is to help you find a career you want to pursue,
          identify any skill gaps, teach those skill gaps, and coach you through
          rounds of interviews until you have an offer letter in your hand. I
          can often make personal introductions when I have relevant industry
          contacts.
        </p>
        <p>My standard rate is $550 / month.</p>
        <p>
          Your next question is likely to be "Ok, but how many months is this
          going to take?" Ultimately, that depends on you. I don't yet know your
          starting point or finishing line. That's something we can discuss on
          our first chat. I should be able to give you a realistic time frame
          after an initial discussion. I've worked with people as short as one
          month and as long as 9 months. Largely, the variance is your existing
          technical background and the amount of time you can put in per week.
        </p>
        <p>Let me help you push your career forward!</p>
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
            <h2>Let's get started</h2>
            <p>
              Schedule me right now for our first session. If you're not
              completely satisified, I'll wave the fee and we'll part friends.
            </p>
            <p>
              I look forward to helping you achieve your objectives as a data
              scientist.
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
    title: 'Professional development coaching'
  }
)
