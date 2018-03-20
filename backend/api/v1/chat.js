const express = require("express")
const chat_utils = require("./chat_utils")

module.exports = cache => {
  const router = express.Router()

  router.post("/log", (req, res) => {
    try {
      chat_utils.logMessage(req.body)
    } catch (error) {
      res.status(500).send({
        success: false,
        error
      })
    }

    res.send({
      success: true
    })
  })

  return router
}
