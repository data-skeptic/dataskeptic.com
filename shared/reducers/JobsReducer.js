import Immutable from 'immutable'
import Request from '../Request'

const init = {
  resume: {
    submitted: false,
    error: true,
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
      state = state.setIn(['resume', 'error'], false)
      break

    case 'SUBMIT_RESUME_SUCCESS':
      state = state.setIn(['resume', 'submitted'], true)
      state = state.setIn(['resume', 'error'], false)
      break

    case 'SUBMIT_RESUME_FAIL':
      state = state.setIn(['resume', 'submitted'], false)
      state = state.setIn(['resume', 'error'], action.payload.error)
      break
  }

  return state
}

export const submitResume = (dispatch, data) => {
  const files = [data.resume]
  Request.upload('/api/v1/career/upload', files)
    .then(res => {
      if (!res.success) {
        throw Error(res.error)
      }
      
      data.resume = res.data.files[0]

      return Request.post('/api/v1/career', data)
    })
    .then(res =>
      dispatch({
        type: 'SUBMIT_RESUME_SUCCESS',
        payload: {
          data: res.data
        }
      })
    )
    .catch(error =>
      dispatch({
        type: 'SUBMIT_RESUME_FAIL',
        payload: {
          error
        }
      })
    )
}
