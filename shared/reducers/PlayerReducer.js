import Immutable from 'immutable'
import { isEmpty, clone } from 'lodash'
import axios from 'axios'

const init = {
  is_playing: false,
  has_shown: false,
  playback_loaded: false,
  position: 0,
  position_updated: false,
  volume: 0.8,
  muted: false,
  episode: {}
}

export const INITIALIZE_PLAYER = 'INITIALIZE_PLAYER'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_MUTED = 'SET_MUTED'
export const RESET = 'RESET'

const normalizeEpisode = episode => {
  episode.img = episode.img.replace('http://', 'https://')
  episode.mp3 = episode.mp3.replace('http://', 'https://')
  return episode
}

const IS_CLIENT = (() => {
  let isDefined = false
  try {
    window
    isDefined = true
  } catch (x) {}
  return isDefined
})()

const normalizeState = ({
  is_playing = false,
  position = 0,
  episode = null,
  volume = 0.8,
  muted = false
}) => ({
  is_playing,
  position,
  episode,
  volume,
  muted
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

const savePlayingMeta = ({
  position,
  has_shown,
  is_playing,
  volume,
  muted
}) => {
  if (!IS_CLIENT) return null

  const data = {
    position,
    seekPosition: position,
    has_shown,
    is_playing,
    volume,
    muted
  }

  localStorage.setItem(PLAYER_META_KEY, JSON.stringify(data))
}

const removePlaying = () => {
  localStorage.removeItem(PLAYER_PLAYING_KEY)
  localStorage.removeItem(PLAYER_META_KEY)
}

const getCachePlaying = () => {
  const playing = getKey(PLAYER_META_KEY)
  const episode = getKey(PLAYER_PLAYING_KEY)

  let has_shown = false
  if (!isEmpty(episode)) {
    has_shown = true
  }

  return {
    ...playing,
    episode,
    has_shown
  }
}

const defaultState = Immutable.fromJS(init)

export default function PlayerReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch (action.type) {
    case INITIALIZE_PLAYER:
      const cache = getCachePlaying()
      nstate = {
        ...nstate,
        ...cache
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
      var episode = normalizeEpisode(action.payload)
      nstate.seekPosition = null
      if (isEmpty(episode)) {
        nstate.is_playing = false
        nstate.playback_loaded = false
        nstate.position = nstate.position || init.position
      } else {
        nstate.has_shown = true
        if (nstate.is_playing) {
          if (episode === undefined) {
            console.log(
              'Unusual situation for player to be in, but I can fix it'
            )
            nstate.episode = clone(episode)
            nstate.is_playing = true
            nstate.playback_loaded = false
            nstate.position = init.position
          } else {
            if (episode.guid === nstate.episode.guid) {
              nstate.is_playing = false
            } else {
              nstate.episode = clone(episode)
              nstate.playback_loaded = false
              nstate.position = init.position
              nstate.is_playing = true
            }
          }
        } else {
          const cache = getCachePlaying()
          const theSameCacheEpisode =
            cache && cache.episode && cache.episode.blog_id === episode.blog_id

          if (theSameCacheEpisode) {
            nstate = {
              ...nstate,
              ...cache,
              is_playing: true,
              playback_loaded: nstate.playback_loaded,
              has_shown: true
            }
          } else {
            nstate.episode = clone(episode)
            nstate.is_playing = true
            nstate.playback_loaded = false
            nstate.position = init.position
          }
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

    case SET_MUTED:
      nstate.muted = action.payload.muted
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

    case 'PLAYED':
    case 'MARK_AS_PLAYED':
      removePlaying(nstate)
      break

    case SET_VOLUME:
      nstate.volume = action.payload.volume
      break

    case RESET:
      nstate.is_playing = false
      nstate.has_shown = false
      nstate.playback_loaded = false
      savePlayingMeta(nstate)
      break
  }

  return Immutable.fromJS(nstate)
}

export const initialize = () => ({
  type: INITIALIZE_PLAYER
})

export const setVolume = volume => ({
  type: SET_VOLUME,
  payload: {
    volume
  }
})

export const setMuted = muted => ({
  type: SET_MUTED,
  payload: {
    muted
  }
})

export const reset = () => ({
  type: RESET
})
