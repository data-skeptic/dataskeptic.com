var chatter = require("./chatter")
var stringSimilarity = require('string-similarity');

var store    = require("./store")
var episode  = require("./episodes")
var survey   = require("./survey")
var profiles = require("./profile")

var help_menu = [
	{label: "episode recommendations", handler: episode.handler, get_opening_remark: episode.get_opening_remark}, 
	{label: "listener survey", handler: survey.handler, get_opening_remark: survey.get_opening_remark},
	{label: "store", handler: store.handler, get_opening_remark: store.get_opening_remark},
	{label: "profiles", handler: profiles.handler, get_opening_remark: profiles.get_opening_remark}
]

function get_opening_remark(dispatch, reply, cstate) {
	var msg = chatter.get_message("HELP>TRY_CHOICES")
	var first = true
	for (var item of module.exports.help_menu) {
		if (first) {
			first = false
			msg += " " + item['label']
		} else {
			msg += ", " + item['label']
		}
	}
	return msg
}

function handler(dispatch, reply, cstate, message) {
	var imsg = message.text
	if (imsg.toLowerCase() == "exit") {
		var msg = chatter.get_message("HELP>BYE")
		var handler = undefined
		return {msg, handler}
	}
	for (var item of module.exports.help_menu) {
		var label = item['label']
		var similarity = stringSimilarity.compareTwoStrings(imsg, label)
		if (similarity > .5) {
			msg = item.get_opening_remark()
			handler = item['handler']
			return {msg, handler}
		}
	}
	var msg = "I didn't understand you.  Please try again or say 'exit' to give up on help."
	var handler = module.exports.help2
	return {msg, handler}
}

module.exports = { handler, get_opening_remark }


