import axios from "axios"
import Immutable from 'immutable';
import io from 'socket.io-client';

var episodes = require("../Dialogs/episodes")
var surveyDialog = require("../Dialogs/survey")

/**
 * Action types
 */
export const READY = 'READY'
export const DESTROY = 'DESTROY'
export const ADD_MESSAGE = 'ADD_MESSAGE'

const init = {
    handler: undefined,
    survey: {did_survey: false, nextQuestionId: -1, questionOrder: 0, surveyStart: 0, responseId: -1},
    thinking: false,
    phone: undefined,
    email: undefined,
    reminder_time: undefined,
    store_issue: undefined,
    saw_yoshi: false,
    payload: {obj: undefined, note: undefined}
}

const defaultState = Immutable.fromJS(init);

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
const config = require('../../../config/config.json');
var base_url = config[env]['base_api'] + env + '/'

//?var url = c['api']
//?var url2 = c['api2'] + c['env'] + '/'
//var url = "http://0.0.0.0:3500/"
//var url2 = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/dev/"

let start_survey = function() {
    return new Promise(function(resolve, reject) {
        var u = base_url + 'bot/survey/response/start'
        console.log(u)
        axios.post(u, {})
        .then(function(result) {
            resolve(result)
        }).catch(function(err) {
            console.log(err)
            reject(err)
        })
    })
}

let get_question = function(question_id) {
    return new Promise(function(resolve, reject) {
        var url = base_url + 'bot/survey/question?question_id=' + question_id
        axios.get(url)
            .then(function(question) {
                resolve(question)
            })
            .catch(function(err) {
                    console.log("something is wrong when getting the question_text.")
                    console.log(err)
                    reject(err)
            });
        })
};

/**
 * Reducer
 */
export default function ChatbotReducer(state = defaultState, action) {
    var nstate = state.toJS()
    switch (action.type) {
        case 'SET_HANDLER':
            var handler = action.handler
            nstate.handler = handler
            break
        case 'START_SURVEY':
            // initialize and ask first question
            var dispatch = action.dispatch
            var reply = action.reply
            nstate.survey = {}
            nstate.survey.nextQuestionId = 1
            nstate.survey.questionOrder = 1
            nstate.survey.surveyStart = 0
            nstate.thinking = true
            var promise = start_survey().then(function(result) {
                var response_id = result.data['response_id']
                console.log('response_id=' + response_id)
                dispatch({type: "SET_SURVEY_RESPONSE_ID", response_id})
                dispatch({type: "ASK_QUESTION", dispatch, reply})
                dispatch({type: "BOT_DONE_THINKING"})
            }).catch(function(err) {
                console.log(err)
                var error_code = 10
                dispatch({type: "BOT_FAILURE", error_code, reply, dispatch})
            })
            Promise.resolve(promise)
            break
        case 'ASK_QUESTION':
            var dispatch = action.dispatch
            var reply = action.reply
            var next_question_id = action.next_question_id
            if (next_question_id != undefined) {
                nstate.survey.nextQuestionId = next_question_id
            }
            var survey = nstate.survey
            var question_id = survey.nextQuestionId
            nstate.thinking = true
            var promise = get_question(question_id).then(function(result) {
                var question = result.data
                var question_id = question['question_id']
                var question_text = question['question_text']
                var msg = question_text
                reply({text: msg}, 'bot')
                dispatch({type: "BOT_DONE_THINKING"})
                var handler = surveyDialog.answer_question_handler
                dispatch({type: "SET_HANDLER", handler})
            }).catch(function(err) {
                console.log(err)
                var error_code = 11
                dispatch({type: "BOT_FAILURE", error_code, reply, dispatch})
            })
            Promise.resolve(promise)
            break
        case 'BOT_DONE_THINKING':
            nstate.thinking = false
            break
        case 'BOT_FAILURE':
            var dispatch = action.dispatch
            nstate.thinking = false
            var error_code = action.error_code
            var reply = action.reply
            var msg = "Oh my.  I don't feel so well.  Could we not talk about this?  It hurts when the conversation comes to this point.  It's quite unpleasant to have an error_code " + error_code + ".  Be a pal and change the subject, ok?"
            // TODO: bot in pain image
            var responder = 'bot'
            reply({text: msg}, responder)
            break
        case 'ANSWER_AND_ASK_NEXT_QUESTION':
            var message = action.message
            var dispatch = action.dispatch
            var reply = action.reply
            var text = message.text
            nstate.thinking = true
            nstate.survey.questionOrder += 1
            var promise = surveyDialog.save_answer(dispatch, reply, nstate, message)
            promise.then(function(answer_response) {
                console.log('answer_response')
                console.log(answer_response)
                var magic_text = answer_response.magic_text
                if (magic_text != '') {
                    reply({text: magic_text}, 'bot')
                }
                var next_question_id = answer_response.next_question_id
                dispatch({type: "BOT_DONE_THINKING"})
                if (next_question_id == -1) {
                    dispatch({type: "SURVEY_COMPLETE", reply})
                } else {
                    dispatch({type: "ASK_QUESTION", dispatch, reply, next_question_id})
                }
            }).catch(function (err) {
                console.log(err)
                dispatch({type: "BOT_FAILURE", dispatch, reply, error_code: 12})
            })
            break
        case 'SURVEY_QUESTION':
            var dispatch = action.dispatch
            nstate.survey.surveyStart = 1
            break
        case 'SET_SURVEY_RESPONSE_ID':
            var response_id = action.response_id
            nstate.survey.responseId = response_id
            break
        case 'SURVEY_REPLY':
            nstate.thinking = false
            var responder = 'bot'
            var msg = action.msg
            var reply = action.reply
            reply({text: msg, responder})
            break
        case 'SURVEY_COMPLETE':
            action.reply({text: "That's the end of the survey.  Thank you for your input!"}, 'bot')
            nstate.survey.did_survey = true
            nstate.handler = undefined
            break
        case 'SAVE_PHONE_NUM':
            nstate.phone = action.phone_num
            break
        case 'SAVE_EMAIL':
            nstate.email = action.email
            break
        case 'SAVE_STORE_ISSUE':
            nstate.store_issue = action.store_issue
            break
        case 'GET_EP_RECOMMENDATION':
            var reply = action.reply
            var query = action.query
            var dispatch = action.dispatch
            var url = "/api/search?q=" + query
            axios
                .get(url)
                .then(function(result) {
                    var blogs = result['data']
                    // TODO: Move below into episodes
                    var resp = undefined
                    if (blogs.length > 0) {
                        var blog = undefined
                        for (var b of blogs) {
                            if (blog == undefined) {
                                if (b.prettyname.indexOf('/episodes/') == 0) {
                                    blog = b
                                }
                            }
                        }
                        if (blog) {
                            var message = {blog}
                            resp = episodes.make_recommendation_handler(dispatch, reply, nstate, message)
                        }
                    }
                    if (resp == undefined) {
                        var message = {text: query}
                        resp = episodes.no_results_handler(dispatch, reply, nstate, message)
                    }
                    var msg = resp.msg
                    var responder = 'bot'
                    var payload = resp.payload
                    if (payload) {
                        dispatch({type: 'SET_PAYLOAD', payload})
                    }
                    reply({text: msg}, responder)
                    var handler = resp.handler
                    dispatch({type: 'SET_HANDLER', handler})
                })
                .catch((err) => {
                    console.log(err)
                    dispatch({type: "BOT_FAILURE", dispatch, reply, error_code: 1 })
                })
            break
        case 'SET_PAYLOAD':
            console.log('SET_PAYLOAD')
            var payload = action.payload
            console.log(payload)
            nstate.payload = payload
            break
        case 'SET_REMINDER_TIME':
            var dt = action.dt
            nstate.reminder_time = dt
            break
        case 'SAW_YOSHI':
            nstate.saw_yoshi = true
            break

        case READY:
            break;
        case ADD_MESSAGE:
            break;
    }
    return Immutable.fromJS(nstate)
}

/***
 * Utils
 */
const nexRandomId = () => 1
let socket = null

/**
 * Actions
 */
export const ready = (email) => {
    const userId = email ? email : nexRandomId() // TODO::
      socket = io('http://localhost');
      socket.on('connect', function(){});
      socket.on('event', function(data){});
      socket.on('disconnect', function(){});

    return ({
	    type: READY
    })
}

export const destroy = () => {
	return ({
		type: DESTROY
	})
}

export const addMessage = ({ message, sent, author } ) => {
    const data = { message, sent, author }
    axios.post('/api/v1/message', data)

    return ({
	    type: ADD_MESSAGE
    })
}