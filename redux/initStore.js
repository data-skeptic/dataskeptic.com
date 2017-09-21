import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import clientMiddleware from './middleware/clientMiddleware'
import routerMiddleware from './middleware/routerMiddleware'
import { routingInit } from './modules/router'
import reducer from './modules/reducer'

const initStore = (initialState = {}, client) => {
  if (process.browser && window.__store) {
    return window.__store
  }

  const middleware = [routerMiddleware(), clientMiddleware(client)]

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  if (process.browser) {
    window.__store = store
    store.dispatch(routingInit())
  }

  return store
}

export default initStore
