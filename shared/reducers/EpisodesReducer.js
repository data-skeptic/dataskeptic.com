import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
  episodes: [],
  years: [],
  focus_episode: {episode: undefined, loaded: 0}
}

const defaultState = Immutable.fromJS(init);

export default function episodesReducer(state = defaultState, action) {
	var nstate = state.toJS()
	switch(action.type) {
		case 'ADD_EPISODES':
			nstate.episodes = action.payload
			break;
		case 'SET_YEARS':
			nstate.years = action.payload
			break;
		case 'SET_FOCUS_EPISODE':
			nstate.focus_episode.episode = action.payload
			nstate.focus_episode.loaded = 1
			break;
	}
	return Immutable.fromJS(nstate)
}
