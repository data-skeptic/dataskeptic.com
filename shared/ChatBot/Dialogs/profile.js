var chatter = require("./chatter")

function get_opening_remark(dispatch) {
	return "Whose profile would you like to see?"
}
function handler(dispatch, reply, cstate, message) {
	var lmsg = message.text.toLowerCase().trim()
	if (lmsg == "exit") {
		var msg = "What should we talk about now?"
		var handler = undefined
		return {msg, handler}
	}
	var msg = "I'm sorry, I'm not sure who you mean.  My string matching is very poorly implemented in this regard.  You'd think Kyle would have done a better job programming me.  That guy, geez.  Can you simplify?  Let's try first name only, lower case as if this was implemented in the worst possible way.  To give up, type 'exit'"
	var handler = module.exports.handler

	if (lmsg.indexOf("kyle") != -1) {
		// TODO: cache of contributors, /blog/contributors/list
		msg = "Not implemented yet.  Eventually, you'll get the picture and bio."
		handler = undefined
	}
	return {msg, handler}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('cast') != -1) {
		return true
	}
	else if (lmsg.indexOf('host') != -1) {
		return true
	}
	else if (lmsg.indexOf('profile') != -1) {
		return true
	}
	else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}
