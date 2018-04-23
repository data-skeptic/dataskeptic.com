import axios from 'axios'

var chatter = require('./chatter')

var base_url = process.env.BASE_API

function get_opening_remark(dispatch, reply, cstate) {
  var msg = chatter.get_message('SURVEY>WELCOME')
  dispatch({ type: 'START_SURVEY', dispatch, reply })
  return msg
}

function handler(dispatch, reply, cstate, message) {
  if (cstate.survey.did_survey) {
    var msg = chatter.get_message('SURVEY>FINISHED_BEFORE')
    var handler = undefined
    return { msg, handler }
  }
  dispatch({ type: 'ASK_QUESTION', dispatch, reply })
  var msg = undefined
  var handler = module.exports.answer_question_handler
  return { msg, handler }
}

function can_handle(message, cstate, reply) {
  if (cstate.survey.did_survey) {
    var msg = chatter.get_message('SURVEY>FINISHED_BEFORE')
    reply({ text: msg }, 'bot')
    return false
  }
  var lmsg = message.text.toLowerCase()
  if (lmsg.indexOf('survey') != -1) {
    return true
  } else {
    return false
  }
}

function answer_question_handler(dispatch, reply, cstate, message) {
  dispatch({ type: 'ANSWER_AND_ASK_NEXT_QUESTION', message, dispatch, reply })
  var msg = undefined
  var handler = undefined
  return { msg, handler }
}

function save_answer(dispatch, reply, cstate, message) {
  return new Promise(function(resolve, reject) {
    var question_id = cstate.survey.nextQuestionId
    var answer_text = message.text
    var response_id = cstate.survey.responseId
    var question_order = cstate.survey.questionOrder
    var u = base_url + 'bot/survey/response/update'
    var req = { question_id, answer_text, question_order, response_id }
    axios
      .post(u, req)
      .then(function(result) {
        if ('error' in result.data) {
          reject(result.data.error)
        }
        var next_question_id = result.data.next_question_id
        var magic_text = result.data.magic_text
        resolve(result.data)
      })
      .catch(function(err) {
        console.log(
          '** something is wrong in calling record_answer_to_database and ' +
            err
        )
        reject(err)
      })
  })
}

module.exports = {
  handler,
  get_opening_remark,
  can_handle,
  answer_question_handler,
  save_answer
}
