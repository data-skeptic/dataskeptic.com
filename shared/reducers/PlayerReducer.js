import Immutable from 'immutable'
import { fromJS } from 'immutable'
import isEmpty from 'lodash/isEmpty'
import axios  from 'axios'

const init = {
  is_playing: false,
  has_shown: false,
  playback_loaded: false,
  position: 0,
  position_updated: false,
  episode: {}
}

const defaultState = Immutable.fromJS(init);

export default function PlayerReducer(state = defaultState, action) {
    var nstate = state.toJS()
    switch (action.type) {
        case 'PLAY_EPISODE_FROM_GUID':
            // This is used by the bot
            console.log('PLAY_EPISODE_FROM_GUID')
            console.log(action)
            var dispatch = action.dispatch
            var guid = action.guid
            var my_cache = global.my_cache
            if (my_cache != undefined) {
                var my_episode = undefined
                var episodes = []
                var allepisodes = get_podcasts_from_cache(my_cache, pathname)
                for (var episode of allepisodes) {
                    if (episode.guid == guid) {
                        dispatch({type: "PLAY_EPISODE", payload: episode})
                    }
                }
            } else {
                console.log("Getting episodes " + guid)
                axios
                    .get("/api/episodes/get/" + guid)
                    .then(function(result) {
                        console.log("Return of " + guid)
                        var episode = result["data"]
                        dispatch({type: "PLAY_EPISODE", payload: episode})
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            break
        case 'PLAY_EPISODE':
            var episode = action.payload
            if (isEmpty(episode)) {
                nstate.is_playing = false
                nstate.playback_loaded = false
                nstate.position = init.position;
            } else {
                nstate.has_shown = true
        if (nstate.is_playing) {
            if (episode == undefined) {
                console.log('Unusual situation for player to be in, but I can fix it')
                nstate.episode = episode
                nstate.is_playing = true
                nstate.playback_loaded = false
                nstate.position = init.position
            } else {
                if (episode.guid == nstate.episode.guid) {
                    nstate.is_playing = false
                } else {
                    nstate.episode = episode
                    nstate.playback_loaded = false
                    nstate.position = init.position
                    nstate.is_playing = true
                }
            }
        } else {
          nstate.episode = episode
          nstate.is_playing = true
        }
      }
      break
    case 'STOP_PLAYBACK':
      nstate.is_player = false
      break

    case 'STOP_PLAYING':
      nstate.is_playing = false
      break

    case 'RESUME_PLAYING':
      nstate.is_playing = true
      break

    case 'PLAYBACK_LOADED':
      nstate.playback_loaded = action.payload
      break
    case 'PROGRESS_UPDATE':
      var pos = action.payload
      nstate.position = pos
      break
    case 'PLAYER_SEEK':
      var pos = action.payload
      nstate.position = pos
      nstate.position_updated = true
      break
    case 'SEEK_SET':
      nstate.position_updated = false
      break
  }
  return Immutable.fromJS(nstate)
}
