import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

export default class ContactForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "",
			email: "",
			msg: "",
			error: "",
			send: "no"
		}
	}
	
	onClick(event) {
		var url = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/contact"
		var data = this.state
		var validated = true
		var name_missing = false
		var email_missing = false
		var msg_missing = false
		if (data.name.trim() == "") {
			validated = false
			name_missing = true
		}
		if (data.email.trim() == "") {
			validated = false
			email_missing = true
		}
		if (data.msg.trim() == "") {
			validated = false
			msg_missing = true
		}
		var error = ""
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
			this.setState({send: "error", error})
		}
		else {
			this.setState({send: "sending"})
			var me = this
			axios
				.post(url, JSON.stringify(data))
				.then(function(result) {
					console.log(result)
					me.setState({send: "success"})
				})
	            .catch(function (err) {
	            	console.log(err)
	            	me.setState({send: "error"})
	            });
		}
	}

	onChangeName(event) {
		var i = event.target
		var name = i.value
		this.setState({name})
	}

	onChangeEmail(event) {
		var i = event.target
		var email = i.value
		this.setState({email})
	}

	onChangeMsg(event) {
		var i = event.target
		var msg = i.value
		this.setState({msg})
	}

	render() {
		var statusbox = <div></div>
		if (this.state.send == "success") {
			statusbox = <div className="contact-status"><span>Your message has been sent.  Thanks!</span></div>
			return (
				<div className="contact-form">
				{statusbox}
				</div>
			)
		}
		if (this.state.send == "sending") {
			status = <div className="contact-status"><span>Sending...</span></div>
		} else if (this.state.send == "error") {
			status = <div className="contact-status"><span>There was an error sending your message.  Sorry!  Feel free to reach out to kyle@dataskeptic.com directly.</span></div>
		}
		return (
			<div className="row contact-form">
				<div className="col-xs-12"><h2>Contact Us</h2></div>
				<div className="col-xs-12 col-sm-2 contact-name-lbl">Name:</div>
				<div className="col-xs-12 col-sm-4"><input className="contact-name" ref="name" onChange={this.onChangeName.bind(this)} value={this.state.name} /></div>
				<div className="col-xs-12 col-sm-2 contact-email-lbl">E-Mail:</div>
				<div className="col-xs-12 col-sm-4"><input className="contact-email" ref="email" onChange={this.onChangeEmail.bind(this)} value={this.state.email} /></div>
				<div className="col-xs-12">
					{this.state.error}
					<textarea className="contact-msg" ref="msg" onChange={this.onChangeMsg.bind(this)} value={this.state.msg} />
				</div>
				<div className="col-xs-12">
					<button className="contact-send" onClick={this.onClick.bind(this)}>Send</button>
				</div>
				{statusbox}
			</div>
		)
	}
}


