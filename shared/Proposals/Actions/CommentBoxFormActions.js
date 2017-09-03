import axios from 'axios';

import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../Constants/CommentTypes';
import {
    reset as resetRecording,
    submitting as recordingSubmitting,
    complete as recordingComplete,
    fail as recordingFail
} from './RecordingFlowActions';
import {reduxForm, reset, change as changeFieldValue, formValueSelector} from 'redux-form';

import Request from '../../Request';

export const CHANGE_COMMENT_TYPE = 'CHANGE_COMMENT_TYPE';

export const UPLOAD_FILES = 'UPLOAD_FILES';
export const UPDATE_FILES = 'UPDATE_FILES';

export const COMPLETE_RECORDING = 'COMPLETE_RECORDING';
export const REVIEW_RECORDING = 'REVIEW_RECORDING';

export const RESET_COMPLETED_UPLOAD = 'RESET_COMPLETED_UPLOAD';
export const RESET_COMPLETED_RECORDING = 'RESET_COMPLETED_RECORDING';

export const SUBMIT_COMMENT_FORM_REQUEST = 'SUBMIT_COMMENT_FORM_REQUEST';
export const SUBMIT_COMMENT_FORM_SUCCESS = 'SUBMIT_COMMENT_FORM_SUCCESS';
export const SUBMIT_COMMENT_FORM_FAIL = 'SUBMIT_COMMENT_FORM_FAIL';

export const RESET_SUBMIT = 'RESET_SUBMIT';

const FORM_KEY = 'commentBox'

function redirectToThankYouPage() {
    setInterval(() => {
        window.location.href = '/rfc/thank-you';
    }, 2000);
}

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

export const updateFiles = (files) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_FILES,
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

export const reviewRecording = (url) => {
    return (dispatch) => {
        dispatch({
            type: REVIEW_RECORDING,
            payload: {
                url
            }
        });
    }
};

const submitFlow = (data, dispatch) => {
    dispatch(recordingSubmitting())

    return axios.post('/api/v1/proposals', data)
        .then((res) => res.data)
        .then((res) => {
           if(res.success){
               dispatch(submitCommentFormSuccess(res));
               dispatch(recordingComplete())
           } else {
               dispatch(recordingFail())
               dispatch(submitCommentFormFail(res.error))
           }
        })
        .catch((err) => dispatch(submitCommentFormFail(err)));
};

export const submitCommentForm = (formData) => {
    return (dispatch) => {
        dispatch(submitCommentFormRequest(formData));

        if (formData.type === "UPLOAD") {
            Request.upload('/api/v1/proposals/files', formData.files)
                .then((res) => res.data)
                .then((data) => {
                    if (data.success) {
                        formData.files = data.files;
                        return submitFlow(formData, dispatch)
                    }   else {
                        dispatch(submitCommentFormFail(data.error));
                    }
                });

        } else {
            return submitFlow(formData, dispatch);
        }
    }
};

export const submitCommentFormRequest = (data) => {
    return {
        type: SUBMIT_COMMENT_FORM_REQUEST,
        data
    }
};

export const submitCommentFormSuccess = (data) => {
    return {
        type: SUBMIT_COMMENT_FORM_SUCCESS,
        data
    }
};

export const submitCommentFormFail = (error) => {
    return {
        type: SUBMIT_COMMENT_FORM_FAIL,
        payload: {
            error
        }
    }
};

export const resetForm = () => {
    return (dispatch) => {
        dispatch({type: RESET_SUBMIT})
        dispatch(reset(FORM_KEY))
        dispatch(resetRecording());
        dispatch(resetCompletedUpload());
        dispatch(resetCompletedRecording());
    }
}