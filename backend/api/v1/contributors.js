const express = require('express')
import { orderBy } from 'lodash'

const c = require('../../../config/config.json')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_api = c[env]['base_api'] + env

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
    let contributors = cache().contributors
    
    contributors = filterItems(
      orderBy(
        Object.keys(contributors).map(id => ({
          ...contributors[id],
          id
        })),
        'sort_rank'
      ),
      q
    )

    return res.send(contributors)
  })

  router.get('/list', (req, res) => {
    const contributors = cache().contributors
    res.send(contributors)
  })

  router.post('/', (req, res) => {
    const data = req.body
    
    res.send(data)
  })
  
  return router
}
