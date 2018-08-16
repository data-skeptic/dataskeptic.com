import Immutable, { fromJS } from 'immutable'
import axios from 'axios'

const init = {
  loading: false,
  loaded: false,
  poll_id: null,
  user_id: null,
  question: '',
  results: [],
  total_votes: null,
  post_results: [],
  isViewResult: false
}

const defaultState = Immutable.fromJS(init)

export const getPoll = async (dispatch, poll_id, user_id) => {
  try {
    const pollInfo = await axios.get(`/api/v1/poll?poll_id=${poll_id}&user_id=${user_id}`)
    dispatch({
      type: 'GET_POLL_SUCCESS',
      payload: {
        poll_id: pollInfo.data.poll_id,
        question: pollInfo.data.question,
        results: pollInfo.data.responses,
        total_votes: pollInfo.data.total_votes
      }
    })
  } catch (err) {
    dispatch({
      type: 'GET_POLL_FAIL',
      payload: {
        data: err
      }
    })
  }
}

export const votePoll = async (dispatch, data) => {
  try {
    const pollInfo = await axios.post('/api/v1/poll/vote', data)
    dispatch({
      type: 'POST_POLL_SUCCESS',
      payload: {
        dispatch,
        post_results: pollInfo.data,
        poll_id: pollInfo.data[0].poll_id
      }
    })
  } catch (err) {
    dispatch({
      type: 'POST_POLL_FAIL',
      payload: {
        data: err
      }
    })
  }
}

export default function pollReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch (action.type) {
    case 'GET_POLL':
      nstate.loaded = false
      nstate.loading = true
      nstate.error = null
      nstate.poll_id = action.payload.poll_id
      nstate.user_id = action.payload.user_id
      nstate.results = [];
      getPoll(action.payload.dispatch, action.payload.poll_id, action.payload.user_id)
      break
    
    case 'GET_POLL_SUCCESS':
      nstate.loaded = true
      nstate.loading = false
      nstate.poll_id = action.payload.poll_id
      nstate.question = action.payload.question
      nstate.results = action.payload.results
      nstate.total_votes = action.payload.total_votes
      break
    
    case 'GET_POLL_FAIL':
      nstate.loaded = false
      nstate.loading = false
      nstate.error = action.payload.data
      break
    
    case 'POST_POLL':
      nstate.loaded = false
      nstate.loading = true
      nstate.error = null
      nstate.post_results = []
      votePoll(action.payload.dispatch, action.payload.data)
      break
    
    case 'POST_POLL_SUCCESS':
      nstate.loaded = true
      nstate.loading = false
      nstate.post_results = action.payload.post_results
      nstate.poll_id = action.payload.poll_id
      if (nstate.user_id === null) nstate.user_id = -1
      getPoll(action.payload.dispatch, nstate.poll_id, nstate.user_id)
      break
    
    case 'POST_POLL_FAIL':
      nstate.loaded = false
      nstate.loading = false
      nstate.error = action.payload.data
      break
    
    case 'VIEW_POLL_RESULT':
      nstate.isViewResult = true
      break
  }
  return Immutable.fromJS(nstate)
}
