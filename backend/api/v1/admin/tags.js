import express from 'express'
import axios from 'axios'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../../../config/config.json')
const base_url = c[env]['base_api'] + env

const getUserTags = email =>
  axios
    .get(`${base_url}/drip/user/tag/list?email=${email}`)
    .then(res => res.data)

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const email = req.query.email

    getUserTags(email)
      .then(data => res.send(data))
      .catch(err =>
        res.status(500).end({
          error: true,
          message: err.message
        })
      )
  })

  return router
}
