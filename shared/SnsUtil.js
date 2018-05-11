const aws = require('aws-sdk')

if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config()
}

/*
Member signup		ds-new-mbr
Member login		ds-mem-log
Item sold			ds-salesuc
RFC login			ds-rfc-log
New episode posted	ds-new-epi
New blog posted		ds-newblog
*/

var aws_accessKeyId = process.env.AWS_ACCESS_KEY_ID
var aws_secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
var aws_region = process.env.AWS_REGION

aws.config.update({
  accessKeyId: aws_accessKeyId,
  secretAccessKey: aws_secretAccessKey,
  region: aws_region
})

function snserror(location, msg, topic) {
  // For now errors and alert are the same,
  // but eventually it will be two separate Topics
  // Maybe other changes too.
  snsalert(location, msg, topic)
}

function snsalert(details, msg, topic) {
  console.log('snsalert: ' + msg)
  if (topic == undefined) {
    topic = 'ds-error'
  }
  var sns = new aws.SNS()
  var endpointArn = 'arn:aws:sns:us-east-1:085318171245:' + topic
  console.log(endpointArn)
  var payload = {
    default: 'Site error: ' + JSON.stringify({ details, msg }),
    APNS: {
      aps: {
        details,
        msg
      }
    }
  }
  payload.APNS = JSON.stringify(payload.APNS)
  payload = JSON.stringify(payload)
  sns.publish(
    {
      Message: payload,
      MessageStructure: 'json',
      TargetArn: endpointArn
    },
    function(err, data) {
      if (err) {
        console.log(err.stack)
        return
      }
      console.log('push sent')
      console.log(data)
    }
  )
}

export { snsalert, snserror }
