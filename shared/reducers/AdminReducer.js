import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
}

const defaultState = Immutable.fromJS(init);


export default function adminReducer(state = defaultState, action) {
  var nstate = state.toJS()
  return Immutable.fromJS(nstate)
}
