import Immutable from 'immutable'
import axios from 'axios'
import { fromJS, List } from 'immutable'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_url = 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/' + env

const defaultState = {
  loggedIn: false,
  user: {}
}

const initialState = fromJS(defaultState)

const addToList = (l, id) => [...l, id]
const removeFromList = (l, id) => l.filter(i => i !== id)

const updateList = (state, name, needAdd, id) => {
  return state.updateIn(
    ['user', 'lists', name],
    l => (needAdd ? addToList(l, id) : removeFromList(l, id))
  )
}

const removeEpisode = (state, blog_id) => {
  return state.updateIn(['user', 'playlistEpisodes'], (l = List()) =>
    l.filter(episode => episode.get('blog_id') !== blog_id)
  )
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      state = state.setIn(['loggedIn'], true)
      state = state.setIn(['user'], fromJS(action.payload.data))
      return state

    case 'LOGOUT':
      state = state.setIn(['loggedIn'], false)
      state = state.setIn(['user'], fromJS({}))
      return state

    case 'MARK_AS_PLAYED':
      state = updateList(
        state,
        'played',
        action.payload.played,
        action.payload.blogId
      )
      return state

    case 'MARK_AS_FAVORITE':
      state = updateList(
        state,
        'favorites',
        action.payload.favorited,
        action.payload.blogId
      )
      return state

    case 'ADD_PLAYLIST':
      state = updateList(
        state,
        'playlist',
        action.payload.playlisted,
        action.payload.blogId
      )
      state = removeEpisode(state, action.payload.blogId)
      return state

    case 'FETCH_PLAYLIST_START':
      state = state.setIn(['user', 'playlistLoaded'], false)
      return state

    case 'SET_PLAYLIST':
      state = state.setIn(
        ['user', 'lists', 'playlist'],
        fromJS(action.payload.playlist)
      )
      return state

    case 'SET_PLAYLIST_EPISODE':
      state = state.setIn(
        ['user', 'playlistEpisodes'],
        fromJS(action.payload.data)
      )
      state = state.setIn(['user', 'playlistLoaded'], true)
      return state

    default:
      return state
  }
}

export const getUserList = (state, name) =>
  state && state.auth && state.auth.getIn(['user', 'lists', name])

export const isPlaylistLoaded = state =>
  state && state.auth && state.auth.getIn(['user', 'playlistLoaded'])

const existAtList = (state, name, id) => {
  const list = getUserList(state, name)
  return list && list.indexOf(id) > -1
}

export const markAsPlayed = (blog_id, media, guid, isPlayed) => {
  const data = {
    blog_id,
    media,
    guid,
    played: isPlayed ? 1.0 : 0
  }

  return axios.post(`/api/v1/user/played/update`, data).then(res => res.data)
}

export const isPlayed = (state, id) => existAtList(state, 'played', id)

export const markFavorite = (blog_id, guid, favorited) => {
  const data = {
    blog_id,
    guid,
    favorited
  }

  return axios.post(`/api/v1/user/favorites/update`, data).then(res => res.data)
}

export const isFavorited = (state, id) => existAtList(state, 'favorites', id)

export const addPlaylist = (blog_id, guid, add) => {
  const data = {
    blog_id,
    guid,
    add
  }

  return axios.post(`/api/v1/user/playlist/update`, data).then(res => res.data)
}

export const isPlaylisted = (state, id) => existAtList(state, 'playlist', id)
