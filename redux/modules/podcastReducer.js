const LOAD_EPISODES = 'LOAD_EPISODES'
const LOAD_EPISODES_SUCCESS = 'LOAD_EPISODES_SUCCESS'
const LOAD_EPISODES_FAIL = 'LOAD_EPISODES_FAIL'
const SET_ACTIVE_YEAR = 'SET_ACTIVE_YEAR'

const LOAD_YEARS = 'LOAD_YEARS'
const LOAD_YEARS_SUCCESS = 'LOAD_YEARS_SUCCESS'
const LOAD_YEARS_FAIL = 'LOAD_YEARS_FAIL'

const LOAD_EPISODE = 'LOAD_EPISODE'
const LOAD_EPISODE_SUCCESS = 'LOAD_EPISODE_SUCCESS'
const LOAD_EPISODE_FAIL = 'LOAD_EPISODE_FAIL'

const initialState = {
  loading: false,
  error: false,
  episodes: null,
  single: null,
  years: null,
  activeYear: null,
}

export default function reducer(state = initialState,
                                action = {}) {
  switch (action.type) {
    case LOAD_EPISODES:
      return {
        ...state,
        loading: true
      }
    case LOAD_EPISODES_SUCCESS:
      return {
        ...state,
        episodes: action.result
      }
    case LOAD_YEARS:
      return {
        ...state,
        loading: true
      }
    case LOAD_YEARS_SUCCESS:
      return {
        ...state,
        years: action.result
      }
    case SET_ACTIVE_YEAR:
      return {
        ...state,
        activeYear: action.payload.selectedYear
      }
    default:
      return state
  }
}


export const loadEpisodesList = () => ({
  types: [LOAD_EPISODES, LOAD_EPISODES_SUCCESS, LOAD_EPISODES_FAIL],
  promise: client => client.get('/episodes')
})
export const loadSingleEpisode = id => ({
  types: [LOAD_EPISODE, LOAD_EPISODE_SUCCESS, LOAD_EPISODE_FAIL],
  promise: client => client.get(`/episodes/${id}`)
})
export const loadYears = () => ({
  types: [LOAD_YEARS, LOAD_YEARS_SUCCESS, LOAD_YEARS_FAIL],
  promise: client => client.get(`/episodes/years`)
})

export const setActiveYear = selectedYear => ({
  type: SET_ACTIVE_YEAR,
  payload: {
    selectedYear
  }
})


//Selectors
export const getEpisodes = state => state.podcasts && state.podcasts.episodes

export const getSingle = state => state.podcasts && state.podcasts.single

export const getActiveYear = state => state.podcasts && state.podcasts.activeYear

export const getYears = state => state.blogs && state.blogs.years

//Helpers
export const hasEpisodes = state => state.podcasts && !!state.podcasts.episodes

export const hasYears = state => state.podcasts && !!state.podcasts.years