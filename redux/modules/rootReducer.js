import { combineReducers } from 'redux'
import router from './router'
import {default as blogs} from './blogReducer'
import {default as podcasts } from './podcastReducer'
import {default as home} from './homeReducer'

export default combineReducers({
    router,
    home,
    blogs,
    podcasts,

})
