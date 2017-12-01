import { combineReducers } from 'redux'
import router from './router'
import {default as blogReducer} from './blogReducer'

export default combineReducers({
    router,
    blogReducer

})
