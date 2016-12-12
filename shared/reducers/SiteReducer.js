import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
  title: "Data Skeptic - The intersection of data science, artificial intelligence, machine learning, statistics, and scientific skepticism"
}

const defaultState = Immutable.fromJS(init);

export default function siteReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'SET_TITLE':
      nstate.title = action.payload
      break;
  }
  return Immutable.fromJS(nstate)
}
