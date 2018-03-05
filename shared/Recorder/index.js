import RecorderFlowContainer from './Containers/RecorderFlowContainer/RecorderFlowContainer'
import {
  INIT,
  READY,
  ERROR,
  RECORDING,
  UPLOADING,
  REVIEW,
  SUBMITTING,
  COMPLETE,
  SERVER_ERROR
} from './Constants/steps'

export default RecorderFlowContainer
export const steps = {
  INIT,
  READY,
  ERROR,
  RECORDING,
  UPLOADING,
  REVIEW,
  SUBMITTING,
  COMPLETE,
  SERVER_ERROR
}
