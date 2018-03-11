const express = require('express')

const ContributorsService = require('../../modules/contributors/services/ContributorsService')

module.exports = cache => {
  const router = express.Router()
  router.get('/list', function(req, res) {
    ContributorsService.getAllContributors()
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })
  return router
}
