export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';

export const SET_RECORDING_ID = 'SET_RECORDING_ID';
export const CHANGE_RECORDING_FLOW_STEP = 'CHANGE_RECORDING_FLOW_STEP';

export function startRecording() {
    return {
        type: START_RECORDING
    }
}

export function stopRecording() {
    return {
        type: STOP_RECORDING
    }
}

export function setRecordingId(recordingId) {
    return {
        type: SET_RECORDING_ID,
        payload: {
            recordingId
        }
    }
}

export function changeRecordingFlowStep(step) {
    return {
        type: CHANGE_RECORDING_FLOW_STEP,
        payload: {
            step
        }
    }
}