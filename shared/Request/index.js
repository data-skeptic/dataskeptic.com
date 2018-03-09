import axios from 'axios'
import qs from 'qs'

const jsToFormData = data => {
  return qs.stringify(data)
}

const getRequest = (url, options = {}) => {
  return axios.get(url, options)
}

const postRequest = (url, data = {}, options = {}) => {
  return axios.post(url, data, options)
}

const postFromDataRequest = (url, data = {}, options = {}) => {
  data = jsToFormData(data)
  return axios.post(url, data, options)
}

const deleteRequest = (url, options = {}) => {
  return axios.delete(url, options)
}

const putRequest = (url, data = {}, options = {}) => {
  return axios.put(url, data, options)
}

const uploadRequest = (url, files = [], options = {}) => {
  const data = new FormData()
  files.forEach(file => {
    data.append('files', file)
  })

  return axios.put(url, data, options)
}

export default {
  get: getRequest,
  post: postRequest,
  postFormData: postFromDataRequest,
  upload: uploadRequest,
  delete: deleteRequest,
  put: putRequest
}
