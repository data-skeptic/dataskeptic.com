const express = require('express')

const axios = require('axios')

const c = require('../../../config/config.json')
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_api = c[env]['base_api'] + env

const getTotal = () => {
  const url = base_api + `/podcast/episodes/list?limit=99999`
  return axios.get(url).then(res => res.data.length)
}

const getEpisodes = (limit, offset) => {
  const url =
    base_api + `/podcast/episodes/list?limit=${limit}&offset=${offset}`
  return axios.get(url).then(res => res.data)
}

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const { limit = 10, offset = 0 } = req.query

    return Promise.all([getEpisodes(limit, offset), getTotal()])
      .then(([list, total]) => {
        res.send({
          list,
          limit,
          offset,
          total
        })
      })
      .catch(error =>
        res.status(500).send({ success: false, error: error.data.errorMessage })
      )
  })

  return router
}
