import Immutable, {List} from "immutable"
import Request from "../Request"

const LOAD_CAREERS_CITY = "LOAD_CAREERS_CITY"
const LOAD_CAREERS_CITY_SUCCESS = "LOAD_CAREERS_CITY_SUCCESS"
const LOAD_CAREERS_CITY_FAIL = "LOAD_CAREERS_CITY_FAIL"

const LOAD_CAREERS_CITY_JOBS = "LOAD_CAREERS_CITY_JOBS"
const LOAD_CAREERS_CITY_JOBS_SUCCESS = "LOAD_CAREERS_CITY_JOBS_SUCCESS"
const LOAD_CAREERS_CITY_JOBS_FAIL = "LOAD_CAREERS_JOBS_CITY_FAIL"

const init = {
  resume: {
    submitted: false,
    submitting: false,
    error: false,
    files: null
  },
  city: {
    loading: false,
    loaded: false,
    error: null,
    blogs: [],
    events: [],
    jobs: []
  }
}

const defaultState = Immutable.fromJS(init)

export default function jobReducer(state = defaultState, action) {
  switch (action.type) {
    case 'UPLOAD_RESUME':
      state = state.setIn(['resume', 'files'], action.payload)
      break

    case 'SUBMIT_RESUME':
      state = state.setIn(['resume', 'submitted'], false)
      state = state.setIn(['resume', 'submitting'], true)
      state = state.setIn(['resume', 'error'], false)
      break

    case 'SUBMIT_RESUME_SUCCESS':
      state = state.setIn(['resume', 'submitted'], true)
      state = state.setIn(['resume', 'submitting'], false)
      state = state.setIn(['resume', 'error'], false)
      break

    case 'SUBMIT_RESUME_FAIL':
      state = state.setIn(['resume', 'submitted'], false)
      state = state.setIn(['resume', 'submitting'], false)
      state = state.setIn(['resume', 'error'], action.payload.error)
      break
    
    case LOAD_CAREERS_CITY:
    case LOAD_CAREERS_CITY_JOBS:
      state = state.setIn(["city", "loading"], true)
      state = state.setIn(["city", "loaded"], false)
      state = state.setIn(["city", "error"], null);
      break;
      
    case LOAD_CAREERS_CITY_SUCCESS:
      state = state.setIn(["city", "blogs"], List(action.payload.result.blogs));
      state = state.setIn(["city", "events"], List(action.payload.result.events));
      break;
    
    case LOAD_CAREERS_CITY_JOBS_SUCCESS:
      state = state.setIn(["city", "jobs"], List(action.payload.result));
      break;

    case LOAD_CAREERS_CITY_FAIL:
    case LOAD_CAREERS_CITY_JOBS_FAIL:
      state = state.setIn(["city", "loading"], false)
      state = state.setIn(["city", "loaded"], false)
      state = state.setIn(["city", "error"], action.payload.error);
      break;
  }

  return state
}

export const submitResume = (dispatch, data) => {
  dispatch({
    type: 'SUBMIT_RESUME'
  })

  Request.post("/api/v1/careers", data)
    .then(res => {
      if (!res.data.success) {
        throw Error(res.data.error)
      }

      dispatch({
        type: 'SUBMIT_RESUME_SUCCESS',
        payload: {
          data: res.data
        }
      })
    })
    .catch(error =>
      dispatch({
        type: 'SUBMIT_RESUME_FAIL',
        payload: {
          error: error.message
        }
      })
    )
}

export const loadCareersCityData = city => {
  return dispatch => {
    dispatch(loadCareersCityRequest(city))

    Request.get(`/api/v1/careers/city/${city}`)
      .then(result => dispatch(loadCareersCitySuccess(result.data)))
      .catch(err => dispatch(loadCareersCityFail(err)))
  }
}

export const loadCareersCityRequest = city => ({
  type: LOAD_CAREERS_CITY,
  payload: {
    city
  }
})

export const loadCareersCitySuccess = result => ({
  type: LOAD_CAREERS_CITY_SUCCESS,
  payload: { result }
})

export const loadCareersCityFail = error => ({
  type: LOAD_CAREERS_CITY_FAIL,
  payload: { error }
})

export const loadCareersCityJobs = (location = '') => {
  return dispatch => {
    dispatch(loadCareersCityJobsRequest(location))

    Request.get(`/api/v1/jobs?location=${location}`)
      .then(result => dispatch(loadCareersCityJobsSuccess(result.data)))
      .catch(err => dispatch(loadCareersCityJobsFail(err)))
  }
}

export const loadCareersCityJobsRequest = city => ({
  type: LOAD_CAREERS_CITY_JOBS,
  payload: {
    city
  }
})

export const loadCareersCityJobsSuccess = result => ({
  type: LOAD_CAREERS_CITY_JOBS_SUCCESS,
  payload: { result }
})

export const loadCareersCityJobsFail = error => ({
  type: LOAD_CAREERS_CITY_JOBS_FAIL,
  payload: { error }
})

export const loadCareersCity = (city) => {
  return (dispatch) => {
    dispatch(loadCareersCityData(city))
    dispatch(loadCareersCityJobs(city))
  }
}
