import React from "react"
import ReactDOM from "react-dom"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';

import ContactFormContainer from '../Containers/ContactFormContainer/ContactFormContainer';

import {changePageTitle} from '../../Layout/Actions/LayoutActions';

class ContactUs extends React.Component {
	constructor(props) {
		super(props)
	}

    componentDidMount() {
        const {dispatch} = this.props;
        const {title} = ContactUs.getPageMeta(this.props);
        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Contact Us | Data Skeptic',
			description: 'We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our queue to explode. We prioritize responses to Data Skeptic members first, and to those who ask questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack. Many people can benefit from responses in public places.'
        }
    }

	onChangeEmail(event) {
		console.log(event)
		var i = event.target
		var email = i.value
		var target = event.target
		var cls = "email"
		var val = target.value
		var dispatch = this.props.dispatch
		dispatch({type: "UPDATE_ADDRESS", payload: {cls, val} })
	}

	onClick(event) {
		var ocart = this.props.cart.toJS()
		var address = ocart.address
		var email = address.email
		var dispatch = this.props.dispatch
		var token = ""
		var req = {email: email, token: token, set_active: true}
		dispatch({type: "SLACK_UPDATE", payload: {msg: "Sending..."} })
		var config = {}
		axios
			.post("/api/slack/join", req, config)
			.then(function(resp) {
				var data = resp['data']
				var msg = data['msg']
				dispatch({type: "SLACK_UPDATE", payload: {msg} })            
			})
			.catch(function(err) {
				var data = err['data']
				var msg = "Sorry, we're having a problem getting that done :("
				if (data != undefined) {
					if (data['msg'] != undefined) {
						msg = data['msg']
					}
				}
				dispatch({type: "SLACK_UPDATE", payload: {msg} })
				console.log(err)
			})
	}

	render() {
		var osite = this.props.site.toJS()
		var ocart = this.props.cart.toJS()
		var email = ""
		var address = ocart.address
		if (address != undefined) {
			email = address.email
		}
		var slackstatus = (
			<div className="slack-status">{osite.slackstatus}</div>
		)
		return (
	    	<div className="center">
				<div className="row contact-page">
					<div className="col-xs-12"><h2>Contact Us</h2></div>
					<div className="col-xs-12">
						<p>We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our queue to explode.  We prioritize responses to Data Skeptic members first, and to those who ask questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack.  Many people can benefit from responses in public places.</p>
						<div className="row">
							<div className="col-xs-12 col-sm-4 contact-person-out">
								<div className="contact-person">
									<a href="mailto:orders@dataskeptic.com"><img src="img/png/email-icon.png" /></a>
									<span className="vcenter"><p>For inquiries related to a purchase of any kind, including membership, please contact <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a> for prioritized service.</p></span>
									</div>
							</div>
							<div className="col-xs-12 col-sm-4 contact-person-out">
								<div className="contact-person">
									<a href="mailto:advertising@dataskeptic.com"><img src="img/png/email-icon.png" /></a>
									<span className="vcenter"><p>For advertising related questions or issues, contact <a href="advertising@dataskeptic.com">advertising@dataskeptic.com</a>.</p></span>
									</div>
							</div>
							<div className="col-xs-12 col-sm-4 contact-person-out">
								<div className="contact-person">
									<a href="mailto:kyle@dataskeptic.com"><img src="img/png/email-icon.png" /></a>
									<span className="vcenter"><p>If you're looking to mail us something like a review copy of a book, please contact <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a>.</p></span>
								</div>
							</div>
						</div>
						<br/>
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								<div className="slack-join row">
									<div className="col-xs-12 col-sm-3 slack-join-left">
										<img src="/img/png/slack-icon.png" />
									</div>
									<div className="col-xs-12 col-sm-9 slack-join-right">
											<p>To join our Slack channel, enter your email in the box below.</p>
				 						<input onChange={this.onChangeEmail.bind(this)} className='slack-email' value={email} />
				 						<button className="slack-button" onClick={this.onClick.bind(this)}>Join dataskeptic.slack.com</button>
				 						{slackstatus}
				 					</div>
			 					</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<br/>
		 						<p>You can find us on Twitter via <a href="https://twitter.com/dataskeptic">@DataSkeptic</a></p>
								<br/>
								<p>We are on Facebook via <a href="https://www.facebook.com/dataskeptic">https://www.facebook.com/dataskeptic</a>.</p>
							</div>
						</div>
						<br/>
						<p>You can also reach us via the contact form below.</p>
						<p>Please note, we often reply via the Data Skeptic blog and may share a link to our reply if its something many readers may enjoy.  If so, we refer to people via firstname only.  If that's an issue, let us know.</p>
					</div>
					&nbsp;
					<br/>

					<ContactFormContainer />
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({
		cart: state.cart,
		site: state.site
	})
)(ContactUs)


