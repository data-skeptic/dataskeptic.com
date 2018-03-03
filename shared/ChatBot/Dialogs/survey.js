var chatter = require("./chatter")

function get_opening_remark(dispatch) {
	var msg = chatter.get_message("SURVEY>WELCOME")
	var payload = {}
	dispatch({type: "START_SURVEY", payload })
	return msg
}

function handler(dispatch, reply, cstate, message) {
	if (cstate.did_survey) {
		var msg = chatter.get_message("SURVEY>FINISHED_BEFORE")
		var handler = undefined
		return {msg, handler}
	}

	var survey = cstate.survey
	var question_id = survey.nextQuestionId

	if (survey.surveyStart == 0) {
		dispatch({type: "SURVEY_QUESTION", dispatch, reply})
		return {msg, handler}
	} else {
		var msg = "Working survey!"
		var handler = undefined
		return {msg, handler}		
	}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('survey') != -1) {
		return true
	} else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}
/*


			else if (userHasProvidedAResponse && (session.userData.survey.surveyStart == 1)) {
				console.log('Handling response.')// for testing
				var next_question_id = session.userData.survey.nextQuestionId
				var magic_text = "";
	            var response_id = session.userData.survey.responseId
				var question_order = session.userData.survey.questionOrder
				console.log('** next_question_id is '+ next_question_id)
				console.log('** question_order is ' + question_order)
				console.log('** response_id is', response_id)
				console.log('** answer_text is', answer_text)

				if (question_id != -1) {
					var result_from_post = record_answer_to_database(response_id, next_question_id, question_order, answer_text)
					result_from_post.then(function(result) { 
						magic_text = result.magic_text
						next_question_id = result.next_question_id
						session.userData.survey.responseId = result.response_id
						if (magic_text) {
						    session.send(magic_text)
						}
					    return next_question_id
	                }).then(function(next_question_id) {   
	        	        session.userData.survey.nextQuestionId = next_question_id
						session.userData.survey.questionOrder += 1

						var surveyIsComplete = false

						if (session.userData.survey.nextQuestionId == -1) {
							surveyIsComplete = true
							console.log('** the survey is complete, since the next question id is -1.')// for testing.
						}
						if (surveyIsComplete) {
							var resp = chatter.get_message('SURVEY>FINISH')
							session.userData.survey.surveyIsComplete = true
							session.send(resp)
							var after_dialog = chatter.get_message("AFTER_SUBDIALOG")
							session.endConversation(after_dialog)
							// TODO: update `response_end_time`
						} else {
							console.log('** The next_question_id is '+String(session.userData.survey.nextQuestionId))
					        var promise = get_question_text(session.userData.survey.nextQuestionId)
					        var question_text = Promise.resolve(promise)
					        promise.then(function(result) { 
					            resp = result 
						        session.send(result) // send the current question to user 
						    })							
						}
					}).catch(function(err) {
						console.log(err)
						session.userData.survey = undefined
						session.endConversation("Arg, something has failed in my codebase.  Please excuse me.  I'll try to get debugged soon.")
					})
				}
			}
		*/