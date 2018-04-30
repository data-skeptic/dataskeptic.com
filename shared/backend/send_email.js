import aws from 'aws-sdk'
import { getEmail } from '../../shared/Emails/template'

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

if (!aws.config.region) {
  aws.config.update({
    region: process.env.AWS_REGION
  })
}

module.exports = {
  send_email: function(req, res) {
    var email = config[env].emails.orders
    var obj = req.body
    console.log(obj)
    var msg = obj['msg']
    var to = obj['to']
    var type = obj['type'] || 'default'
    var send_headers = obj['send_headers']
    var toa = [to]
    aws.config.update({ region: 'us-east-1' })
    var ses = new aws.SES({ apiVersion: '2010-12-01' })
    var from = email
    var subject = obj['subject']
    var resp = { status: 200, msg: 'ok' }
    var body = getEmail(obj, type)
    var email_request = {
      Source: from,
      Destination: { ToAddresses: toa, BccAddresses: [email] },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: body
          }
        }
      }
    }
    ses.sendEmail(email_request, function(err, data) {
      if (err != null) {
        console.log(err)
        return res.status(500).end(JSON.stringify(err))
      } else {
        resp = { status: 200, msg: err }
        return res.status(200).end(JSON.stringify(resp))
      }
    })
  }
}
