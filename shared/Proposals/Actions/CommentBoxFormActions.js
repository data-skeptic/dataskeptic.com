import {TEXT, UPLOAD, RECORDING} from '../Constants/CommentTypes';

import {reset} from './RecordingFlowActions';

export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';

export function controlFlow() {

}

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