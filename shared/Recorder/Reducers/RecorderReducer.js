import Immutable, {fromJS} from 'immutable';
import {v4} from 'uuid';

const INITIAL_CHUNK_ID_VAL = 0;
const INITIAL_DURATION_VAL = '00:00:00';

import {
    START_RECORDING,
    STOP_RECORDING,
    RESET_RECORDING,
    UPDATE_DURATION
} from '../Actions/RecorderActions';

const getRandomId = () => v4();
// const getRandomId = () => 'test';

const defaultState = {
    id: getRandomId(),
    chunkId: INITIAL_CHUNK_ID_VAL,
    startedAt: null,
    isRecording: false,
    isUploading: false,
    duration: INITIAL_DURATION_VAL,
};

const initialState = fromJS(defaultState);

export default function RecorderReducer(state=initialState, action) {

    switch (action.type) {
        case START_RECORDING:
            state = state.set('id', action.payload.id);
            state = state.set('chunkId', action.payload.chunkId);
            state = state.set('startedAt', action.payload.startedAt);
            return state;

        case STOP_RECORDING:
            state = state.set('recording', true);
            return state;

        case RESET_RECORDING:
            state = fromJS(defaultState);
            return state;

        case UPDATE_DURATION:
            state = state.set('duration', action.payload.duration);
            return state;

        default:
            return state;
    }

}