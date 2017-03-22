import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../Constants/CommentTypes';

import {reset} from './RecordingFlowActions';

export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';
export const GO_TO_SUBMIT_STEP = 'GO_TO_SUBMIT_STEP';

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
    return changeType(SUBMIT);
};
