import Immutable from 'immutable';
import { fromJS } from 'immutable';
import axios from 'axios';

const init = {
  title: "Data Skeptic - The intersection of data science, artificial intelligence, machine learning, statistics, and scientific skepticism",
  disqus_username: "dataskeptic",
  contact_form: {
      name: "",
      email: "",
      msg: "",
      error: "",
      send: "no"
    }
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
    case 'SET_TITLE':
    	nstate.title = action.payload
    	break
    case 'JOIN_SLACK':
    	var email = action.payload.email
    	var token = "xoxp-19947165442-19941030020-121611496710-bf41ccd65d6a07734513bf77f5d730fa"
		var req = {email: email, token: token, set_active: true}
    	console.log(req)
		axios
			.post("https://dataskeptic.slack.com/api/users.admin.invite", req)
			.then(function(resp) {
			  console.log(resp)
			})
			.catch(function(err) {
			  console.log("slack error")
			  console.log(err)
			})
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
    case 'CONTACT_FORM':
      var data = nstate.contact_form
      var msg = action.payload.msg
      if (msg != undefined) {
        data.msg = msg
      }
      var email = action.payload.email
      if (email != undefined) {
        data.email = email
      }
      var url = "https://obbec1jy5l.execute-api.us-east-1.amazonaws.com/prod/contact"
      var error = ""
      nstate.contact_form.send = "sending"
      var me = this
      axios
        .post(url, JSON.stringify(data))
        .then(function(result) {
          console.log(result)
          nstate.contact_form.msg = ""
          nstate.contact_form.error = ""
          nstate.contact_form.send = "success"
        })
        .catch(function (err) {
          console.log(err)
          nstate.contact_form.send = "error"
        });
  }
  return Immutable.fromJS(nstate)
}
