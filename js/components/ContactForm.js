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
		if (!validated) {
			console.log("@@@@")
			if (name_missing) {
				//React.findDOMNode(this.refs.name).focus()
			}
			else if (email_missing) {
				//React.findDOMNode(this.refs.email).focus()
			}
			else {
				//React.findDOMNode(this.refs.msg).focus()
			}
			this.setState({send: "error"})
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
		console.log(this.state.send)
		if (this.state.send == "sending") {
			status = <div class="contact-status"><span>Sending...</span></div>
		} else if (this.state.send == "error") {
			status = <div class="contact-status"><span>There was an error sending your message.  Sorry!  Feel free to reach out to kyle@dataskeptic.com directly.</span></div>
		} else if (this.state.send == "success") {
			statusbox = <div class="contact-status"><span>Your message has been sent.  Thanks!</span></div>
		}
		return (
			<div class="contact-form">
				<div class="contact-name-container">
					<div class="contact-name-lbl">Name:</div>
					<input class="contact-name" ref="name" onChange={this.onChangeName.bind(this)} value={this.state.name} />
				</div>
				<div class="contact-email-container">
					<div class="contact-email-lbl">E-Mail:</div>
					<input class="contact-email" ref="email" onChange={this.onChangeEmail.bind(this)} value={this.state.email} />
				</div>
				<div class="contact-msg-container">
					<textarea class="contact-msg" ref="msg" onChange={this.onChangeMsg.bind(this)} value={this.state.msg} />
				</div>
				<div class="contact-send-container">
					<button class="contact-send" onClick={this.onClick.bind(this)}>Send</button>
				</div>
				{statusbox}
			</div>
		)
	}
}


