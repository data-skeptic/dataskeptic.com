import { combineReducers } from 'redux'
import router from './router'
import {default as blogs} from './blogReducer'
import {default as podcasts } from './podcastReducer'

export default combineReducers({
    router,
    blogs,
    podcasts
})
