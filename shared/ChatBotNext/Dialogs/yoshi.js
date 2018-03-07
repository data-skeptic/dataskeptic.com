var chatter = require("./chatter")

var AWS = require('aws-sdk');
var ses = new AWS.SES({apiVersion: '2010-12-01'});

function get_opening_remark(dispatch, reply, cstate) {
	return "Yoshi is available for chat.  Please type 'exit' to get back to me.  Say 'hi' to get going."
}

function handler(dispatch, reply, cstate, message) {
	var msg = chatter.get_message("YOSHI>GREETING")
	var handler = module.exports.handler
	return {msg, handler}
}

function can_handle(message, cstate, reply) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('yoshi') != -1) {
		return true
	} else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}

