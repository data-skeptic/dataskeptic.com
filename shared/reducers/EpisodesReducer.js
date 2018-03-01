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
        case 'LOADING_EPISODES':
            nstate.episodes = []
            nstate.ep_map = {}
            nstate.loaded = false
            break;
        case 'ADD_EPISODES':
            var episodes = action.payload
            //console.log("episodes")
            //console.log(episodes)
            nstate.episodes = episodes
            nstate.ep_map = {}
            for (var episode of episodes) {
                if (episode) {
                    var guid = episode.guid
                    if (guid) {
                        nstate.ep_map[guid] = episode
                    }                    
                } else {
                    console.log("ERROR: got undefined episode")
                }
            }
            nstate.loaded = true
            break
        case 'SET_YEARS':
            nstate.years = action.payload;
            break;
    }

    return fromJS(nstate)
}
