import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../Constants/CommentTypes';

import {reset} from './RecordingFlowActions';

export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';
export const GO_TO_SUBMIT_STEP = 'GO_TO_SUBMIT_STEP';
export const UPLOAD_FILES = 'UPLOAD_FILES';

export function changeCommentType(type) {
    return (dispatch) => {
        dispatch(changeType(type));

        switch (type) {
            case TEXT:
                return;

            case UPLOAD:
                return;

            case RECORDING:
                dispatch(reset());
                return;
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

export const goToSubmitStep = () => {
    return (dispatch) => {
        dispatch({type: GO_TO_SUBMIT_STEP});
        dispatch(changeType(SUBMIT));
    }
};

export const uploadFiles = (files) => {
    debugger;
    return {
        type: UPLOAD_FILES,
        payload: {
            files
        }
    }
};
