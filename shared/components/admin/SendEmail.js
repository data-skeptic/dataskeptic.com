import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'
import { connect } from 'react-redux'

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

	sendEmail() {
		console.log("Button Click")
		/*
		aws.config.loadFromPath('./config.json');
		var ses = new aws.SES({apiVersion: '2010-12-01'});
		var to = ['kylepolich@gmail.com']
		var from = 'kyle@dataskeptic.com'


		ses.sendEmail( { 
		   Source: from, 
		   Destination: { ToAddresses: to },
		   Message: {
		       Subject: {
		          Data: 'A Message To You Rudy'
		       },
		       Body: {
		           Text: {
		               Data: 'Stop your messing around',
		           }
		        }
		   }
		}
		, function(err, data) {
		    if(err) throw err
	        console.log('Email sent:');
	        console.log(data);
		 });
		 */
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
		return (
			<div className="send-email">
				<select onChange={this.pickTemplate.bind(this)}>
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
					<div className="col-xs-12">
						<button className="col-xs-12 btn" onClick={this.sendEmail.bind(this)}>Send Email</button>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => ({ admin: state.admin }))(SendEmail)
