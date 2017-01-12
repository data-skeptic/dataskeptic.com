import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import axios from "axios"
import querystring from 'querystring'

class SendEmail extends React.Component {
	constructor(props) {
		super(props);
	}
  	onChange(e) {
		var id = e.target.id
		var t = ""
		if (id == "from") {
			t = "SET_EMAIL_FROM"
		}
		else if (id == "to") {
			t = "SET_EMAIL_TO"
		}
		else if (id == "subject") {
			t = "SET_EMAIL_SUBJECT"
		}
		var value = e.target.value
		this.props.dispatch({type: t, payload: value })
	}

	pickTemplate(e) {
		var t = "PICK_EMAIL_TEMPLATE"
		var value = e.target.value
		console.log(value)
		this.props.dispatch({type: t, payload: value })
	}
	replaceAll(str, find, replace) {
		return str.replace(new RegExp(find, 'g'), replace);
	}
	sendEmail() {
		var oadmin = this.props.admin.toJS()
		var to = oadmin.to
		var subject = oadmin.subject
		var msg = oadmin.body
		msg = this.replaceAll(msg, '\n', '<br/>')
		var req = { to, subject, msg }
		var resp = {status: 0, msg: "Not set"}
		var dispatch = this.props.dispatch
		dispatch({type: "SET_EMAIL_SEND_MSG", payload: "Sending..." })		
		var url = "/api/email/send"
		var config = {
			'Content-Type' : "application/x-www-form-urlencoded"
		};
		var sreq = querystring.stringify(req)
  		axios
  			.post(url, sreq, config)
  			.then(function(r) {
  				console.log("back")
		        var resp = r['data']
				console.log(resp)
				if (resp['status'] == 200) {
					dispatch({type: "SET_EMAIL_SEND_MSG", payload: "Sent!" })
					dispatch({type: "SET_EMAIL_BODY", value: ""})
				} else {
					dispatch({type: "SET_EMAIL_SEND_MSG", payload: "Error: " + JSON.stringify(resp['msg']) })
				}
  			})
  			.catch(function(err) {
	          	console.log("api error")
	  			console.log(err)
				dispatch({type: "SET_EMAIL_SEND_MSG", payload: "Error: " + err })
  			})
	}
	handleContentChange(e) {
		var t = "SET_EMAIL_BODY"
		var value = e.target.value
		this.props.dispatch({type: t, payload: value })
	}
	render() {
		var oadmin = this.props.admin.toJS()
		var from = oadmin.from
		var to = oadmin.to
		var subject = oadmin.subject
		var body = oadmin.body
		var email_send_msg = oadmin.email_send_msg
		var response_msg = <div></div>
		if (email_send_msg != "") {
			response_msg = <div classname="error-box">{email_send_msg}</div>
		}
		return (
			<div className="send-email">
				<select onChange={this.pickTemplate.bind(this)}>
				<option key={"---[Choose]---"} value={""}>---[Choose]---</option>
				{
					oadmin.templates.map(function(template) {
						var name = template['name']
						return <option key={name} value={name}>{name}</option>
					})
				}
				</select>
				<div className="row">
					<div className="col-xs-12 col-sm-2">From:</div>
					<div className="col-xs-12 col-sm-10"><input className="email-input" id="from" className="from" value={from} onChange={this.onChange.bind(this)} /></div>
					<div className="col-xs-12 col-sm-2">To:</div>
					<div className="col-xs-12 col-sm-10"><input className="email-input" id="to" className="to" value={to} onChange={this.onChange.bind(this)} /></div>
					<div className="col-xs-12 col-sm-2">Subject:</div>
					<div className="col-xs-12 col-sm-10"><input className="email-input" id="subject" className="subject" value={subject} onChange={this.onChange.bind(this)} /></div>
					<div className="col-xs-12">
						<textarea className="email-body" value={body} onChange={this.handleContentChange.bind(this)} />
					</div>
					{response_msg}
					<div className="col-xs-12">
						<button className="col-xs-12 btn" onClick={this.sendEmail.bind(this)}>Send Email</button>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ admin: state.admin }))(SendEmail)
