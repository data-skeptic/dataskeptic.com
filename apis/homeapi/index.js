import axios from "axios"
var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'
var base_url = "https://4sevcujref.execute-api.us-east-1.amazonaws.com/" + env + "/cms"

/**
 * Retrieve session data
 *
 * @returns {Promise} - Result of ajax call
 */
export async function getFeaturesAPI (pageType) {
  // Support both /sessions and /sessions/:token
  return axios.get(`${base_url}${pageType ? '/' + pageType : ''}`)
}