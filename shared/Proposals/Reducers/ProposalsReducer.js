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
    INIT
} from '../../Recorder/Constants/steps';

const defaultState = {
    step: INIT,
    loading: false,
    error: false,
    proposal: {},
    form: {
        type: types.UPLOAD
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

        default:
            break;
    }

    return fromJS(nstate);
}