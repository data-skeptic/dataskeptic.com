import superagent from 'superagent'
import config from './config'

const formatUrl = (path: string): string => {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  if (process.browser) {
    // Prepend `/api` to relative URL, to proxy to API server.
    return `/api${adjustedPath}`
  }
  // Prepend host and port of the API server to the path.
  return `http://localhost:${config.apiPort}${adjustedPath}`
}

let cached

const cache = (client) => {
  if (process.browser) {
    if (cached) {
      return cached
    }
    cached = client
  }
  return client
}

const initClient = (cookie) => {
  const send = async (request) => {
    if (cookie) {
      request.set('Cookie', cookie)
    }
    try {
      return (await request).body
    } catch (error) {
      if (error.status === 404) {
        return null
      }
      if (error.response.body) {
        throw error.response.body
      }
      throw error
    }
  }

  return cache({
    get: (path: string, params = {}) =>
      send(
        superagent
          .get(formatUrl(path))
          .accept('json')
          .query(params.params || params)
      ), // hack to accommodate webapp ApiClient API

    post: (
      path: string,
      data: Object = {},
      asParams?: boolean = false
    ): Object =>
      send(
        superagent
          .post(formatUrl(path))
          .accept('json')
          .type(asParams ? 'form' : 'json')
          .send(data)
      ),

    put: (path: string, data = {}) =>
      send(
        superagent.put(formatUrl(path)).accept('json').type('json').send(data)
      ),

    del: (path: string, params = {}) =>
      send(
        superagent
          .del(formatUrl(path))
          .accept('json')
          .send(params.params || params)
      )
  })
}

export default initClient
