import { GET_FEATURES_SUCCESS, GET_FEATURES_FAIL, GET_FEATURES_PENDING } from '../../actions/home'

const initialState = {
  features: [],
  featuresLoaded: false,
  errors: {}
}

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEATURES_PENDING:
      return {
        ...state,
        errors: {},
        featuresLoaded: false
      }
    case GET_FEATURES_SUCCESS: {
      const { features } = action.payload
      return {
        ...state,
        features,
        featuresLoaded: true
      }
    }
    case GET_FEATURES_FAIL: {
      return {
        ...state,
        errors: 'failed'
      }
    }
    default: {
      return state
    }
  }
}