import initPopup, {INIT, OPEN} from "../helpers/popup";

const defaultState = {
  registeredKeys: []
}

const initialState = defaultState

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      state = initPopup(state.toJS(), action.payload)
      state.registeredKeys = [...state.registeredKeys, action.payload.key]
      return state
    
    case OPEN:
      state = state.setIn([action.payload.key, 'open'], true)
      if (!action.payload.safe) {
        debugger
      }
      return state
    
    default:
      return state
  }
}
