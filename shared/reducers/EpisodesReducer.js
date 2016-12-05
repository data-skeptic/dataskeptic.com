import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
  episodes: [],
  episodes_map: {},
  episodes_loaded: 0
}

const defaultState = Immutable.fromJS(init);

export default function episodesReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'ADD_EPISODES':
      nstate.episodes = action.payload
      console.log("nstate.episodes_map")
      if (nstate.episodes_map == undefined) {
        nstate.episodes_map = {}
      }
      console.log(nstate.episodes_map)
      for (var i=0; i < nstate.episodes.length; i++) {
        var episode = nstate.episodes[i]
        nstate.episodes_map[episode.guid] = episode
      }
      break;
    case 'SET_EPISODES_LOADED':
    console.log("action")
    console.log(action)
      nstate.episodes_loaded = action.payload
      break;
    case 'FETCH_EPISODES_ERROR':
      nstate.episodes_loaded = -1
      break;
  }
  return Immutable.fromJS(nstate)
}
