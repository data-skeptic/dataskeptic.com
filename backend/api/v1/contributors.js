const express = require('express')

const ContributorsService = require('../../modules/contributors/services/ContributorsService')

const filterItems = (items, query) =>
  items.filter(item => item.prettyname.toLowerCase().indexOf(query) > -1)

module.exports = cache => {
  const router = express.Router()

  router.get('/list', function(req, res) {
    const {q } = req.query
    
    ContributorsService.getAllContributors()
      .then(contributors => filterItems(contributors, q))
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })

  return router
}
