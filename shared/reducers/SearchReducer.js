import Immutable from 'immutable';
import { fromJS } from 'immutable';
import querystring from 'querystring'
import axios from "axios"
import snserror from '../SnsUtil'
import { load_blogs } from '../daos/serverInit'
const aws = require('aws-sdk')

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'

const config = require('../../config/config.json');

var base_url = config[env]['base_api'] + env

const init = {
    loading: false,
    loaded: false,
    result: []
}

const defaultState = Immutable.fromJS(init);

const searchRequest = (dispatch, query) => {
	const url = base_url + "/blog/search"
  const payload = {query}
  alert('SEARCH') // TODO: implement correct response
	axios.post(url, payload)
		.then((result) => {
			dispatch({
        type: 'SEARCH_SUCCESS',
        payload: {
            data: result.data
        }
      })
		})
		.catch((err) => {
			dispatch({
				type: 'SEARCH_FAIL',
				payload: {
					data: err
				}
			})
		})
}

export default function cmsReducer(state = defaultState, action) {
  var nstate = state.toJS()
  switch(action.type) {
    case 'SEARCH':
	    nstate.loaded = false;
	    nstate.loading = true;
	    nstate.erorr = null;
	    nstate.result = []
      searchRequest(action.payload.dispatch, action.payload.query)
	    break;

  case 'SEARCH_SUCCESS':
	    nstate.loaded = false;
	    nstate.loading = true;
	    nstate.result = action.payload.data
	    break;

  case 'SEARCH_FAIL':
      nstate.loaded = false;
      nstate.loading = false;
      nstate.error = action.payload.data;
      break;

  }
  return Immutable.fromJS(nstate)
}