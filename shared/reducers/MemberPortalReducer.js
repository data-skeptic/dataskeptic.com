import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"
import snserror from '../SnsUtil'

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
console.log(["MPR env", env])

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
        var dispatch = action.payload.dispatch
        var user = action.payload.user
    	var email = user.email
    	var data = {email}
    	var dispatch = action.payload.dispatch
    	var uri = base_url + '/members/check'
        axios
            .post(uri, data)
            .then(function(result) {
                console.log(result['data'])
                var msg = result['data']['msg']
            	if (result['data']['status'] == "ok") {
	        		var mode = "found"
		            dispatch({type: "UPDATE_MEMBERSHIP_MODE", payload: {mode, msg} })
            	} else {
	        		var mode = "not-found"
		            dispatch({type: "UPDATE_MEMBERSHIP_MODE", payload: {mode, msg} })
            	}
            })
            .catch((err) => {
                var errorMsg = JSON.stringify(err)
                console.log(errorMsg)
                snserror("CHECK_MEMBERSHIP", errorMsg)
        		var mode = "not-found"
	            dispatch({type: "UPDATE_MEMBERSHIP_MODE", payload: {mode} })
            })
        break
    case 'UPDATE_MEMBERSHIP_MODE':
    	console.log("UPDATE_MEMBERSHIP_MODE")
        var mode = action.payload.mode
        nstate.mode = mode
    case 'CANCEL_MEMBERSHIP':
        console.log("CANCEL_MEMBERSHIP")
        ///axis api members/cancel
        break
    case 'CHANGE_MEMBERSHIP':
        console.log("CHANGE_MEMBERSHIP")
        ///members/upgrade
        break
  }
  return Immutable.fromJS(nstate)
}