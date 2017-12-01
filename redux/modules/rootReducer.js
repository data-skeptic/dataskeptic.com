import { combineReducers } from 'redux'
import router from './router'
import {default as blogs} from './blogReducer'

export default combineReducers({
    router,
    blogs
})
