import Immutable from 'immutable'
import { fromJS } from 'immutable'
import isEmpty from 'lodash/isEmpty'
import axios from 'axios'

const init = {
  is_playing: false,
  has_shown: false,
  playback_loaded: false,
  position: 0,
  position_updated: false,
  episode: {}
}

const IS_CLIENT = (() => {
  let isDefined = false
  try {
    window
    isDefined = true
  } catch (x) {}
  return isDefined
})()

const normalizeState = ({ is_playing, position, episode, volume }) => ({
  is_playing,
  position,
  episode,
  volume
})

const getKey = key => {
  let data = {}
  if (!IS_CLIENT) return data
  try {
    data = JSON.parse(localStorage.getItem(key))
  } catch (err) {}
  return data
}

const PLAYER_PLAYING_KEY = 'player_playing'
const PLAYER_META_KEY = 'player_meta'

const savePlaying = meta => {
  if (!IS_CLIENT) return

  const data = {
    ...meta.episode
  }

  localStorage.setItem(PLAYER_PLAYING_KEY, JSON.stringify(data))
}

const savePlayingMeta = ({ position, has_shown, is_playing, volume }) => {
  if (!IS_CLIENT) return null

  const data = {
    position,
    has_shown,
    is_playing,
    volume
  }

  localStorage.setItem(PLAYER_META_KEY, JSON.stringify(data))
}

const removePlaying = () => {
  localStorage.removeItem(PLAYER_PLAYING_KEY)
  localStorage.removeItem(PLAYER_META_KEY)
}

const getCachePlaying = () => {
  const { position, is_playing, volume } = getKey(PLAYER_META_KEY)

  const episode = getKey(PLAYER_PLAYING_KEY)

  return {
    position,
    is_playing,
    volume,
    episode
  }
}

const defaultState = Immutable.fromJS(init)

export default function PlayerReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch (action.type) {
    case '@@redux/INIT':
      nstate = {
        ...nstate,
        ...getCachePlaying()
      }
      break
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
            dispatch({ type: 'PLAY_EPISODE', payload: episode })
          }
        }
      } else {
        console.log('Getting episodes ' + guid)
        axios
          .get('/api/episodes/get/' + guid)
          .then(function(result) {
            console.log('Return of ' + guid)
            var episode = result['data']
            dispatch({ type: 'PLAY_EPISODE', payload: episode })
          })
          .catch(err => {
            console.log(err)
          })
      }
      break
    case 'PLAY_EPISODE':
      var episode = action.payload
      if (isEmpty(episode)) {
        nstate.is_playing = false
        nstate.playback_loaded = false
        nstate.position = init.position
      } else {
        nstate.has_shown = true
        if (nstate.is_playing) {
          if (episode == undefined) {
            console.log(
              'Unusual situation for player to be in, but I can fix it'
            )
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
      savePlaying(nstate)
      savePlayingMeta(nstate)
      break

    case 'STOP_PLAYBACK':
      nstate.is_player = false
      savePlayingMeta(nstate)
      break

    case 'STOP_PLAYING':
      nstate.is_playing = false
      savePlayingMeta(normalizeState(nstate))
      break

    case 'RESUME_PLAYING':
      nstate.is_playing = true
      savePlayingMeta(nstate)
      break

    case 'PLAYBACK_LOADED':
      nstate.playback_loaded = action.payload
      savePlayingMeta(nstate)
      break
    case 'PROGRESS_UPDATE':
      var pos = action.payload
      nstate.position = pos
      savePlayingMeta(nstate)
      break
    case 'PLAYER_SEEK':
      var pos = action.payload
      nstate.position = pos
      nstate.position_updated = true
      savePlayingMeta(nstate)
      break
    case 'SEEK_SET':
      nstate.position_updated = false
      break

    case 'MARK_AS_PLAYED':
      removePlaying(nstate)
      break
  }

  return Immutable.fromJS(nstate)
}
