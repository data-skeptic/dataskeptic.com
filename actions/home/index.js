import { getFeaturesAPI } from '../../apis/homeapi'

// Define action types
export const GET_FEATURES_PENDING = 'GET_FEATURES_PENDING'
export const GET_FEATURES_SUCCESS = 'GET_FEATURES_SUCCESS'
export const GET_FEATURES_FAIL = 'GET_FEATURES_FAIL'

export const GET_FEATURES = async pageType => {
  try {
    const res = await getFeaturesAPI(pageType)
    return { type: GET_FEATURES_SUCCESS, payload: { features: res.data } }
  } catch (err) {
    return { type: GET_FEATURES_FAIL, payload: err.response }
  }
}