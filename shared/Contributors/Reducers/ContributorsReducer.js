import Immutable from 'immutable';

import {
    LOAD_CONTRIBUTORS_LIST_SUCCESS
} from '../Actions/ContributorsActions'

const init = {
  list: {}
};

const defaultState = Immutable.fromJS(init);

export default function ContrubutorsReducer(state = defaultState, action) {
  const nstate = state.toJS();

  switch(action.type) {
    case LOAD_CONTRIBUTORS_LIST_SUCCESS:
        nstate.list = action.payload.contributors;
        break;
  }

  return Immutable.fromJS(nstate)
}
