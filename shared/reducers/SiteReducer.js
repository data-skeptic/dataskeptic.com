import Immutable from 'immutable'
import { fromJS } from 'immutable'

/**
 * Whenever some reducer initial state have been changed update current schema version
 * Unique version number is total count of commits in `master`
 */
export const SCHEMA_VER = 'v561';

const init = {
  title: "Data Skeptic - The intersection of data science, artificial intelligence, machine learning, statistics, and scientific skepticism",
  disqus_username: "dataskeptic",
  contact_form: {
      name: "",
      email: "",
      msg: "",
      error: "",
      send: "no"
    },
  contributors: {},
  slackstatus: "",

  schemaVersion: SCHEMA_VER,
}

const defaultState = Immutable.fromJS(init);

export default function siteReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'INITIALIZE_SITE':
      if (nstate.contact_form == undefined) {
        nstate.contact_form = {
          name: "",
          email: "",
          msg: "",
          error: "",
          send: "no"
        }
      }
      nstate.contact_form.send = "no"
      break
    case 'SET_CONTRIBUTORS':
      nstate.contributors = action.payload
      break
    case 'SET_TITLE':
    	nstate.title = action.payload
    	break
    case 'SLACK_UPDATE':
      var msg = action.payload.msg
      nstate.slackstatus = msg
      break;
    case 'UPDATE_CONTACT_FORM':
      if (action.payload.name != undefined) {
        nstate.contact_form.name = action.payload.name
      }
      if (action.payload.email != undefined) {
        nstate.contact_form.email = action.payload.email
      }
      if (action.payload.msg != undefined) {
        nstate.contact_form.msg = action.payload.msg
      }
      break;
    case 'CONTACT_FORM_ERROR':
      var error = action.payload.error
      nstate.contact_form.error = error
      nstate.contact_form.send = "no"
    case 'SET_SENDING':
      nstate.contact_form.send = "sending"
    case 'CONTACT_FORM_COMPLETE':
      var success = action.payload.success
      if (success) {
        nstate.contact_form.msg = ""
        nstate.contact_form.error = ""
        nstate.contact_form.send = "success"
      } else {
        nstate.contact_form.send = "error"
      }
      break
  }
  return Immutable.fromJS(nstate)
}
