export const GET_NEXT_ID = 'GET_NEXT_ID';
export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const RESET_RECORDING = 'RESET_RECORDING';
export const UPDATE_DURATION = 'UPDATE_DURATION';

export function getNextId() {
    return {
        type: GET_NEXT_ID
    }
}

export function startRecording(id, chunkId) {
    const now = (new Date()) + '';

    return {
        type: START_RECORDING,
        payload: {
            id,
            chunkId,
            startedAt: now
        }
    }
}

export function stopRecording() {
    return {
        type: STOP_RECORDING
    }
}

export function resetRecording() {
    return {
        type: RESET_RECORDING
    }
}

export function updateRecordingDuration(duration) {
    return {
        type: UPDATE_DURATION,
        payload: {
            duration
        }
    }
}