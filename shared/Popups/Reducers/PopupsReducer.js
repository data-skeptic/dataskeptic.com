import {fromJS, Set} from 'immutable' 
import initPopup, {INIT, OPEN} from "../helpers/popup";

const defaultState = {
  registeredKeys: Set([])
}

const initialState = fromJS(defaultState)

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      state = state.update('registeredKeys', keys => keys.push(action.payload.key))
      state = fromJS(initPopup(state.toJS(), action.payload))
      return state
    
    case OPEN:
      state = state.setIn([action.payload.key, 'open'], true)
      // TODO: unsafe close case
      // if (!action.payload.safe) {
      return state
    
    default:
      return state
  }
}
