import React from "react"
import ReactDOM from "react-dom"
import ContactForm from './ContactForm'
import { connect } from 'react-redux'

class ContactUs extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			resp: ''
		}
		this.onChangeEmail = this.onChangeEmail.bind(this)
	}

	onChangeEmail(event) {
		console.log(event)
		var i = event.target
		var email = i.value
		var target = event.target
		var cls = "email"
		var val = target.value
		this.props.dispatch({type: "UPDATE_ADDRESS", payload: {cls, val} })
	}

	onClick(event) {
		// TODO: validation
		var ocart = this.props.cart.toJS()
		var address = ocart.address
		var email = address.email
		this.props.dispatch({type: "JOIN_SLACK", payload: {email} })
	}

	render() {
		var ocart = this.props.cart.toJS()
		var address = ocart.address
		var email = address.email
		return (
	    	<div className="center">
				<div className="row contact-page">
					<div className="col-xs-12"><h2>Contact Us</h2></div>
					<div className="col-xs-12">
						<p>For inquiries related to a purchase of any kind, including membership, please contact <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a> for prioritized service.</p>
						<p>For advertising related questions or issues, contact <a href="advertising@dataskeptic.com">advertising@dataskeptic.com</a> or <a href="kyle@dataskeptic.com">kyle@dataskeptic.com</a>.</p>
						<p>We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our queue to explode.  We prioritize responses to Data Skeptic members first, and to those who ask quetions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack.  Many people can benefit from responses in public places.</p>
						<p>To join our Slack channel, enter your email in the box below.</p>
						<input onChange={this.onChangeEmail.bind(this)} className='slack-email' value={email} />
						<button onClick={this.onClick.bind(this)}>Join dataskeptic.slack.com</button>
						<span className='slack-response'>{this.state.resp}</span>
						<p>You can find us on Twitter via <a href="https://twitter.com/dataskeptic">@DataSkeptic</a></p>
						<p>We are on Facebook via <a href="https://www.facebook.com/dataskeptic">https://www.facebook.com/dataskeptic</a>.</p>
						<p>You can also reach us via the contact form below.</p>
						<p>Please note, we often reply via the Data Skeptic blog and may share a link to our reply if its something many readers may enjoy.  If so, we refer to people via firstname only.  If that's an issue, let us know.</p>
					</div>
					&nbsp;
					<br/>
					<ContactForm />
				</div>
			</div>
		)
	}
}

export default connect(state => ({ cart: state.cart }))(ContactUs)


