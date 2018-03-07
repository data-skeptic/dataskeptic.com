import Connector from './Connector'
import actionTypes, {
  INIT, INIT_SUCCESS, DESTROY, MESSAGE_SENT, MESSAGE_RECEIVED
} from '../shared/actionTypes'

const isChatBotAction = type => ~actionTypes.indexOf(type)

const handleAction = (next, state, action, connector) => {
  let returnValue = next(action)
  const payload = returnValue.payload

  switch (action.type) {
    case INIT:
      connector.init(payload)
      break;

    case DESTROY:
      connector.deinit()
      break
  }

  connector.emit(action.type, payload)
  return returnValue
}

export default function createConnector({ getState, dispatch }) {
  // initialize new connection handler
  const connector = new Connector(dispatch)

  return next => action => {
    const actionType = String(action.type)

    // handle only ChatBotNext actions
    if (!isChatBotAction(actionType)) {
      return next(action)
    } else {
      return handleAction(next, getState(), action, connector)
    }
  }
}
