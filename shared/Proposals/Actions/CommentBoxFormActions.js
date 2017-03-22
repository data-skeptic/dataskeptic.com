import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../Constants/CommentTypes';

import {reset as resetRecording} from './RecordingFlowActions';

export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';
export const GO_TO_SUBMIT_STEP = 'GO_TO_SUBMIT_STEP';
export const UPLOAD_FILES = 'UPLOAD_FILES';

export const RESET_UPLOAD = 'RESET_UPLOAD';

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
            dispatch(resetUpload());
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

export const resetUpload = () => {
    return {
        type: RESET_UPLOAD
    }
};