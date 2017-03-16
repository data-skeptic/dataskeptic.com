import RecorderFlowContainer from './Containers/RecorderFlowContainer/RecorderFlowContainer';
import {
    INIT,
    READY,
    ERROR,
    RECORDING,
    REVIEW,
    SUBMITTING,
    COMPLETE,
    SERVER_ERROR
} from './Constants/steps';

export default RecorderFlowContainer;
export const types = {
    INIT,
    READY,
    ERROR,
    RECORDING,
    REVIEW,
    SUBMITTING,
    COMPLETE,
    SERVER_ERROR
};