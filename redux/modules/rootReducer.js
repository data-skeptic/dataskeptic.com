import { combineReducers } from 'redux'
import router from './router'
import {default as blogs} from './blogReducer'
import {default as podcasts } from './podcastReducer'
import {default as home} from './homeReducer'
import {default as player} from './playerReducer'
import {default as shop } from './shopReducer'
import auth from './auth'

export default combineReducers({
    router,
    home,
    blogs,
    podcasts,
    player,
    shop,
    auth
})
