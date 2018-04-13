import Immutable, { fromJS } from 'immutable'
import {
  loadCareersCityJobsFail,
  loadCareersCityJobsRequest,
  loadCareersCityJobsSuccess
} from './JobsReducer'
import Request from '../Request'

const init = {
  episodes: [],
  ep_map: {},
  loaded: false,
  years: [],

  loading: false,
  error: null,
  list: [],
  single: null
}

export const LOAD = 'EPISODES//LOAD'
export const LOAD_SUCCESS = 'EPISODES//LOAD_SUCCESS'
export const LOAD_FAIL = 'EPISODES//LOAD_FAIL'

const defaultState = fromJS(init)

export default function EpisodesReducer(state = defaultState, action) {
  let nstate = state.toJS()

  switch (action.type) {
    case 'LOADING_EPISODES':
      nstate.episodes = []
      nstate.ep_map = {}
      nstate.loaded = false
      break
    case 'ADD_EPISODES':
      var episodes = action.payload
      //console.log("episodes")
      //console.log(episodes)
      nstate.episodes = episodes
      nstate.ep_map = {}
      for (var episode of episodes) {
        if (episode) {
          var guid = episode.guid
          if (guid) {
            nstate.ep_map[guid] = episode
          }
        } else {
          console.log('ERROR: got undefined episode')
        }
      }
      nstate.loaded = true
      break
    case 'SET_YEARS':
      nstate.years = action.payload
      break

    case LOAD:
      nstate.loading = true
      nstate.error = false
      break

    case LOAD_SUCCESS:
      nstate.loading = false
      nstate.error = null
      nstate.list = [nstate.list, ...action.payload.data]
      break

    case LOAD_FAIL:
      nstate.loading = false
      nstate.error = action.payload.error
      break
  }

  return fromJS(nstate)
}

export const load = (limit, offset) => {
  return dispatch => {
    dispatch(loadRequest(location))

    Request.get(`/api/v1/podcasts?limit=${limit}&offset=${offset}`)
      .then(result => dispatch(loadSuccess(result.data)))
      .catch(err => dispatch(loadFail(err)))
  }
}

export const loadRequest = (limit, offset) => ({
  type: LOAD,
  payload: {
    limit,
    offset
  }
})

export const loadSuccess = data => ({
  type: LOAD_SUCCESS,
  payload: {
    data
  }
})

export const loadFail = error => ({
  type: LOAD_FAIL,
  payload: {
    error
  }
})
