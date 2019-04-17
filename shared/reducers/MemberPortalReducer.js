import Immutable from 'immutable'
import { fromJS } from 'immutable'
import querystring from 'querystring'
import axios from 'axios'

var env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

var base_url = 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/' + env

const init = {
  mode: 'loading',
  analytics: [],
  details: {
    email: '',
    member_since: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  },
  update_member_msg: '',
  address_msg: '',
  downloads: {
    loaded: false,
    loading: false,
    list: []
  }
}

const defaultState = Immutable.fromJS(init)

export default function memberPortalReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch (action.type) {
    case 'LOAD_MEMBER':
      var dispatch = action.payload.dispatch
      var email = action.payload.email
      var url = base_url + '/member?email=' + email
      axios
        .get(url)
        .then(function(result) {
          console.log(result)
          dispatch({ type: 'SET_MEMBER', payload: result.data })
        })
        .catch(err => {
          var errorMsg = JSON.stringify(err)
          console.log(errorMsg)
        })
      break
    case 'SET_MEMBER':
      nstate.details = action.payload
      break
    case 'CHECK_MEMBERSHIP':
      nstate.from = action.payload
      var email = action.payload.user.email
      var dispatch = action.payload.dispatch
      var user = action.payload.user
      var data = { email }
      var dispatch = action.payload.dispatch
      var uri = base_url + '/members/check'
      axios
        .post(uri, data)
        .then(function(result) {
          console.log('result')
          console.log(result)
          var msg = result['data']['msg']
          if (result['data']['status'] == 'ok') {
            var mode = 'found'
            dispatch({
              type: 'UPDATE_MEMBERSHIP_MODE',
              payload: { mode, msg }
            })
          } else {
            var mode = 'not-found'
            dispatch({
              type: 'UPDATE_MEMBERSHIP_MODE',
              payload: { mode, msg }
            })
          }
        })
        .catch(err => {
          var errorMsg = JSON.stringify(err)
          console.log(errorMsg)
          var mode = 'not-found'
          dispatch({
            type: 'UPDATE_MEMBERSHIP_MODE',
            payload: { mode }
          })
        })
      break
    case 'UPDATE_MEMBERSHIP_MODE':
      console.log('UPDATE_MEMBERSHIP_MODE')
      var mode = action.payload.mode
      nstate.mode = mode
      break
    case 'UPDATE_MEMBERSHIP_MSG':
      console.log('UPDATE_MEMBERSHIP_MSG')
      nstate.update_member_msg = action.payload.msg
      break
    case 'CHANGE_MEMBERSHIP':
      console.log('CHANGE_MEMBERSHIP')
      nstate.update_member_msg = 'Processing...'
      var email = action.payload.email
      var dispatch = action.payload.dispatch
      var uri = base_url + '/members/change'
      axios
        .post(uri, { email })
        .then(function(result) {
          console.log(result['data'])
          var status = result['data']['status']
          if (status == 'ok') {
            alert(
              'Your membership has been cancelled.  Please allow 2-3 days for processing.'
            )
          } else if (status == 'not-implemented') {
            alert(
              "Hrmm.  Sorry, we didn't implement that yet!  You have two options 1) Cancel your current membership and re-subscribe 2) Contact orders@dataskeptic.com with your specific request and we can help."
            )
          } else {
            alert('An error has occurred.  Please email orders@dataskeptic.com')
          }
        })
        .catch(err => {
          var errorMsg = JSON.stringify(err)
          console.log(errorMsg)
        })
      ///axis api members/cancel
      break
    case 'LOAD_MEMBER_ANALYTICS':
      var dispatch = action.payload.dispatch
      var url = base_url + '/members/analytics/list'
      axios
        .get(url)
        .then(function(result) {
          var data = result['data']
          dispatch({ type: 'SET_MEMBER_ANALYTICS', payload: data })
        })
        .catch(err => {
          console.log(err)
          var errorMsg = JSON.stringify(err)
        })
      break
    case 'SET_MEMBER_ANALYTICS':
      var data = action.payload
      nstate.analytics = data
      break
    case 'SAVE_MEMBERSHIP_ADDRESS':
      console.log('SAVE_MEMBERSHIP_ADDRESS')
      var dispatch = action.payload.dispatch
      var address = nstate.details
      var user = action.payload.user
      address['email'] = user.email
      var url = base_url + '/members/address/update'
      nstate.address_msg = 'Saving...'
      axios
        .post(url, address)
        .then(function(result) {
          console.log(result)
          dispatch({ type: 'SET_ADDRESS_MSG', payload: 'Saved' })
        })
        .catch(err => {
          console.log(err)
        })
      break
    case 'SET_ADDRESS_MSG':
      var msg = action.payload
      console.log(['SAG', msg])
      nstate.address_msg = msg
    case 'UPDATE_MEMBERSHIP_ADDRESS':
      console.log('UPDATE_MEMBERSHIP_ADDRESS')
      var field = action.payload.field
      var val = action.payload.val
      nstate.details[field] = val
      break
    case 'LOAD_MEMBER_DOWNLOADS':
      var dispatch = action.payload.dispatch
      nstate.downloads.loaded = false
      nstate.downloads.loading = true
      nstate.downloads.list = []
      console.log(address)
      axios
        .get('/api/v1/user/downloads', address)
        .then(result => {
          console.log(result.data)
          dispatch({
            type: 'LOAD_MEMBER_DOWNLOADS_SUCCESS',
            payload: { data: result.data }
          })
        })
        .catch(err => {
          console.log(err)
          dispatch({
            type: 'LOAD_MEMBER_DOWNLOADS_SUCCESS',
            payload: { data: [] }
          })
        })
      break
    case 'LOAD_MEMBER_DOWNLOADS_SUCCESS':
      console.log('action.payload')
      console.log(action.payload)
      nstate.downloads.loaded = true
      nstate.downloads.loading = false
      nstate.downloads.list = action.payload.data
      break
  }
  return Immutable.fromJS(nstate)
}
