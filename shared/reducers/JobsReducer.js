import Immutable from 'immutable'
import Request from '../Request'

const init = {
  resume: {
    submitted: false,
    submitting: false,
    error: false,
    files: null
  }
}

const defaultState = Immutable.fromJS(init)

export default function jobReducer(state = defaultState, action) {
  switch (action.type) {
    case 'UPLOAD_RESUME':
      state = state.setIn(['resume', 'files'], action.payload)
      break

    case 'SUBMIT_RESUME':
      state = state.setIn(['resume', 'submitted'], false)
      state = state.setIn(['resume', 'submitting'], true)
      state = state.setIn(['resume', 'error'], false)
      break

    case 'SUBMIT_RESUME_SUCCESS':
      state = state.setIn(['resume', 'submitted'], true)
      state = state.setIn(['resume', 'submitting'], false)
      state = state.setIn(['resume', 'error'], false)
      break

    case 'SUBMIT_RESUME_FAIL':
      state = state.setIn(['resume', 'submitted'], false)
      state = state.setIn(['resume', 'submitting'], false)
      state = state.setIn(['resume', 'error'], action.payload.error)
      break
  }

  return state
}

export const submitResume = (dispatch, data) => {
  dispatch({
    type: 'SUBMIT_RESUME'
  })

  Request.post('/api/v1/career', data)
    .then(res => {
      if (!res.data.success) {
        throw Error(res.data.error)
      }

      dispatch({
        type: 'SUBMIT_RESUME_SUCCESS',
        payload: {
          data: res.data
        }
      })
    })
    .catch(error =>
      dispatch({
        type: 'SUBMIT_RESUME_FAIL',
        payload: {
          error: error.message
        }
      })
    )
}
