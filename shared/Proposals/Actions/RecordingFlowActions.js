import axios from 'axios'
import { steps } from '../../Recorder'

/**
 * Recording flow
 *
 * 0. INIT - initialize
 * 1. READY - browser recording supported | ERROR - browser doesn't support recording
 * 2. RECORDING - user recording
 * 4. UPLOADING - server uploading
 * 4. REVIEW - user able to review recording or try to record again.
 * 5. SUBMITTING - user submit recording
 * 6. COMPLETE - user successfully submitted record | ERROR - server response with error message
 */
export const RECORDING_FLOW_CHANGE_STEP = 'RECORDING_FLOW_CHANGE_STEP'
export const RECORDING_FLOW_RETURN = 'RECORDING_FLOW_RETURN'
export const RECORDING_FLOW_RESET = 'RECORDING_FLOW_RESET'

export const RECORDING_FLOW_INIT_REQUEST = 'RECORDING_FLOW_INIT_REQUEST'
export const RECORDING_FLOW_INIT_SUCCESS = 'RECORDING_FLOW_INIT_SUCCESS'
export const RECORDING_FLOW_INIT_FAIL = 'RECORDING_FLOW_INIT_FAIL'

export const RECORDING_FLOW_READY_REQUEST = 'RECORDING_FLOW_READY_REQUEST'
export const RECORDING_FLOW_READY_SUCCESS = 'RECORDING_FLOW_READY_SUCCESS'
export const RECORDING_FLOW_READY_FAIL = 'RECORDING_FLOW_READY_FAIL'

export const RECORDING_FLOW_RECORDING_START = 'RECORDING_FLOW_RECORDING_START'
export const RECORDING_FLOW_RECORDING_FINISH = 'RECORDING_FLOW_RECORDING_FINISH'

export const RECORDING_FLOW_REVIEW = 'RECORDING_FLOW_REVIEW'

export const RECORDING_FLOW_UPLOADING_REQUEST =
  'RECORDING_FLOW_UPLOADING_REQUEST'
export const RECORDING_FLOW_UPLOADING_SUCCESS =
  'RECORDING_FLOW_UPLOADING_SUCCESS'
export const RECORDING_FLOW_UPLOADING_FAIL = 'RECORDING_FLOW_UPLOADING_FAIL'

export const RECORDING_FLOW_SUBMIT_REQUEST = 'RECORDING_FLOW_SUBMIT_REQUEST'
export const RECORDING_FLOW_SUBMIT_SUCCESS = 'RECORDING_FLOW_SUBMIT_SUCCESS'
export const RECORDING_FLOW_SUBMIT_FAIL = 'RECORDING_FLOW_SUBMIT_FAIL'

export const RECORDING_FLOW_COMPLETE = 'RECORDING_FLOW_COMPLETE'

export const RECORDING_FLOW_FAIL = 'RECORDING_FLOW_FAIL'

const STEP_CHANGIN_DELAY = 1000
/**
 * STEPS CONTROL
 **/
export function changeStep(nextStep) {
  return {
    type: RECORDING_FLOW_CHANGE_STEP,
    payload: {
      nextStep
    }
  }
}

export function reset() {
  return dispatch => {
    dispatch({
      type: RECORDING_FLOW_RESET
    })

    dispatch(init())
  }
}

/**
 * INIT
 */
export function init() {
  return dispatch => {
    dispatch(initRequest())

    dispatch(changeStep(steps.INIT))
  }
}

export function initRequest() {
  return {
    type: RECORDING_FLOW_INIT_REQUEST
  }
}
export function initSuccess() {
  return {
    type: RECORDING_FLOW_INIT_SUCCESS
  }
}
export function initError() {
  return {
    type: RECORDING_FLOW_INIT_FAIL
  }
}

/**
 * READY
 */
export function ready(noDelay) {
  return dispatch => {
    dispatch(readyRequest())
    const delay = noDelay ? 300 : STEP_CHANGIN_DELAY
    setTimeout(() => dispatch(changeStep(steps.READY)), 300)
  }
}

export function readyRequest() {
  return {
    type: RECORDING_FLOW_READY_REQUEST
  }
}

export function readySuccess() {
  return {
    type: RECORDING_FLOW_READY_SUCCESS
  }
}

export function readyError() {
  return {
    type: RECORDING_FLOW_READY_FAIL
  }
}

/**
 * RECORDING
 */
export function recordingStart() {
  return dispatch => {
    dispatch({
      type: RECORDING_FLOW_RECORDING_START
    })

    dispatch(changeStep(steps.RECORDING))
  }
}

export function recordingFinish(id) {
  return dispatch => {
    dispatch({
      type: RECORDING_FLOW_RECORDING_FINISH
    })

    dispatch(upload(id))
  }
}

export function upload(id) {
  return dispatch => {
    dispatch(changeStep(steps.UPLOADING))
    dispatch(uploadRequestRequest(id))

    const reqDelay = 500
    const isUploadedUrl = `/api/v1/recording/ready?id=${id}`

    return new Promise((res, rej) => {
      function checkUpload() {
        console.log('checkUpload', id)
        axios
          .get(isUploadedUrl)
          .then(res => res.data)
          .then(({ ready }) => {
            if (ready) {
              setTimeout(() => dispatch(uploadRequestSuccess()), reqDelay)
              res()
            } else {
              setTimeout(() => checkUpload(), reqDelay)
            }
          })
          .catch(err => {
            setTimeout(() => dispatch(uploadRequestFail(err)), reqDelay)
            rej()
          })
      }

      checkUpload()
    })
  }
}

export function uploadRequestRequest(id) {
  return {
    type: RECORDING_FLOW_UPLOADING_REQUEST,
    payload: {
      id
    }
  }
}
export function uploadRequestSuccess(data) {
  return dispatch => {
    dispatch({
      type: RECORDING_FLOW_UPLOADING_SUCCESS,
      payload: {
        data
      }
    })

    dispatch(changeStep(steps.REVIEW))
  }
}

export function uploadRequestFail(error) {
  return {
    type: RECORDING_FLOW_UPLOADING_FAIL,
    payload: {
      error
    }
  }
}

/**
 * REVIEW
 **/
export function review() {
  return dispatch => {
    dispatch({
      type: RECORDING_FLOW_REVIEW
    })

    dispatch(changeStep(steps.SUBMITTING))
  }
}

/**
 * SUBMITTING
 */
export function submitting() {
  return dispatch => {
    dispatch(changeStep(steps.SUBMITTING))
  }
}

/**
 * COMPLETE
 */
export function complete() {
  return dispatch => {
    dispatch(changeStep(steps.COMPLETE))
  }
}

/**
 * ERROR
 */
export function fail(error) {
  return dispatch => {
    dispatch({
      type: RECORDING_FLOW_FAIL,
      payload: {
        error
      }
    })

    dispatch(changeStep(steps.ERROR))
  }
}
