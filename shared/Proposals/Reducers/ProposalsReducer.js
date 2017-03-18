import Immutable, {fromJS} from 'immutable';

import * as types from '../Constants/CommentTypes';
import {
    FETCH_CURRENT_PROPOSAL_REQUEST,
    FETCH_CURRENT_PROPOSAL_SUCCESS,
    FETCH_CURRENT_PROPOSAL_FAIL
} from '../Actions/ProposalsActions';

import {
    CHANGE_COMMENT_TYPE
} from '../Actions/CommentBoxFormActions';

import {
    INIT,
    RECORDING
} from '../../Recorder/Constants/steps';

import {
    RECORDING_FLOW_CHANGE_STEP,
    RECORDING_FLOW_RETURN,
    RECORDING_FLOW_RESET,

    RECORDING_FLOW_INIT_REQUEST,
    RECORDING_FLOW_INIT_SUCCESS,
    RECORDING_FLOW_INIT_FAIL,

    RECORDING_FLOW_READY_REQUEST,
    RECORDING_FLOW_READY_SUCCESS,
    RECORDING_FLOW_READY_FAIL,

    RECORDING_FLOW_RECORDING_START,
    RECORDING_FLOW_RECORDING_FINISH,

    RECORDING_FLOW_REVIEW,

    RECORDING_FLOW_SUBMIT_REQUEST,
    RECORDING_FLOW_SUBMIT_SUCCESS,
    RECORDING_FLOW_SUBMIT_FAIL,

    RECORDING_FLOW_COMPLETE,
    RECORDING_FLOW_FAIL
} from '../Actions/RecordingFlowActions';

const defaultState = {
    loading: false,
    error: false,
    proposal: {},
    form: {
        step: INIT,
        error: {},
        type: types.TEXT
    }
};

const initialState = fromJS(defaultState);

export default function ProposalsReducer(state = initialState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case FETCH_CURRENT_PROPOSAL_REQUEST:
            nstate.loading = true;
            nstate.error = true;
            break;

        case FETCH_CURRENT_PROPOSAL_SUCCESS:
            nstate.loading = false;
            nstate.error = true;
            nstate.proposal = action.payload.data;
            break;

        case FETCH_CURRENT_PROPOSAL_FAIL:
            nstate.loading = false;
            nstate.error = action.payload.error;
            break;

        case CHANGE_COMMENT_TYPE:
            nstate.form.type = action.payload.type;
            break;

        case RECORDING_FLOW_CHANGE_STEP:
            nstate.form.step = action.payload.nextStep;
            break;

        case RECORDING_FLOW_FAIL:
            nstate.form.error = action.payload.error;
            break;

        default:
            break;
    }

    return fromJS(nstate);
}