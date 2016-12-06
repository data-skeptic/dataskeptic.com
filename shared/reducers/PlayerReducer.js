import Immutable from 'immutable';
import { fromJS } from 'immutable';

const init = {
  is_playing: false,
  has_shown: false,
  playback_loaded: false,
  position: 0,
  position_updated: false,
  episode: undefined
}

const defaultState = Immutable.fromJS(init);

export default function playerReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
  	case 'PLAY_EPISODE':
      console.log("play episode")
      var episode = action.payload
      if (episode == undefined) {
        console.log("Stopping playback")
        nstate.is_playing = false
      } else {
        nstate.has_shown = true
        if (nstate.is_playing) {
          if (episode == undefined) {
            console.log("Unusual situation for player to be in, but I can fix it")
            nstate.episode = episode
            nstate.is_playing = true
          } else {
            if (episode.guid == nstate.episode.guid) {
              nstate.is_playing = false
            } else {
              nstate.episode = episode
              nstate.is_playing = true
            }
          }
        } else {
          nstate.episode = episode
          nstate.is_playing = true
        }
      }
      break;
    case 'STOP_PLAYBACK':
      nstate.is_player = false
      break;
    case 'PLAYBACK_LOADED':
      nstate.playback_loaded = action.payload
      break;
    case 'PROGRESS_UPDATE':
      var pos = action.payload
      nstate.position = pos
      break;
    case 'PLAYER_SEEK':
      var pos = action.payload
      nstate.position = pos
      nstate.position_updated = true
      break;
    case 'SEEK_SET':
      nstate.position_updated = false
      break;
  }
  return Immutable.fromJS(nstate)
}
