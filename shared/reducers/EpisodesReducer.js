import Immutable, { fromJS } from 'immutable'
import Request from '../Request'
import clone from 'lodash'
import list from '../Data/helpers/list'
import formatRequest from '../utils/formatRequest'

const init = {
  episodes: [],
  ep_map: {},
  loaded: false,
  years: [],
  currentYear: null
}

export const RESET = 'EPISODES//RESET'
export const LOAD = 'EPISODES//LOAD'
export const LOAD_SUCCESS = 'EPISODES//LOAD_SUCCESS'
export const LOAD_FAIL = 'EPISODES//LOAD_FAIL'

export const SET_YEAR = 'EPISODES//SET_YEAR'

const defaultState = fromJS(list(init))

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
      nstate.list.loading = true
      nstate.list.error = false
      nstate.list.limit = action.payload.limit
      nstate.list.offset = action.payload.offset
      nstate.list.props = clone(action.payload.props)
      nstate.list.items = action.payload.reset ? [] : nstate.list.items
      break

    case LOAD_SUCCESS:
      nstate.list.loading = false
      nstate.list.error = null
      nstate.list.items = [...nstate.list.items, ...action.payload.items]
      nstate.list.hasMore = action.payload.hasMore
      nstate.list.total = action.payload.total
      break

    case LOAD_FAIL:
      nstate.loading = false
      nstate.error = action.payload.error
      break

    case RESET:
      nstate = list(nstate)
      break

    case SET_YEAR:
      nstate.currentYear = action.payload.year
      break
  }

  return fromJS(nstate)
}

export const load = (limit, offset, props, reset) => {
  return dispatch => {
    dispatch(loadRequest(limit, offset, props, reset))

    const query = formatRequest({
      limit,
      offset,
      ...props
    })

    Request.get(`/api/v1/podcasts?${query}`)
      .then(result => dispatch(loadSuccess(result.data)))
      .catch(err => dispatch(loadFail(err.message)))
  }
}

export const loadRequest = (limit, offset, props, reset) => ({
  type: LOAD,
  payload: {
    limit,
    offset,
    props,
    reset
  }
})

export const loadSuccess = data => ({
  type: LOAD_SUCCESS,
  payload: {
    ...data
  }
})

export const loadFail = error => ({
  type: LOAD_FAIL,
  payload: {
    error
  }
})

export const reset = () => ({
  type: RESET
})

export const setYear = year => ({
  type: SET_YEAR,
  payload: {
    year
  }
})
