import Immutable from 'immutable';
import { fromJS } from 'immutable';
import axios from 'axios';

const init = {
  title: "Data Skeptic - The intersection of data science, artificial intelligence, machine learning, statistics, and scientific skepticism",
  disqus_username: "dataskeptic"

}

const defaultState = Immutable.fromJS(init);

export default function siteReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'SET_TITLE':
    	nstate.title = action.payload
    	break;
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
  }
  return Immutable.fromJS(nstate)
}
