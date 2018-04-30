const express = require('express')
const axios = require('axios')
const jobs_util = require('./jobs_util')

const base_api = process.env.BASE_API

const addJob = data => {
  const url = `${base_api}/careers/jobs/add`

  return axios.post(url, data).then(res => res.data)
}

const getJobsAdds = () =>
  axios.get(`${base_api}/store/ads/list`).then(res => res.data)

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
      .then(result => {
        if (result.error) {
          console.error(result)
          res.status(500).send({
            error: result.error
          })
        }

        return res.send(result)
      })
      .catch(err => res.status(500).send(err.message))
  })

  router.get('/ads', (req, res) => {
    getJobsAdds()
      .then(results => res.send(results.Items))
      .catch(error =>
        res.status(500).send({ success: false, error: error.message })
      )
  })

  return router
}
