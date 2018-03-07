const express = require('express')
const { getEmail } = require('../../../shared/Emails/template')
const rfcService = require('../../modules/rfc/services/rfcService')

module.exports = cache => {
  const router = express.Router()

  router.get('/list', function(req, res) {
    rfcService
      .getRFC()
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.post('/email_test', (req, res) => {
    const data = req.body
    const type = req.body && req.body.type
    res.send(getEmail(data, type))
  })
  return router
}
