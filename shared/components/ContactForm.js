import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

class ContactForm extends React.Component {
	constructor(props) {
		super(props)
	}
	
	onClick(event, name, email, msg) {
		var validated = true
		var name_missing = false
		var email_missing = false
		var msg_missing = false

		if (name == "") {
			validated = false
			name_missing = true
		}
		if (email == "") {
			validated = false
			email_missing = true
		}
		if (msg == "") {
			validated = false
			msg_missing = true
		}
		if (!validated) {
			if (name_missing) {
				error = "Please provide your name."
				this.refs.name.focus()
			}
			else if (email_missing) {
				error = "Please provide a valid email address."
				this.refs.email.focus()
			}
			else {
				error = "Please provide a message."
				this.refs.msg.focus()
			}
			this.props.dispatch({type: "CONTACT_FORM_ERROR", payload: {error} })
		}
		else {
			var dispatch = this.props.dispatch
			dispatch({type: "CONTACT_FORM", payload: {dispatch} })
		}
	}

	onChangeName(event) {
		var i = event.target
		var name = i.value
		this.props.dispatch({type: "UPDATE_CONTACT_FORM", payload: {name} })
	}

	onChangeEmail(event) {
		var i = event.target
		var email = i.value
		this.props.dispatch({type: "UPDATE_CONTACT_FORM", payload: {email} })
	}

	onChangeMsg(event) {
		var i = event.target
		var msg = i.value
		this.props.dispatch({type: "UPDATE_CONTACT_FORM", payload: {msg} })
	}

	render() {
		var osite = this.props.site.toJS()
		var name = osite.contact_form.name
		var email = osite.contact_form.email
		var msg = osite.contact_form.msg
		var error = osite.contact_form.error
		var send = osite.contact_form.send
		var statusbox = <div></div>
		if (send == "success") {
			statusbox = <div className="contact-status"><span>Your message has been sent.  Thanks!</span></div>
			return (
				<div className="contact-form">
				{statusbox}
				</div>
			)
		}
		if (send == "sending") {
			status = <div className="contact-status"><span>Sending...</span></div>
		} else if (send == "error") {
			status = <div className="contact-status"><span>There was an error sending your message.  Sorry!  Feel free to reach out to kyle@dataskeptic.com directly.</span></div>
		}
		return (
			<div className="row contact-form">
				<div className="col-xs-12"><h2>Contact Us</h2></div>
				<div className="col-xs-12 col-sm-2 contact-name-lbl">Name:</div>
				<div className="col-xs-12 col-sm-4"><input className="contact-name" ref="name" onChange={this.onChangeName.bind(this)} value={name} /></div>
				<div className="col-xs-12 col-sm-2 contact-email-lbl">E-Mail:</div>
				<div className="col-xs-12 col-sm-4"><input className="contact-email" ref="email" onChange={this.onChangeEmail.bind(this)} value={email} /></div>
				<div className="col-xs-12">
					{error}
					<textarea className="contact-msg" ref="msg" onChange={this.onChangeMsg.bind(this)} value={msg} />
				</div>
				<div className="col-xs-12">
					<button className="contact-send" onClick={this.onClick.bind(this, name, email, msg)}>Send</button>
				</div>
				{statusbox}
			</div>
		)
	}
}

export default connect(state => ({ site: state.site }))(ContactForm)

