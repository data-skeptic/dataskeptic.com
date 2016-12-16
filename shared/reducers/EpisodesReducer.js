import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
  episodes: [],
  episodes_map: {},
  episodes_loaded: 0,
  focus_episode: {episode: undefined, loaded: 0}
}

const defaultState = Immutable.fromJS(init);

export default function episodesReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'ADD_EPISODES':
      nstate.episodes = action.payload
      if (nstate.episodes_map == undefined) {
        nstate.episodes_map = {}
      }
      for (var i=0; i < nstate.episodes.length; i++) {
        var episode = nstate.episodes[i]
        nstate.episodes_map[episode.guid] = episode
      }
      break;
    case 'SET_EPISODES_LOADED':
      nstate.episodes_loaded = action.payload
      break;
    case 'FETCH_EPISODES_ERROR':
      nstate.episodes_loaded = -1
      break;
    case 'REQUEST_INJECT_EPISODE':
      var guid = action.payload.guid
      if (guid != undefined) {
        var ep = nstate.episodes_map[guid]
        if (ep != undefined) {
          nstate.focus_episode.episode = ep
          nstate.focus_episode.loaded = 1          
        } else {
          nstate.focus_episode.loaded = -1
        }
      }
      else if (nstate.episodes.length > 0) {
        nstate.focus_episode.episode = nstate.episodes[0]
        nstate.focus_episode.loaded = 1
      }
      else {
        nstate.focus_episode.loaded = 0        
      }
      break;
    case 'INJECT_EPISODE':
      var episode = action.payload.episode
      if (episode != {}) {
        console.log("hi!")
        console.log(episode)
        episode.pubDate = new Date(episode.pubDate)
        nstate.focus_episode.episode = episode
        nstate.focus_episode.loaded = 1        
      }
      break;
    case 'SET_FOCUS_EPISODE_BY_GUID':
      var guid = action.payload.guid
      var episode = episode_map[guid]
      if (episode != undefined) {
        nstate.focus_episode.episode = episode
        nstate.focus_episode.loaded = 1
      } else {
        console.log("Cound not find " + guid + " in episode metadata cache.")
        nstate.focus_episode.loaded = -1
      }
      break;
  }
  return Immutable.fromJS(nstate)
}
