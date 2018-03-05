const express = require('express')
const MailServices = require('../../modules/mail/services/MailServices')

const formatAddress = ({
  city = '',
  country = '',
  line1 = '',
  line2 = '',
  postal_code = '',
  state = ''
}) =>
  `${line1}${' ' +
    line2}, ${city}, ${country.toUpperCase()}, ${state}, ${postal_code}`

module.exports = cache => {
  const router = express.Router()

  router.post('/', function(req, res) {
    MailServices.sendMail(req.body)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })

  router.post('/preview', function(req, res) {
    const data = req.body
    data.order.address = formatAddress(data.order.customer)

    let template

    try {
      template = MailServices.template(data)
    } catch (e) {
      console.log(e)
      return res
        .status(400)
        .send(`Email review generation failed. Check the logs.`)
    }

    res.send(template)
  })

  return router
}
