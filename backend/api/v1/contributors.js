import { orderBy } from 'lodash'

const express = require('express')

const ContributorsService = require('../../modules/contributors/services/ContributorsService')

const filterItems = (items, query) => {
  if (!query) {
    return items
  }

  return items.filter(item => {
    return (
      item.prettyname.toLowerCase().indexOf(query) > -1 ||
      item.bio.toLowerCase().indexOf(query) > -1
    )
  })
}

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const { q } = req.query

    ContributorsService.getAllContributors()
      .then(data =>
        orderBy(
          Object.keys(data).map(id => ({
            ...data[id],
            id
          })),
          'sort_rank'
        )
      )
      .then(contributors => filterItems(contributors, q))
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.get('/list', (req, res) => {
    ContributorsService.getAllContributors()
      .then(contributors => res.send(contributors))
      .catch(err => res.send(err))
  })

  return router
}
