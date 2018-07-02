const express = require('express')

const axios = require('axios')
const base_api = process.env.BASE_API

const getEpisodes = (limit, offset, year) => {
  let url = base_api + `/podcast/episodes/list?limit=${limit}&offset=${offset}`

  if (year) {
    url += `&year=${year}`
  }
  return axios.get(url).then(res => res.data)
}

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const limit = +req.query.limit || 10
    const offset = +req.query.offset || 0
    const { year, firstLoad } = req.query

    let realLimit = limit
    let realOffset = offset

    if (firstLoad && offset !== 0) {
      realLimit = realOffset
      realOffset = 0
    }

    getEpisodes(realLimit, realOffset, year)
      .then(function (result) {
        var total = result['total']
        var episodes = result['episodes']
        const hasMore = limit + offset <= total

        res.send({
          items: episodes,
          limit,
          offset,
          total,
          hasMore
        })
      })
      .catch(error =>
        res.status(500).send({ success: false, error: error.data.errorMessage })
      )
  })

  return router
}
