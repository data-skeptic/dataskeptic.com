import Immutable, { fromJS } from 'immutable';

const init = {
    episodes: [],
    loaded: false,
    years: [],
    focus_episode: {episode: undefined, loaded: 0}
};

const defaultState = fromJS(init);

export default function EpisodesReducer(state = defaultState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case 'ADD_EPISODES':
            nstate.episodes = action.payload;
            nstate.loaded = true;
            break;
        case 'SET_YEARS':
            nstate.years = action.payload;
            break;
        case 'SET_FOCUS_EPISODE':
            nstate.focus_episode.episode = action.payload;
            nstate.focus_episode.loaded = 1;
            break;

        case 'CLEAR_FOCUS_EPISODE':
            nstate.focus_episode = {episode: undefined, loaded: 0};
            break;
    }

    return fromJS(nstate)
}
