// export default (dialogs, receivedMessage, reply, trigger) => {
//   const message = {
//     text: `You said "${receivedMessage.message.text}".`
//   }
//  
//   return reply(message)
// }

export default (dialogs, receivedMessage, reply, trigger) => {
  // session?
  const cstate = {
    message: {
      
    }
  }
  
  var handler = cstate.message.handler
  var resp = undefined
  var responder = 'bot'
  var lmsg = receivedMessage.plainText
  console.dir(receivedMessage)
  if (lmsg == 'exit') {
    msg = "Ok, let's talk about something new."
    handler = undefined
    responder = 'bot'
    resp = {msg, handler, responder}
  } else if (handler) {
    resp = handler(trigger, reply, cstate, message)
  } else if (lmsg.indexOf('logo') > -1) {
    msg = 'Please implement support for markdown so that bot can triggerAction with images ![Our logo alt text](https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg)'
    resp = {handler, msg, responder}
  } else if (lmsg.indexOf('what would kyle say') > -1) {
    msg = "I'll need to give it some thought and get back to you."
    responder = 'kyle'
    resp = {handler, msg, responder}
  } else {
    for (var dialog of dialogs) {
      if (dialog.can_handle(lmsg, cstate, reply)) {
        handler = dialog.handler
        msg = dialog.get_opening_remark(trigger, reply)
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
        trigger({type: "SET_PAYLOAD", payload})
      }
    }
    var handler = resp.handler
    trigger({type: "SET_HANDLER", handler })
  } else {
    handler = undefined
    msg = 'Sorry, something has gone wrong'
    resp = {handler, msg, responder}
  }
  // var p = Math.random()
  // if (p < .05) {
  //   if (!cstate.saw_yoshi) {
  //     setTimeout(function() {
  //       reply({text: "Tweet, tweet!  I'm Yoshi the bird."}, 'yoshi')
  //       trigger({type: "SAW_YOSHI"})
  //     }, 5000)
  //   }
  // }
}
