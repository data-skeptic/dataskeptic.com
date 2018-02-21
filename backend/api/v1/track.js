import axios from "axios"
const express = require("express")

const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
const c = require("../../../config/config.json")
const base_url = c[env]["base_api"] + env

module.exports = cache => {
  const router = express.Router()

  router.post("/jobs/impression", function(req, res) {
    const { job_id } = req.body
    const data = {
       job_id,
        ...req.session.ipInfo
    }

    axios
      .post(`${base_url}/tracking/jobs/impression `, data)
      .then(result => res.send(result.data))
      .catch(err => res.send(err))
  })

  router.post("/jobs/click", function(req, res) {
    const { job_id, impression_id } = req.body
    const data = {
      job_id,
	    impression_id,
      ...req.session.ipInfo
    }

    axios
      .post(`${base_url}/tracking/jobs/click `, data)
      .then(result => res.send(result.data))
      .catch(err => res.send(err))
  })

  return router
}
