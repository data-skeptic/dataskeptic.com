import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"
import snserror from '../SnsUtil'

var env='dev'


var base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

const init = {
	mode: "loading"
}

const defaultState = Immutable.fromJS(init);

export default function memberPortalReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'CHECK_MEMBERSHIP':
	    console.log("Checking membership")
    	nstate.from = action.payload
    	var email = action.payload
    	var data = {email}
    	var dispatch = action.payload.dispatch
    	console.log(email)
    	var uri = base_url + '/members/check'
        axios
            .get(uri, data)
            .then(function(result) {
            	if (result['status'] == "ok") {
	        		var mode = "found"
		            dispatch({type: "UPDATE_MEMBERSHIP_MODE", payload: {mode} })
            	} else {
	        		var mode = "not-found"
		            dispatch({type: "UPDATE_MEMBERSHIP_MODE", payload: {mode} })
            	}
            })
            .catch((err) => {
                var errorMsg = JSON.stringify(err)
                snserror("CHECK_MEMBERSHIP", errorMsg)
        		var mode = "not-found"
	            dispatch({type: "UPDATE_MEMBERSHIP_MODE", payload: {mode} })
            })
        break
    case 'UPDATE_MEMBERSHIP_MODE':
    	console.log("UPDATE_MEMBERSHIP_MODE")
  }
  return Immutable.fromJS(nstate)
}