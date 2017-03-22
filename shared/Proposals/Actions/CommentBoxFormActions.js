import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../Constants/CommentTypes';
import {reset as resetRecording} from './RecordingFlowActions';
import {reduxForm, reset, change as changeFieldValue, formValueSelector} from 'redux-form';

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
    return (dispatch) => {
        dispatch({
            type: CHANGE_COMMENT_TYPE,
            payload: {
                type
            }
        });

        dispatch(changeFieldValue('commentBox', 'type', type));
    };
}

export const uploadFiles = (files) => {
    return (dispatch) => {
        dispatch({
            type: UPLOAD_FILES,
            payload: {
                files
            }
        });

        dispatch(changeFieldValue('commentBox', 'files', files));
    };
};

export const resetCompletedUpload = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_COMPLETED_UPLOAD
        });

        dispatch(changeFieldValue('commentBox', 'files', []));
    }
};

export const completeRecording = (id) => {
    return (dispatch) => {
        dispatch({
            type: COMPLETE_RECORDING,
            payload: {
                id
            }
        });

        dispatch(changeFieldValue('commentBox', 'recording', {id}));
    }
};

export const resetCompletedRecording = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_COMPLETED_RECORDING
        });

        dispatch(changeFieldValue('commentBox', 'recording', {}));
    }
};