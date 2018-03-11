const express = require('express')

const RelatedService = require('../../modules/related/services/RelatedServices')

module.exports = cache => {
  const router = express.Router()

  router.get('/', function(req, res) {
    RelatedService.getAll()
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })
  return router
}
