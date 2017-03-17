import {steps as RECORDING_STEPS} from '../../Recorder';

/**
 * Recording flow
 *
 * 0. INIT - initialize
 * 1. READY - browser recording supported | ERROR - browser doesn't support recording
 * 2. RECORDING -
 * 3. REVIEW - user able to review recording or try to record again.
 * 4. SUBMITTING - user submit recording
 * 5. COMPLETE - user successfully submitted record | ERROR - server response with error message
 */
export const RECORDING_FLOW_CHANGE_STEP = 'RECORDING_FLOW_CHANGE_STEP';
export const RECORDING_FLOW_RETURN = 'RECORDING_FLOW_RETURN';
export const RECORDING_FLOW_RESET = 'RECORDING_FLOW_RESET';

export const RECORDING_FLOW_INIT_REQUEST = 'RECORDING_FLOW_INIT_REQUEST';
export const RECORDING_FLOW_INIT_SUCCESS = 'RECORDING_FLOW_INIT_SUCCESS';
export const RECORDING_FLOW_INIT_FAIL = 'RECORDING_FLOW_INIT_FAIL';

export const RECORDING_FLOW_READY_REQUEST = 'RECORDING_FLOW_READY_REQUEST';
export const RECORDING_FLOW_READY_SUCCESS = 'RECORDING_FLOW_READY_SUCCESS';
export const RECORDING_FLOW_READY_FAIL = 'RECORDING_FLOW_READY_FAIL';

export const RECORDING_FLOW_RECORDING_START = 'RECORDING_FLOW_RECORDING_START';
export const RECORDING_FLOW_RECORDING_FINISH = 'RECORDING_FLOW_RECORDING_FINISH';

export const RECORDING_FLOW_REVIEW = 'RECORDING_FLOW_REVIEW';

export const RECORDING_FLOW_SUBMIT_REQUEST = 'RECORDING_FLOW_SUBMIT_REQUEST';
export const RECORDING_FLOW_SUBMIT_SUCCESS = 'RECORDING_FLOW_SUBMIT_SUCCESS';
export const RECORDING_FLOW_SUBMIT_FAIL = 'RECORDING_FLOW_SUBMIT_FAIL';

export const RECORDING_FLOW_COMPLETE = 'RECORDING_FLOW_COMPLETE';

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
    return (dispatch) => {
        dispatch(changeStep(RECORDING_STEPS.INIT));
    }
}

/**
 * INIT
 */
export function init() {
    return (dispatch) => {
        dispatch(initRequest());
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
export function ready() {
    return (dispatch) => {
        dispatch(readyRequest());
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
    return {
        type: RECORDING_FLOW_RECORDING_START
    }
}

export function recordingFinish() {
    return {
        type: RECORDING_FLOW_RECORDING_FINISH
    }
}

/**
 * SUBMIT
 */

export function submit() {
    return (dispatch) => {
        dispatch(submitRequest());
    }
}

export function submitRequest() {
    return {
        type: RECORDING_FLOW_SUBMIT_REQUEST
    }
}

export function submitSuccess(data) {
    return {
        type: RECORDING_FLOW_SUBMIT_SUCCESS
    }
}

export function submitError(data) {
    return {
        type: RECORDING_FLOW_SUBMIT_FAIL
    }
}

/**
 * COMPLETE
 */
export function recordingFlowComplete() {
    return {
        type: RECORDING_FLOW_COMPLETE
    }
}