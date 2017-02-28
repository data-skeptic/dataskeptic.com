import {compose, createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import thunk from 'redux-thunk';

import { routerStateReducer, reduxReactRouter } from 'redux-react-router';

import createHistory from 'history/lib/createBrowserHistory';

const createAppStore = compose(
	reduxReactRouter({createHistory}),
	applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState){
	const store = createAppStore(rootReducer, initialState);

	return store;
};