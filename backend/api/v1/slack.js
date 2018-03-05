var slack_key = ''

const express = require('express')

const SlackServices = require('../../modules/slack/services/SlackServices')

module.exports = cache => {
  const router = express.Router()

  router.post('/join', function(req, res) {
    SlackServices.joinSlack(req.body, slack_key)
      .then(contributors => {
        res.send(contributors)
      })
      .catch(err => {
        res.send(err)
      })
  })
  return router
}
