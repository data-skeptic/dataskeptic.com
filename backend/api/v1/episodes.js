const express = require('express')
const map = require('lodash/map')
const EpisodesServices = require('../../modules/episodes/services/EpisodesServices')

module.exports = cache => {
  const router = express.Router()

  router.get('/list', function(req, res) {
    const params = req['params']
    const query = req.query

    let url = req.url
    const x = req.url.indexOf('?')
    if (x > 0) {
      url = url.substring(0, x)
    }

    const offset = query['offset'] || 0
    const limit = query['limit'] || 10

    const pre = '/api/v1/episodes'
    url = url.substring(pre.length, url.length)

    EpisodesServices.getAll(
      url,
      cache().episodes_map,
      offset,
      limit,
      global.env
    )
      .then(episodes => {
        res.send(episodes)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.get('/get/:guid', function(req, res) {
    EpisodesServices.getEpisode(cache().episodes_map, req.params.guid)
      .then(episodes => {
        res.send(episodes)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.post('/multiple', (req, res) => {
    const guids = req.body
    const episodes_blog_map = cache().episodes_blog_map
    const episodes = guids.map(guid => episodes_blog_map[guid])
    res.send(episodes)
  })

  return router
}
