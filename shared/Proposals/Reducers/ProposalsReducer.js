import Immutable, {fromJS} from 'immutable';

import {FETCH_CURRENT_PROPOSAL_REQUEST, FETCH_CURRENT_PROPOSAL_SUCCESS, FETCH_CURRENT_PROPOSAL_FAIL} from '../Actions/ProposalsActions';

const defaultState = {
    loading: false,
    error: false,
    proposal: {

    }
};

const initialState = fromJS(defaultState);

export default function ProposalsReducer(state=initialState, action) {
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

        default:
            break;
    }

    return fromJS(nstate);
}