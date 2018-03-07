import React from 'react';
var help      = require("./help")
var store     = require("./store")
var episode   = require("./episodes")
var survey    = require("./survey")
var profile   = require("./profile")
var reminders = require("./reminders")
var yoshi     = require("./yoshi")

export const dialogs = [help, store, episode, survey, profile, reminders]

// ga
// free sticker
// TODO: reminder backend
// TODO: survey


export default function get_reply(dispatch, reply, cstate, message) {
	var handler = cstate.handler
	var resp = undefined
	var responder = 'bot'
	var lmsg = message.text.toLowerCase()
	if (lmsg == 'exit') {
		msg = "Ok, let's talk about something new."
		handler = undefined
		responder = 'bot'
		resp = {msg, handler, responder}
	} else if (handler) {
		resp = handler(dispatch, reply, cstate, message)
	} else if (lmsg.indexOf('logo') > -1) {
		msg = 'Please implement support for markdown so that bot can triggerAction with images ![Our logo alt text](https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg)'
		resp = {handler, msg, responder}
	} else if (lmsg.indexOf('what would kyle say') > -1) {
		msg = "I'll need to give it some thought and get back to you."
		responder = 'kyle'
		resp = {handler, msg, responder}
	} else {
		for (var dialog of dialogs) {
			if (dialog.can_handle(message, cstate, reply)) {
				handler = dialog.handler
				msg = dialog.get_opening_remark(dispatch, reply)
				console.log([handler, msg])
				resp = {handler, msg, responder}				
			}
		}
		if (resp == undefined) {
			msg = 'Huh?'
			resp = {handler, msg, responder}
		}
	}
	if (resp) {
		console.log(resp)
		var msg = resp.msg
		if (msg != undefined) {
			var responder = resp.responder || 'bot'
			reply({text: msg}, responder)
		} else {
			// This should only occur when the dialog has made an async call
			// If the user types something while we wait, the default handler should route
			// When the callback arrives, the response utterance will occur, and the handler will be set/overwritten then
		}
		var payload = resp.payload
		if (payload) {
			console.log('payload')
			console.log(payload)
			var note = payload.note
			var obj  = payload.obj
			if (note == undefined || obj == undefined) {
				console.log("WRONG FORMAT!!!!")
			} else {
				dispatch({type: "SET_PAYLOAD", payload})
			}
		}
		var handler = resp.handler
		dispatch({type: "SET_HANDLER", handler })
	} else {
		handler = undefined
		msg = 'Sorry, something has gone wrong'
		resp = {handler, msg, responder}
	}
	var p = Math.random()
	if (p < .05) {
		if (!cstate.saw_yoshi) {
			setTimeout(function() {
				reply({text: "Tweet, tweet!  I'm Yoshi the bird."}, 'yoshi')
				dispatch({type: "SAW_YOSHI"})
			}, 5000)
		}
	}
	/*
	setTimeout(function() {
		recieveMessage({text: "Still there?  Let me know what you think of the bot by DMing me on Slack!  I would appreciate your candid feedback"}, 'kyle')
		// still there?
	}, 1000 * 30)
	*/
}
