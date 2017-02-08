import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
	invoice: undefined
}

const defaultState = Immutable.fromJS(init);


export default function adminReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'ADD_INVOICE':
      nstate.invoice = action.payload
      break
  }
  return Immutable.fromJS(nstate)
}
