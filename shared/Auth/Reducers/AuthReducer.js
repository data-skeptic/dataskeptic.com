import Immutable from 'immutable'
import axios from "axios"
import {fromJS} from 'immutable'

const env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
const base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env

const defaultState = {
    loggedIn: false,
    user: {}
}

const initialState  = fromJS(defaultState);

const addToList = (l, id) => [...l, id]
const removeFromList = (l, id) => l.filter((i) => i !== id)

const updateList = (state, name, needAdd, id) => {
    return state.updateIn(['user', 'lists', name], (l =>
                needAdd
                    ? addToList(l, id)
                    : removeFromList(l, id)
        )
    )
}


export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTH_USER_SUCCESS':
            state = state.setIn(['loggedIn'], true)
            state = state.setIn(['user'], fromJS(action.payload.data))
            return state;

        case 'MARK_AS_PLAYED':
            state = updateList(state, 'played', action.payload.played, action.payload.blogId)
            return state;

        case 'MARK_AS_FAVORITE':
            state = updateList(state, 'favorites', action.payload.favorited, action.payload.blogId)
            return state;

        case 'ADD_PLAYLIST':
            state = updateList(state, 'playlist', action.payload.playlisted, action.payload.blogId)
            return state;

        case 'SET_PLAYLIST':
            state = state.setIn(['user', 'playlistEpisodes'], fromJS(action.payload.data))
            return state;

        default:
            return state
    }

}

const getUserList = (state, name) =>
    state && state.auth
          && state.auth.getIn(['user', 'lists', name])

const existAtList = (state, name, id) => {
    const list = getUserList(state, name)
    return list && list.indexOf(id) > -1
}

export const markAsPlayed = (email, blog_id, media, guid, isPlayed) => {
    const data = {
        email,
        blog_id,
        media,
        guid,
        played: isPlayed ? 1.0 : 0
    }

    return axios.post(`${base_url}/user/played/update`, data).data
}

export const isPlayed = (state, id) => existAtList(state, 'played', id)

export const markFavorite = (email, blog_id, guid, favorited) => {
    const data = {
        email,
        blog_id,
	      guid,
        favorited
    }

    return axios.post(`${base_url}/user/favorite/update`, data).data
}

export const isFavorited = (state, id) => existAtList(state, 'favorites', id)

export const addPlaylist = (email, blog_id, guid, add) => {
    const data = {
        email,
        blog_id,
	      guid,
        add
    }

    return axios.post(`${base_url}/user/playlist/update`, data).data
}

export const isPlaylisted = (state, id) => existAtList(state, 'playlist', id)
