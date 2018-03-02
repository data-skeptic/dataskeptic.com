import Immutable from "immutable"
import axios from 'axios'

const init = {
  resume: {
    submitted: false,
    error: true
  }
}

const defaultState = Immutable.fromJS(init)

export default function jobReducer(state = defaultState, action) {
  switch (action.type) {
    case "SUBMIT_RESUME":
      state = state.setIn(["resume", "submitted"], false)
      state = state.setIn(["resume", "error"], false)
      break

    case "SUBMIT_RESUME_SUCCESS":
      state = state.setIn(["resume", "submitted"], true)
      state = state.setIn(["resume", "error"], false)
      break

    case "SUBMIT_RESUME_FAIL":
      state = state.setIn(["resume", "submitted"], true)
      state = state.setIn(["resume", "error"], action.payload.error)
      break
  }

  return state
}

export const submitResume = (dispatch, data) => {
  axios
    .post("/api/v1/career", data)
    .then(res =>
      dispatch({
        type: "SUBMIT_RESUME_SUCCESS",
        payload: {
          data: res.data
        }
      })
    )
    .catch(error =>
      dispatch({
        type: "SUBMIT_RESUME_SUCCESS",
        payload: {
          error
        }
      })
    )
}
