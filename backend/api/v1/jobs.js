const express = require("express")
const jobs_util = require("./jobs_util")

module.exports = cache => {
  const router = express.Router()

  router.get("/", function(req, res) {
    var q = "data"
    const location = jobs_util.extractLocation(req)

    jobs_util.getJobs(q, location)
      .then(results => res.send(results))
      .catch(err => res.status(500).send(err.message))
  })

  return router
}
