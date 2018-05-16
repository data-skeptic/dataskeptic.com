import React from 'react'
import { render } from 'react-dom'
import ReactGA from 'react-ga'
import { Router, browserHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux'
import * as reducers from 'reducers'
import routes from 'routes'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import promiseMiddleware from 'lib/promiseMiddleware'
import immutifyState from 'lib/immutifyState'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import axios from 'axios'

import '../shared/styles/main.less'

import { reducer as formReducer } from 'redux-form'

const getInitialState = state => state

const initialState = immutifyState(getInitialState(window.__INITIAL_STATE__))

const history = createBrowserHistory()

const reducer = combineReducers({
  form: formReducer,
  ...reducers
})

const store = applyMiddleware(thunk, promiseMiddleware)(createStore)(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

var env = 'prod'

if (process.env.NODE_ENV != 'production') {
  env = 'dev'
} else {
  console.log('index.jsx env=' + process.env.NODE_ENV)
  console.log('Initialize GA')
  ReactGA.initialize('UA-51062432-1', {
    debug: false
  })
}

var country = 'us'
store.dispatch({ type: 'SET_STORE_ENVIRONMENT', payload: env })
store.dispatch({ type: 'SET_BLOG_ENVIRONMENT', payload: env })
store.dispatch({ type: 'SET_COUNTRY', payload: country })
store.dispatch({
  type: 'INITIALIZE_SITE',
  payload: { dispatch: store.dispatch }
})

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router children={routes} history={browserHistory}  />
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('react-view'))

if (module.hot) {
  module.hot.accept()
}
