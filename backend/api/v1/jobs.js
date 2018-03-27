const express = require('express')
const jobs_util = require('./jobs_util')

const c = require('../../../config/config.json')
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_api = c[env]['base_api'] + env

const addJob = (job) => {
  const url =`${base_api}/careers/jobs/add`
  console.log(url)
  
  return axios.post(url)
    .then((res) =>res.data )
}

module.exports = cache => {
  const router = express.Router()

  router.get('/', function(req, res) {
    var q = 'data'
    const location = jobs_util.extractLocation(req)

    jobs_util
      .getJobs(q, location)
      .then(results => res.send(results))
      .catch(err => res.status(500).send(err.message))
  })
  
  router.post('/', (req, res) => {
    const data = req.body

    addJob(data)
      .then(result => res.send(result))
      .catch(err => res.status(500).send(err.message))
  })

  return router
}
