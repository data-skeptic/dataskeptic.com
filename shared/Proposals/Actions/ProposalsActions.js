import axios from 'axios'
import { push } from 'redux-react-router'

export const FETCH_CURRENT_PROPOSAL_REQUEST = 'FETCH_CURRENT_PROPOSAL_REQUEST'
export const FETCH_CURRENT_PROPOSAL_SUCCESS = 'FETCH_CURRENT_PROPOSAL_SUCCESS'
export const FETCH_CURRENT_PROPOSAL_FAIL = 'FETCH_CURRENT_PROPOSAL_FAIL'

export const PROPOSAL_DEADLINE_REACHED = 'PROPOSAL_DEADLINE_REACHED'
export const PROPOSAL_SET_BUCKET = 'PROPOSAL_SET_BUCKET'
export const AUTHORIZE = 'AUTHORIZE'
export const LOG_OUT = 'LOG_OUT'

export function fetchCurrentProposal() {
  return dispatch => {
    dispatch(fetchCurrentProposalRequest())

    axios
      .get('/api/v1/rfc/list')
      .then(res => dispatch(fetchCurrentProposalSuccess(res.data)))
      .catch(err => dispatch(fetchCurrentProposalFail(err)))
  }
}
export function authorize(hasAccess) {
  return dispatch => {
    dispatch({ type: AUTHORIZE, payload: { hasAccess } })
    // dispatch(push('/rfc'))
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}

export function fetchCurrentProposalRequest(meta) {
  return {
    type: FETCH_CURRENT_PROPOSAL_REQUEST,
    payload: {
      meta
    }
  }
}

export function fetchCurrentProposalSuccess(data) {
  return {
    type: FETCH_CURRENT_PROPOSAL_SUCCESS,
    payload: {
      data
    }
  }
}

export function fetchCurrentProposalFail(error) {
  return {
    type: FETCH_CURRENT_PROPOSAL_FAIL,
    payload: {
      error
    }
  }
}
export function proposalDeadlineReached() {
  return {
    type: PROPOSAL_DEADLINE_REACHED
  }
}
