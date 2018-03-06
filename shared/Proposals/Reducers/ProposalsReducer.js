import Immutable, { fromJS } from 'immutable'

import * as types from '../Constants/CommentTypes'
import {
  FETCH_CURRENT_PROPOSAL_REQUEST,
  FETCH_CURRENT_PROPOSAL_SUCCESS,
  FETCH_CURRENT_PROPOSAL_FAIL,
  PROPOSAL_DEADLINE_REACHED,
  PROPOSAL_SET_BUCKET,
  AUTHORIZE,
  LOG_OUT
} from '../Actions/ProposalsActions'

import {
  CHANGE_COMMENT_TYPE,
  UPLOAD_FILES,
  UPDATE_FILES,
  COMPLETE_RECORDING,
  REVIEW_RECORDING,
  RESET_COMPLETED_UPLOAD,
  RESET_COMPLETED_RECORDING,
  SUBMIT_COMMENT_FORM_REQUEST,
  SUBMIT_COMMENT_FORM_SUCCESS,
  SUBMIT_COMMENT_FORM_FAIL,
  RESET_SUBMIT
} from '../Actions/CommentBoxFormActions'

import { INIT, RECORDING } from '../../Recorder/Constants/steps'

import {
  RECORDING_FLOW_CHANGE_STEP,
  RECORDING_FLOW_RETURN,
  RECORDING_FLOW_RESET,
  RECORDING_FLOW_INIT_REQUEST,
  RECORDING_FLOW_INIT_SUCCESS,
  RECORDING_FLOW_INIT_FAIL,
  RECORDING_FLOW_READY_REQUEST,
  RECORDING_FLOW_READY_SUCCESS,
  RECORDING_FLOW_READY_FAIL,
  RECORDING_FLOW_RECORDING_START,
  RECORDING_FLOW_RECORDING_FINISH,
  RECORDING_FLOW_REVIEW,
  RECORDING_FLOW_SUBMIT_REQUEST,
  RECORDING_FLOW_SUBMIT_SUCCESS,
  RECORDING_FLOW_SUBMIT_FAIL,
  RECORDING_FLOW_COMPLETE,
  RECORDING_FLOW_FAIL
} from '../Actions/RecordingFlowActions'

const defaultState = {
  loading: false,
  aws_bucket: '',
  error: false,
  proposal: {},
  hasAccess: false,
  form: {
    step: INIT,
    error: {},
    type: types.TEXT,
    files: [],
    recording: null,
    submitted: false
  },
  review: {
    url: ''
  }
}

const initialState = fromJS(defaultState)

export default function ProposalsReducer(state = initialState, action) {
  let nstate = state.toJS()

  switch (action.type) {
    case FETCH_CURRENT_PROPOSAL_REQUEST:
      nstate.loading = true
      nstate.error = false
      break

    case FETCH_CURRENT_PROPOSAL_SUCCESS:
      nstate.loading = false
      nstate.error = false
      nstate.proposal = action.payload.data
      break

    case FETCH_CURRENT_PROPOSAL_FAIL:
      nstate.loading = false
      nstate.error = action.payload.error
      break

    case CHANGE_COMMENT_TYPE:
      if (nstate.form.type !== action.payload.type) {
        nstate.form.type = action.payload.type
      }

      break

    case RECORDING_FLOW_CHANGE_STEP:
      nstate.form.step = action.payload.nextStep
      break

    case RECORDING_FLOW_FAIL:
      nstate.form.error = action.payload.error
      break

    case UPLOAD_FILES:
      nstate.form.files = nstate.form.files.concat(action.payload.files)
      break

    case UPDATE_FILES:
      nstate.form.files = action.payload.files
      break

    case RESET_COMPLETED_UPLOAD:
      nstate.form.files = []
      break

    case RESET_COMPLETED_RECORDING:
      nstate.form.recording = null
      break

    case COMPLETE_RECORDING:
      nstate.form.recording = {
        id: action.payload.id
      }
      break

    case REVIEW_RECORDING:
      nstate.review = {
        url: action.payload.url
      }
      break

    case SUBMIT_COMMENT_FORM_REQUEST:
      nstate.form.submitted = false
      break

    case SUBMIT_COMMENT_FORM_SUCCESS:
      nstate.form.submitted = true
      break
    case SUBMIT_COMMENT_FORM_FAIL:
      nstate.form.error = action.payload.error
      break

    case PROPOSAL_DEADLINE_REACHED:
      if (nstate.proposal) {
        nstate.proposal.active = false
      }
      break

    case PROPOSAL_SET_BUCKET:
      nstate.aws_proposals_bucket = action.payload.aws_proposals_bucket
      break

    case AUTHORIZE:
      nstate.hasAccess = action.payload.hasAccess
      break
    case LOG_OUT:
      nstate.hasAccess = false
      break

    case RESET_SUBMIT:
      nstate.form.error = {}
      nstate.form.recording = null
      nstate.form.submitted = false
      nstate.review.url = ''
      break

    default:
      break
  }

  return fromJS(nstate)
}
