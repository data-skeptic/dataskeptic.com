const express = require("express")
const jobs_util = require("./jobs_util")

var elasticsearch = require("elasticsearch")

module.exports = cache => {
  const router = express.Router()

  router.get("/", function(req, res) {
    var q = "data"
    const location = jobs_util.extractLocation(req)
    var client = new elasticsearch.Client({
      host: process.env.ELASTIC_SEARCH_ENDPOINT,
      log: "warning"
    })

    jobs_util.getJobs(q, location)
      .then(results => res.send(results))
      .catch(err => res.status(500).send(err.message))
  })

  return router
}
