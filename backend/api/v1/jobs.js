const express = require("express")
const jobs_util = require("./jobs_util")

var elasticsearch = require("elasticsearch")

module.exports = cache => {
  const router = express.Router()

  router.get("/", function(req, res) {
    var q = "data"
    const city = req.session.ipInfo && req.session.ipInfo.city

    let location = req.query.location || city || "don't match"
    location = location.toLowerCase()

    var client = new elasticsearch.Client({
      host: process.env.ELASTIC_SEARCH_ENDPOINT,
      log: "warning"
    })

    var es_query = jobs_util.get_jobs_query(q, location)
    client.search(es_query).then(
      function(resp) {
        var hits = resp["hits"]["hits"]
        var results = jobs_util.format_results(hits)
        return res.status(200).end(JSON.stringify(results))
      },
      function(err) {
        return res.status(500).end(JSON.stringify(err.message))
      }
    )
  })

  return router
}
