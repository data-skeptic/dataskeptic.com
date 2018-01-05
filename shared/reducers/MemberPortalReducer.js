import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"
import snserror from '../SnsUtil'

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
console.log(["MPR env", env])

var base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

const init = {
	mode: "loading",
    update_member_msg: ""
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
        var email = action.payload.email
        var dispatch = action.payload.dispatch
        var uri = base_url + '/members/cancel'
        axios
            .post(uri, {email})
            .then(function(result) {
                console.log(result['data'])
                var status = result['data']['status']
                if (status == "ok") {
                    alert("Your membership has been cancelled.  Please allow 2-3 days for processing.")
                } else {
                    alert("An error has occurred.  Please email orders@dataskeptic.com")
                }
            })
            .catch((err) => {
                var errorMsg = JSON.stringify(err)
                console.log(errorMsg)
                var msg = "An error has occurred.  Please email orders@dataskeptic.com"
                dispatch({type: "UPDATE_MEMBERSHIP_MSG", payload: {msg} })
            })
        ///axis api members/cancel
        break
    case 'UPDATE_MEMBERSHIP_MSG':
        console.log("UPDATE_MEMBERSHIP_MSG")
        nstate.update_member_msg = action.payload.msg
        break
    case 'CHANGE_MEMBERSHIP':
        console.log("CHANGE_MEMBERSHIP")
        var email = action.payload.email
        var dispatch = action.payload.dispatch
        var uri = base_url + '/members/change'
        axios
            .post(uri, {email})
            .then(function(result) {
                console.log(result['data'])
                var status = result['data']['status']
                if (status == "ok") {
                    alert("Your membership has been cancelled.  Please allow 2-3 days for processing.")
                } else if (status == "not-implemented") {
                    alert("Hrmm.  Sorry, we didn't implement that yet!  You have two options 1) Cancel your current membership and re-subscribe 2) Contact orders@dataskeptic.com with your specific request and we can help.")
                } else {
                    alert("An error has occurred.  Please email orders@dataskeptic.com")
                }
            })
            .catch((err) => {
                var errorMsg = JSON.stringify(err)
                console.log(errorMsg)
            })
        ///axis api members/cancel
        break
  }
  return Immutable.fromJS(nstate)
}