import axios from "axios"

var chrono = require('chrono-node')

var chatter = require("./chatter")

var e164 = require('e164')
var assert = require('assert')

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
const config = require('../../../config/config.json');
var base_url = config[env]['base_api'] + env + "/"

function get_opening_remark(dispatch, reply, cstate) {
	return "Ok, reminders.  When would you like to get the reminder?"
}

function handler(dispatch, reply, cstate, message) {
    var lmsg = message.text.toLowerCase()
    var msg = ""
    var got_time = false
    console.log(lmsg)
    var dt = chrono.parseDate(lmsg) 
    if (dt == null) {
        msg = "I'm not sure when you mean.  Can you say it another way?  Maybe try 'tomorrow morning'.  Or say 'exit'"
        return {msg, handler}
    }
    console.log(['dt', dt])
    dispatch({type: "SET_REMINDER_TIME", dt})
    var got_time = true
    if (got_time) {
        msg = "Would you like a reminder via email or SMS?"
        handler = module.exports.channel_handler
    } else {
        msg = "I don't know how to interpret that.  Maybe say 'tomorrow'."
        handler = module.exports.handler
    }
    return {msg, handler}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('reminder') != -1) {
		return true
	} else {
		return false
	}
}

// TODO: remove this duplicate from here and episodes.js : one copy
function verify_payload_is_blog(payload, dispatch, reply) {
    if (payload == undefined) {
        dispatch({type: "BOT_FAILURE", reply, error_code: 2 })
        return undefined
    }
    var obj = payload.obj
    if (obj == undefined) {
        dispatch({type: "BOT_FAILURE", reply, error_code: 3 })
        return undefined
    }
    var blog_id = obj.blog_id
    if (blog_id == undefined) {
        dispatch({type: "BOT_FAILURE", reply, error_code: 4 })
        return undefined
    }
    // Confirmed
    return obj
}

function channel_handler(dispatch, reply, cstate, message) {
    console.log('channel_handler')
    var lmsg = message.text.toLowerCase()
    var msg = "You can say 'email', 'sms', or 'exit'"
    var payload = cstate.payload
    var handler = module.exports.handler
    var blog = verify_payload_is_blog(cstate.payload, dispatch, reply)
    if (blog) {
        if (lmsg == 'email') {
            msg = "What is your email address?"
            handler = module.exports.email_handler
        }
        else if (lmsg == 'sms') {
            msg = "What is your phone number?"
            handler = module.exports.sms_handler
        }
        else if (lmsg == 'exit') {
            msg = "Ok.  What should we talk about next?"
            handler = undefined
        }
    } else {
        dispatch({type: "BOT_FAILURE", reply, error_code: 6 })
        msg = "Darn!"
        handler = undefined
        return {msg, handler}
    }
    return {msg, handler}
}

function email_handler(dispatch, reply, cstate, message) {
    var lmsg = message.text.toLowerCase()
    if (lmsg == 'exit') {
        msg = "Ok, let's move on to something new"
        var handler = undefined
        return {msg, handler}
    }
    var email = undefined
    if (lmsg.includes('@')) {
        email = lmsg
        msg = "Ok, give me one moment to record that."
        dispatch({type: "SAVE_EMAIL", email})
        var contact_type = "Email"
        var contact_account = email
        var message2 = {contact_type, contact_account}
        return save_handler(dispatch, reply, cstate, message2)
    }
    var msg = "That address is invalid.  Please enter another or say 'exit'."
    var handler = module.exports.email_handler
    return {msg, handler}
}

function sms_handler(dispatch, reply, cstate, message) {
    var lmsg = message.text.toLowerCase()
    if (lmsg == 'exit') {
        msg = "Ok, let's move on to something new"
        handler = undefined
        return {msg, handler}
    }
    var phone_num = lmsg.replace(/[^0-9]/g, "");
    if(phone_num[0] != 1) {
        phone_num = "1" + phone_num
    }
    console.log(phone_num)
    try {
        assert.deepEqual({country: "United States", code: "US"}, e164.lookup(phone_num)); 
        phone_num = "+" + phone_num
        dispatch({type: "SAVE_PHONE_NUM", phone_num})
        var contact_type = "SMS" // "Email"
        var contact_account = phone_num // email
        var message2 = {contact_type, contact_account}
        return save_handler(dispatch, reply, cstate, message2)
    } 
    catch(err){
        // Error handled below
    }
    var msg = "That phone number seems to be invalid.  Please try again or say 'exit'"
    var handler = module.exports.sms_handler
    return {msg, handler}
}

function save_handler(dispatch, reply, cstate, message) {
    console.log('save_hander')
    var contact_type = message.contact_type
    var contact_account = message.contact_account
    var reminder_time = cstate.reminder_time
    var episode_link = ''
    var episode_title = ''
    var payload = cstate.payload
    var blog = verify_payload_is_blog(payload, dispatch, reply)
    if (blog) {
        episode_link = "https://dataskeptic.com/blog" + blog.prettyname
        episode_title = blog.title
    }
    
    var url = base_url + "bot/reminders/save"
    var data = {
        "contact_type": contact_type, 
        "contact_account": contact_account,
        "reminder_time": reminder_time,
        "episode_link": episode_link,
        "episode_title": episode_title
    }
    console.log(url)
    axios
        .post(url, data)
        .then(function(result) {
            console.log('Seeming success setting listener reminder.')
            reply({text: "Ok, recorded"}, 'bot')
        })
        .catch(function(err) {
            reply({text: "Darn, I wasn't able to save that.  Sorry!  You found a bug!"}, 'bot')
        });
    var msg = "Ok, give me one moment to record that."
    var handler = undefined
    return {msg, handler}
}

module.exports = {handler, get_opening_remark, can_handle, sms_handler, email_handler, channel_handler, save_handler}
