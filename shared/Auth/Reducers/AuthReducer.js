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

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case 'AUTH_USER_SUCCESS':
            state = state.setIn(['loggedIn'], true)
            state = state.setIn(['user'], fromJS(action.payload.data))
            return state;

        case 'MARK_AS_PLAYED':
            console.dir(`MARK_AS_PLAYED`)
            return;

        case 'MARK_AS_FAVORITE':
            console.dir(`MARK_AS_FAVORITE`)
            return;

        case 'ADD_PLAYLIST':
            console.dir(`ADD_PLAYLIST`)
            return;

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

export const markAsPlayed = async (email, blog_id, media, guid, isPlayed) => {
    const data = {
        email,
        blog_id,
        media,
        guid,
        played: isPlayed ? 1.0 : 0
    }

    const res = await axios.get(`${base_url}/user/played/update`, data)
    return { type: 'MARK_AS_PLAYED', payload: { features: res.data } }
}

export const isPlayed = (state, id) => existAtList(state, 'played', id)

export const markFavorite = async (email, blog_id, favorited) => {
    const data = {
        email,
        blog_id,
        favorited
    }

    const res = await axios.get(`${base_url}/user/favorite/update`, data)
    return { type: 'MARK_AS_FAVORITE', payload: { features: res.data } }
}

export const isFavorited = (state, id) => existAtList(state, 'favorites', id)

export const addPlaylist = async (email, blog_id, add) => {
    const data = {
        email,
        blog_id,
        add
    }

    const res = await axios.get(`${base_url}/user/playlist/update`, data)
    return { type: 'ADD_PLAYLIST', payload: { features: res.data } }
}

export const isPlaylisted = (state, id) => existAtList(state, 'playlist', id)
