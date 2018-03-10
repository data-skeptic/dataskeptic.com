var chatter = require("./chatter")

var AWS = require('aws-sdk');
var ses = new AWS.SES({apiVersion: '2010-12-01'});

function get_opening_remark(dispatch, reply, cstate) {
	return "Ok, how can I help you related to our store?"
}

function handler(dispatch, reply, cstate, message) {
	var msg = chatter.get_message("STORE>HAVE_PLACED_ORDER_Q")
	var handler = module.exports.order_yn_handler
	return {msg, handler}
}

function can_handle(message, cstate, reply) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('store') != -1) {
		return true
	} else {
		return false
	}
}

function order_yn_handler(dispatch, reply, cstate, message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf("y") == 0) {
		reply({text: "Ok, customer service."}, 'bot')
		var msg = chatter.get_message("STORE>WHAT_ISSUE")
		var handler = module.exports.customer_service_handler
		return {msg, handler}
	} else {
		reply({text: "Ok, no order yet."}, 'bot')
		var msg = chatter.get_message("HAVING_TROUBLE_Q")
		var handler = module.exports.pre_customer_service_handler
		return {msg, handler}
	}
}

function customer_service_handler(dispatch, reply, cstate, message) {
	var store_issue = message.text
	dispatch({type: "SAVE_STORE_ISSUE", store_issue})
	var email = cstate.email
	if (email) {
		var message2 = {text: email}
		return send_email_handler(dispatch, reply, cstate, message2)
	} else {
		var msg = chatter.get_message("STORE>ASK_EMAIL")
		var handler = module.exports.send_email_handler
		return {msg, handler}
	}
}

function send_email_handler(dispatch, reply, cstate, message) {
	var email = message.text
	dispatch({type: "SAVE_EMAIL", email})
	var msg = "I don't think I know how to solve your issue.  I'm going to notify a human who will get back to you.  Give me one second to do that..."
	var handler = undefined
	var text = cstate.store_issue
	var to = ['orders@dataskeptic.com']
	var from = 'orders@dataskeptic.com'
	var d = new Date()
	ses.sendEmail( { 
	   Source: from, 
	   Destination: { ToAddresses: to },
	   Message: {
	       Subject: {
	          Data: 'DS Chatbot message ' + d.toString()
	       },
	       Body: {
	           Text: {
	               Data: text + "\n\n" + JSON.stringify(cstate),
	           }
	        }
	   }
	}
	, function(err, data) {
	    if(err) {
	    	console.log(err)
	    } else {
	    	reply({text: "Ok, I sent an email to a human."}, 'bot')
	    	reply({text: "Yup, I'll make sure someone looks at that."}, 'kyle')
	    }
	 });
	return {msg, handler}
}

function pre_customer_service_handler(dispatch, reply, cstate, message) {
	var store_issue = message.text
	dispatch({type: "SAVE_STORE_ISSUE", store_issue})
	var email = cstate.email
	if (email) {
		var message2 = {text: email}
		return send_email_handler(dispatch, reply, cstate, message2)
	} else {
		var msg = chatter.get_message("STORE>ASK_EMAIL")
		var handler = module.exports.send_email_handler
		return {msg, handler}
	}
}

module.exports = {handler, get_opening_remark, can_handle, order_yn_handler, customer_service_handler, send_email_handler, pre_customer_service_handler}

