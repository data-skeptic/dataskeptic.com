import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../Constants/CommentTypes';

import {reset as resetRecording} from './RecordingFlowActions';

export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';

export const UPLOAD_FILES = 'UPLOAD_FILES';
export const COMPLETE_RECORDING = 'COMPLETE_RECORDING';

export const RESET_COMPLETED_UPLOAD = 'RESET_COMPLETED_UPLOAD';
export const RESET_COMPLETED_RECORDING = 'RESET_COMPLETED_RECORDING';

export function changeCommentType(nextType) {
    return (dispatch, getState) => {

        const state = getState();
        const prevType = state.proposals.getIn(['form', 'type']);
        let agreedChange = true;

        if (nextType === prevType) {
            return;
        }

        if (prevType === RECORDING) {
            agreedChange = confirm('You will loose recorded audio file. Are you sure?');
        } else if (prevType === UPLOAD) {
            agreedChange = confirm('You will loose uploaded files. Are you sure?');
        }

        if (agreedChange) {
            dispatch(resetRecording());
            dispatch(resetCompletedUpload());
            dispatch(resetCompletedRecording());
            dispatch(changeType(nextType));
        }
    }
}

export function changeType(type) {
    return {
        type: CHANGE_COMMENT_TYPE,
        payload: {
            type
        }
    }
}

export const uploadFiles = (files) => {
    return {
        type: UPLOAD_FILES,
        payload: {
            files
        }
    }
};

export const resetCompletedUpload = () => {
    return {
        type: RESET_COMPLETED_UPLOAD
    }
};

export const completeRecording = (id) => {
    return {
        type: COMPLETE_RECORDING,
        payload: {
            id
        }
    }
};

export const resetCompletedRecording = () => {
    return {
        type: RESET_COMPLETED_RECORDING
    }
};