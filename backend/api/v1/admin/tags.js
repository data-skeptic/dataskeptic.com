import express from 'express'
import axios from 'axios'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../../../config/config.json')
const base_url = c[env]['base_api'] + env

const getTagsList = () =>
  axios.get(`${base_url}/drip/tag/list`).then(res => res.data)

const addTag = tag =>
  axios
    .post(`${base_url}/drip/tag/add`, {
      name: tag.tag_name,
      description: ''
    })
    .then(res => res.data)

const getUserTags = email =>
  axios
    .get(`${base_url}/drip/user/tag/list?email=${email}`)
    .then(res => res.data)

const addUserTag = (tag_id, email) =>
  axios
    .post(`${base_url}/drip/user/tag/add`, { tag_id, email })
    .then(res => res.data)

const filterTags = (items, query) => {
  if (query === '') {
    return items
  }

  return items.filter(
    item =>
      item.tag_name.toLowerCase().indexOf(query) > -1 ||
      item.descrip.toLowerCase().indexOf(query) > -1
  )
}

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    let { tag = '' } = req.query
    tag = tag.toLowerCase()

    getTagsList()
      .then(data => filterTags(data, tag))
      .then(data => res.send(data))
      .catch(err =>
        res.status(500).end({
          error: true,
          message: err.message
        })
      )
  })

  router.post('/', (req, res) => {
    const tag = req.body
    console.dir(tag)

    addTag(tag)
      .then(data => res.send(data))
      .catch(err =>
        res.status(500).end({
          error: true,
          message: err.message
        })
      )
  })

  router.get('/user', (req, res) => {
    const { email } = req.query

    getUserTags(email)
      .then(data => res.send(data))
      .catch(err =>
        res.status(500).end({
          error: true,
          message: err.message
        })
      )
  })

  router.post('/user', (req, res) => {
    res.send({
      success: true
    })
  })

  return router
}
