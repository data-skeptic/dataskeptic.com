import React from 'react'
var help = require('./help')
var store = require('./store')
var episode = require('./episodes')
var survey = require('./survey')
var profile = require('./profile')
var reminders = require('./reminders')
var yoshi = require('./yoshi')
var chatter = require('./chatter')
var shirt_size_picker = require('./short_size_picker')

var dialogs = [help, store, episode, survey, profile, reminders]

function get_reply(dispatch, reply, cstate, message) {
  var handler = cstate.handler
  var resp = undefined
  var responder = 'bot'
  var lmsg = message.text.toLowerCase()
  var n = cstate.store_nudges
  if (lmsg == 'exit') {
    msg = "Ok, let's talk about something new."
    handler = undefined
    responder = 'bot'
    resp = { msg, handler, responder }
  } else if (handler) {
    resp = handler(dispatch, reply, cstate, message)
  } else if (lmsg.indexOf('logo') > -1) {
    msg =
      'Here is our logo ![Data Skeptic](https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg)'
    resp = { handler, msg, responder }
  } else if (lmsg.indexOf('what would kyle say') > -1) {
    msg = "I'll need to give it some thought and get back to you."
    responder = 'kyle'
    resp = { handler, msg, responder }
  } else {
    var handled = false
    for (var dialog of dialogs) {
      if (!handled && dialog.can_handle(message, cstate, reply)) {
        handler = dialog.handler
        msg = dialog.get_opening_remark(dispatch, reply)
        resp = { handler, msg, responder }
        handled = true
      }
    }
    if (!handled && n < 3 && Math.random() < 0.35) {
      if (n == 0) {
        var msg = chatter.get_message('ROOT>SHIRT0')
        resp = { handler, msg, responder }
      } else if (n == 1) {
        var msg = chatter.get_message('ROOT>SHIRT1')
        resp = { handler, msg, responder }
      } else if (n == 2) {
        var msg = chatter.get_message('ROOT>SHIRT2')
        resp = { handler: shirt_size_picker.handler, msg, responder }
      }
      dispatch({ type: 'STORE_NUDGE_INCR' })
    }
    if (resp == undefined) {
      var msg = chatter.get_message('ROOT>GENERAL')
      resp = { handler, msg, responder }
    }
  }
  if (resp) {
    console.log(resp)
    var msg = resp.msg
    if (msg != undefined) {
      var responder = resp.responder || 'bot'
      reply({ text: msg }, responder)
    } else {
      // This should only occur when the dialog has made an async call
      // If the user types something while we wait, the default handler should route
      // When the callback arrives, the response utterance will occur, and the handler will be set/overwritten then
    }
    var payload = resp.payload
    if (payload) {
      var note = payload.note
      var obj = payload.obj
      if (note == undefined || obj == undefined) {
        console.log('WRONG FORMAT!!!!')
      } else {
        dispatch({ type: 'SET_PAYLOAD', payload })
      }
    }
    var handler = resp.handler
    dispatch({ type: 'SET_HANDLER', handler })
  } else {
    handler = undefined
    msg = 'Sorry, something has gone wrong'
    resp = { handler, msg, responder }
  }
  var p = Math.random()
  if (p < 0.05) {
    if (!cstate.saw_yoshi) {
      setTimeout(function() {
        var msg = chatter.get_message('YOSHI>GREETING')
        reply({ text: msg }, 'yoshi')
        dispatch({ type: 'SAW_YOSHI' })
      }, 5000)
    }
  }
  /*
	setTimeout(function() {
		reply({text: "Still there?  Let me know what you think of the bot by DMing me on Slack!  I would appreciate your candid feedback"}, 'kyle')
		// still there?
	}, 1000 * 30)
	*/
}

module.exports = { get_reply }
