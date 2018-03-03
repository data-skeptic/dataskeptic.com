var chatter = require("./chatter")

function get_opening_remark(dispatch) {
	return "Ok, how can I help you related to our store?"
}

function handler(dispatch, reply, cstate, message) {
	var msg = "Working store!"
	var handler = undefined
	return {msg, handler}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('store') != -1) {
		return true
	} else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}
/*
	bot.dialog('customerservice', customerservice)
	bot.dialog('sales', sales)
*/

/*
var builder = require('botbuilder');
var AWS = require('aws-sdk');

var chatter = require("../chatter")

var waterfall = [
	function(session, args, next) {
		session.dialogData.profile = args || {}	
		var resp = chatter.get_message("STORE>HAVE_PLACED_ORDER_Q")
		builder.Prompts.confirm(session, resp)
	},
	function(session, result, next) {
		var yn = result.response
		if (yn) {
			session.beginDialog('sales', session.userData.profile)
		} else {
			session.beginDialog('customerservice', session.userData.profile)
		}
	}
]

exports.waterfall = waterfall

*/