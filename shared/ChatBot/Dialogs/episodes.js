var chatter = require("./chatter")

var reminders = require("./reminders")

function get_opening_remark(dispatch) {
	return "What sort of topics are you interested in?"
}
function handler(dispatch, reply, cstate, message) {
	var query = message.text
	if (query == "exit") {
		var msg = "Sorry I couldn't help you find something."
		var handler = undefined
		return {msg, handler}		
	}
	dispatch({type: "GET_EP_RECOMMENDATION", query, dispatch, reply})
	var msg = undefined
	var handler = undefined
	return {msg, handler}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('survey') != -1) {
		return true
	} else {
		return false
	}
}

function make_recommendation_handler(dispatch, reply, cstate, message) {
	console.log('make_recommendation_handler')
	var blog = message.blog
	if (blog == undefined) {
		blog = verify_payload_is_blog(cstate.payload, dispatch, reply)
	}
	if (blog != undefined) {
		var title = blog.title
		var msg = `How about the episode "${title}"?  You can say 'play it', 'remind me', 'exit', or say another topic.`
	    var handler = module.exports.recommendation_action_handler
	    var note = "make_recommendation_handler"
	    var obj = blog
	    var payload = {note, obj}
	    console.log("returning")
	    return {msg, handler, payload}
	} else {
		dispatch({type: "BOT_FAILURE", reply, error_code: 5 })
		var msg = undefined
		var handler = undefined
		return {msg, handler}
	}
}

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

function recommendation_action_handler(dispatch, reply, cstate, message) {
	console.log('recommendation_action_handler')
	var lmsg = message.text.toLowerCase()
	var msg = "You can say 'play it', 'remind me', 'exit', or say another topic."
	var handler = module.exports.recommendation_action_handler
	if (lmsg == 'play it') {
		console.log('play it')
		console.log(cstate.payload)
		var blog = verify_payload_is_blog(cstate.payload, dispatch, reply)
		if (blog) {
			console.log('ok')
			console.log(blog)
			msg = "Ok, I'll play that now for you."
			handler = undefined
			var guid = blog.guid
			dispatch({type: "PLAY_EPISODE_FROM_GUID", guid, dispatch})
		} else {
			console.log('fail')
			msg = "Uh oh!"
			handler = undefined
		}
	}
	else if (lmsg == 'remind me') {
		var blog = verify_payload_is_blog(cstate.payload, dispatch, reply)
		if (blog) {
			msg = "Alright, I'll remind you to listen to this later."
			handler = reminders.handler
		} else {
			msg = "Uh oh!"
			handler = undefined
		}
	}
	else if (lmsg == 'exit') {
		msg = "Ok.  What should we talk about next?"
	}
	else {
		dispatch({type: "GET_EP_RECOMMENDATION", query: lmsg, dispatch, reply})
	}
	return {msg, handler}
}

function no_results_handler(dispatch, reply, cstate, message) {
	var msg = "I can't think of an episode related to that.  Suggest something else or type 'exit'"
	var handler = module.exports.handler
	return {msg, handler}
}

module.exports = {handler, get_opening_remark, can_handle, make_recommendation_handler, recommendation_action_handler, no_results_handler}
