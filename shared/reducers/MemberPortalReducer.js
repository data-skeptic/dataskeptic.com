import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"

var env='dev'


var base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

function sns_error(location, msg) {
    console.log({location, msg})
}

const init = {
	mode: "loading"
}

const defaultState = Immutable.fromJS(init);

export default function memberPortalReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'CHECK_MEMBERSHIP':
    console.log("CM!")
        //Start checking api
        //Call API to link login to member link.
        //If not found, report and do SNS message
        //this.state.mode == "not-found"
    	nstate.from = action.payload
    	var email = action.payload
    	console.log(email)
    	break
  }
  return Immutable.fromJS(nstate)
}