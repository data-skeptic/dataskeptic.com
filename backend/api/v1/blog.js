const express = require('express')
const BlogServices = require('../../modules/blog/services/BlogServices')

const generatePrettyName = (category, year, name) =>
  `/${category}/${year}/${name}`

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const params = req['params']
    const query = req.query

    let url = req.url
    const x = req.url.indexOf('?')
    if (x > 0) {
      url = url.substring(0, x)
    }

    const offset = query['offset'] || 0
    const limit = query['limit'] || 10

    const pre = '/api/v1/blogs'
    url = url.substring(pre.length, url.length)

    BlogServices.getAll(
      url,
      cache().blogmetadata_map,
      offset,
      limit,
      global.env
    )
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.get('/:category/:year/:name', (req, res) => {
    const prettyName = generatePrettyName(
      req.params.category,
      req.params.year,
      req.params.name
    )

    BlogServices.getPost(
      cache().blogmetadata_map,
      cache().episodes_content,
      prettyName,
      cache().content_map
    )
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.get('/rss', (req, res) => {
    const prettyName = generatePrettyName(
      req.params.category,
      req.params.year,
      req.params.name
    )

    BlogServices.getBlogRss(cache().blogmetadata_map, prettyName)
      .then(data => {
        res.status(200).end(data)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.get('/categories', (req, res) => {
    BlogServices.getCategories(cache().folders)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })

  return router
}
