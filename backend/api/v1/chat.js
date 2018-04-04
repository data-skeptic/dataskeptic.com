const express = require('express')
const chat_utils = require('./chat_utils')

module.exports = cache => {
  const router = express.Router()

  router.post('/log', (req, res) => {
    const user = req.user
    try {
      const message = {
        ...req.body,
        user
      }
      chat_utils.logMessage(message)
    } catch (error) {
      console.error(error)
      return res.status(500).send({
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
