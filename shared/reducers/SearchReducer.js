import Immutable from 'immutable';
import axios from "axios"
import {track} from "../Tracking/Search";

const init = {
    loading: false,
    loaded: false,
    query: null,
    results: []
}

const defaultState = Immutable.fromJS(init);

export const searchRequest = (dispatch, query = '') => {
	track(query)
	// encode query string
	query = encodeURIComponent(query)

	axios.get(`/api/search?q=${query}`)
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
	    nstate.query = action.payload.query;
	    nstate.results = []
      searchRequest(action.payload.dispatch, action.payload.query)
	    break;

  case 'SEARCH_SUCCESS':
	    nstate.loaded = true;
	    nstate.loading = false;
	    nstate.results = action.payload.data
	    break;

  case 'SEARCH_FAIL':
      nstate.loaded = false;
      nstate.loading = false;
      nstate.error = action.payload.data;
      break;

  }
  return Immutable.fromJS(nstate)
}