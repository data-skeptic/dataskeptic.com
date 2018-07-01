import axios from 'axios'
const express = require('express')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_url = process.env.BASE_API || 'https://4sevcujref.execute-api.us-east-1.amazonaws.com/prod'

module.exports = cache => {
  const router = express.Router()

  router.post('/search/result', function(req, res) {
    const { q } = req.body
    const user_agent = req.get('User-Agent')

    const data = {
      q,
      user_agent,
      ...req.session.ipInfo
    }

    axios
      .post(`${base_url}/tracking/search/result`, data)
      .then(result => res.send(result.data))
      .catch(err => res.send(err))
  })

  router.post('/jobs/impression', function(req, res) {
    const { job_id } = req.body
    const data = {
      job_id,
      ...req.session.ipInfo
    }

    axios
      .post(`${base_url}/tracking/jobs/impression`, data)
      .then(result => res.send(result.data))
      .catch(err => res.send(err))
  })

  router.post('/jobs/click', function(req, res) {
    const { job_id, impression_id } = req.body
    const data = {
      job_id,
      impression_id,
      ...req.session.ipInfo
    }

    axios
      .post(`${base_url}/tracking/jobs/click`, data)
      .then(result => res.send(result.data))
      .catch(err => res.send(err))
  })

  return router
}
