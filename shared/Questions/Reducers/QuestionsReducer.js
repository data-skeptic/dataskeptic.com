import Immutable, { fromJS } from 'immutable'
import { INIT } from '../../Recorder/Constants/steps'

import {
  COMPLETE_RECORDING,
  REVIEW_RECORDING,
  RESET_COMPLETED_RECORDING
} from '../../Proposals/Actions/CommentBoxFormActions'
import {
  RECORDING_FLOW_CHANGE_STEP,
  RECORDING_FLOW_FAIL
} from '../../Proposals/Actions/RecordingFlowActions'

const defaultState = {
  loading: false,
  aws_bucket: '',
  error: false,
  form: {
    step: INIT,
    error: {},
    recording: null,
    submitted: false
  },
  review: {
    url: ''
  }
}

const initialState = fromJS(defaultState)

export default function QuestionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECORDING_FLOW_CHANGE_STEP:
      state = state.setIn(['form', 'step'], fromJS(action.payload.nextStep))
      return state
    case RECORDING_FLOW_FAIL:
      state = state.setIn(['form', 'error'], fromJS(action.payload.error))
      return state
    case COMPLETE_RECORDING:
      state = state.setIn(['form', 'recording'], action.payload.id)
      return state
    case REVIEW_RECORDING:
      state = state.setIn(['review', 'url'], action.payload.url)
      return state
    default:
      return state
  }
}
