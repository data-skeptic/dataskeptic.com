import Immutable from 'immutable'
import { isEmpty, clone } from 'lodash'
import axios from 'axios'

const init = {
  is_playing: false,
  has_shown: false,
  playback_loaded: false,
  position: 0,
  position_updated: false,
  volume: -1,
  muted: false,
  episode: {}
}

export const INITIALIZE_PLAYER = 'INITIALIZE_PLAYER'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_MUTED = 'SET_MUTED'
export const RESET = 'RESET'

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
  muted = false,
  has_shown = false
}) => ({
  is_playing,
  position,
  episode,
  volume,
  muted,
  has_shown
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

const computeKey = episode => `${PLAYER_META_KEY}_${episode.blog_id}`

const savePlaying = ({ episode }) => {
  if (!IS_CLIENT) return

  const data = {
    ...episode
  }

  localStorage.setItem(PLAYER_PLAYING_KEY, JSON.stringify(data))
}

const savePlayingMeta = meta => {
  if (!IS_CLIENT) return null

  const blog_id = isEmpty(meta.episode) ? null : meta.episode.blog_id

  const { position, has_shown, is_playing, volume, muted } = meta

  const data = {
    position,
    seekPosition: position,
    has_shown,
    is_playing,
    volume,
    muted,
    blog_id
  }

  if (!isEmpty(meta.episode)) {
    const key = computeKey(meta.episode)
    localStorage.setItem(key, JSON.stringify(data))
  }
}

const getPlayingMeta = episode => {
  if (!IS_CLIENT) return null
  if (isEmpty(episode)) return null

  const key = computeKey(episode)
  return getKey(key)
}

const removePlaying = () => {
  localStorage.removeItem(PLAYER_PLAYING_KEY)
  localStorage.removeItem(PLAYER_META_KEY)
}

const getCachePlaying = nstate => {
  const episodeData = getKey(PLAYER_PLAYING_KEY)
  const episodeMeta = getPlayingMeta(episodeData)

  if (isEmpty(episodeMeta)) {
    return nstate
  }

  const volume = episodeMeta.volume || 0.8

  if (!episodeMeta.has_shown) {
    return {
      ...nstate,
      volume
    }
  }

  delete episodeMeta.has_shown
  delete episodeMeta.blog_id

  nstate = playEpisode(nstate, episodeData)

  nstate = {
    ...nstate,
    ...episodeMeta,
    volume,
    is_playing: episodeMeta.is_playing || false
  }

  return nstate
}

const playEpisode = (nstate, episode) => {
  nstate.episode = clone(episode)
  nstate.position = init.position

  const cachedMeta = getPlayingMeta(episode)

  if (!isEmpty(cachedMeta)) {
    delete cachedMeta.muted
    delete cachedMeta.volume

    nstate = {
      ...nstate,
      ...cachedMeta,
      episode: clone(episode)
    }
  }

  nstate.playback_loaded = false
  nstate.is_playing = true
  nstate.has_shown = true
  
  if (!nstate.volume || nstate.volume === -1) {
    nstate.volume = 0.8
  }

  return nstate
}

const defaultState = Immutable.fromJS(init)

export default function PlayerReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch (action.type) {
    case INITIALIZE_PLAYER:
      nstate = getCachePlaying(nstate)
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
              nstate = playEpisode(nstate, episode)
            }
          }
        } else {
          nstate = playEpisode(nstate, episode)
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

    case 'PLAYED':
    case 'MARK_AS_PLAYED':
      removePlaying(nstate)
      break

    case SET_VOLUME:
      nstate.volume = action.payload.volume
      savePlayingMeta(nstate)
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
