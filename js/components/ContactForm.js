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
		console.log(event.target)
		var url = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/contact"
		var data = this.state
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
					<div class="contact-title">Name:</div>
					<input class="contact-name"  onChange={this.onChangeName.bind(this)} value={this.state.name} />
				</div>
				<div class="contact-email-container">
					<div class="contact-title">E-Mail:</div>
					<input class="contact-email" onChange={this.onChangeEmail.bind(this)} value={this.state.email} />
				</div>
				<textarea class="contact-msg" onChange={this.onChangeMsg.bind(this)} value={this.state.msg} />
				<button class="contact-send" onClick={this.onClick.bind(this)}>Send</button>
				{statusbox}
			</div>
		)
	}
}


