const express = require("express")
const Influx = require("influx")
const sanitizeHtml = require("sanitize-html")
const truncate = require("truncate")

const jobs_util = require("./jobs_util")

const c = require("../../../config/config.json")
const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"

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
