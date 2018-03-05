const express = require('express')

const RefreshService = require('../../modules/refresh/services/RefreshService')

module.exports = cache => {
  const router = express.Router()

  router.get('/', function(req, res) {
    RefreshService.doRefresh()
      .then(status => {
        res.send(status)
      })
      .catch(err => {
        res.send(err)
      })
  })
  return router
}
