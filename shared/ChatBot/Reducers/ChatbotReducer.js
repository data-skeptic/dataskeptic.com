import axios from "axios"
import Immutable from 'immutable';
import {fromJS} from 'immutable';

var episodes = require("../Dialogs/episodes")

const init = {
    handler: undefined,
    did_survey: false,
    survey: undefined,
    thinking: false,
    payload: {obj: undefined, note: undefined}
}

const defaultState = Immutable.fromJS(init);

//?var url = c['api']
//?var url2 = c['api2'] + c['env'] + '/'
var url = "http://0.0.0.0:3500/"
var url2 = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/dev/"

let start_survey = function() {
    return new Promise(function(resolve, reject) {
        var u = url2 + 'bot/survey/response/start'
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

let get_question_text = function(question_id) {
    return new Promise(function(resolve, reject) {
        axios.get(url+'survey/question/'+String(question_id))
            .then(function(result) {
                console.log('** Get question text successfully.')
                console.log(" ** question_is and question_text are ", question_id, result.data.question_text)
                resolve(result.data.question_text)
            })
            .catch(function(err) {
                    console.log("something is wrong when getting the question_text.")
                    console.log(err)
                    reject(err)
            });
        })
};

export default function ChatbotReducer(state = defaultState, action) {
    var nstate = state.toJS()
    switch (action.type) {
        case 'SET_HANDLER':
            var handler = action.handler
            nstate.handler = handler
            break
        case 'START_SURVEY':
            nstate.survey = {}
            nstate.survey.nextQuestionId = 1
            nstate.survey.questionOrder = 1
            nstate.survey.surveyStart = 0
            break
        case 'SURVEY_QUESTION':
            var dispatch = action.dispatch
            nstate.survey.surveyStart = 1
            nstate.thinking = true
            var promise1 = start_survey().then(function(result) {
                console.log("RETURNED")
                console.log(result.data)
                var response_id = result.data['response_id']
                console.log(response_id)
                dispatch({type: "SET_SURVEY_RESPONSE_ID", response_id})
                var promise2 = get_question_text(nstate.survey.nextQuestionId)
                promise2.then(function(msg) {
                    console.log("Sending text: " + msg)
                    dispatch({type: "SURVEY_REPLY", msg, reply})
                })
            })
            Promise.resolve(promise1)
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
            nstate.did_survey = true
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
                    dispatch({type: "BOT_FAILURE", reply, error_code: 1 })
                })
            break
        case 'SET_PAYLOAD':
            console.log('SET_PAYLOAD')
            var payload = action.payload
            console.log(payload)
            nstate.payload = payload
            break
        case 'BOT_FAILURE':
            var error_code = action.error_code
            var reply = action.reply
            var msg = "Oh my.  I don't feel so well.  Could we not talk about this?  It hurts when the conversation comes to this point.  It's quite unpleasant to have an error_code " + error_code + ".  Be a pal and change the subject, ok?"
            // TODO: bot in pain image
            var responder = 'bot'
            reply({text: msg}, responder)
            break
    }
    return Immutable.fromJS(nstate)
}
