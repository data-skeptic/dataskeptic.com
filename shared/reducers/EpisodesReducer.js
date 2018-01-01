import Immutable, { fromJS } from 'immutable';

const init = {
    episodes: [],
    ep_map: {},
    loaded: false,
    years: []
};

const defaultState = fromJS(init);

export default function EpisodesReducer(state = defaultState, action) {
    let nstate = state.toJS();

    switch (action.type) {
        case 'ADD_EPISODES':
            console.log(action.payload)
            var episodes = action.payload
            console.log('ADD_EPISODES: ' + episodes.length)
            nstate.episodes = episodes
            nstate.ep_map = {}
            for (var episode of episodes) {
                var guid = episode.guid
                nstate.ep_map[guid] = episode
            }
            nstate.loaded = true
            break
        case 'SET_YEARS':
            nstate.years = action.payload;
            break;
    }

    return fromJS(nstate)
}
