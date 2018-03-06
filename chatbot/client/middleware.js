import Connector from './Connector'
import { default as chatBotActionTypes } from './actionTypes'
import {INIT, DESTROY, MESSAGE_SENT} from "./reducer";
import {ON_MESSAGE_SENT} from "../shared/events";

const isChatBotAction = type => ~chatBotActionTypes.indexOf(type)

const handleAction = (next, state, action, connector) => {
  let returnValue = next(action)
  const payload = returnValue.payload
  const userId = 1
  
  switch (action.type) {
    case INIT:
      connector.init(userId, payload)
      break
    
    case MESSAGE_SENT:
      connector.emit(ON_MESSAGE_SENT, payload)
      break;
      
    case DESTROY:
      connector.deinit()
      break
  }
  
  return returnValue
}

export default function createConnector({ getState, dispatch }) {
  // initialize new connection handler
  const connector = new Connector(dispatch)
  
  return next => action => {
    const actionType = String(action.type)

    // handle only chatbot actions
    if (!isChatBotAction(actionType)) {
      return next(action)
    } else {
      return handleAction(next, getState(), action, connector)
    }
  }
}
