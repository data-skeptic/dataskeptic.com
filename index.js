'use strict'

const fs = require('fs')
const http = require('http')
const https = require('https')
const aws = require('aws-sdk')
const checkEnv = require('./shared/utils/checkEnv').default()

const env = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const isSSL = process.env.FORCE_SSL === 1 ? true : env === 'prod'
console.log('NODE_ENV', '=', env, 'FORCE_SSL', '=', isSSL)

const app = require('./server').default

app.get('/ads.txt', (req, res, next) => {
  res.status(200).send('google.com, pub-4495792015968395, DIRECT, f08c47fec0942fa0');
});

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
  console.log('wepback.dev')
  require('./webpack.dev').default(app)
}

const recordingServer = require('./recordingServer').default

const aws_accessKeyId = process.env.AWS_ACCESS_KEY_ID
const aws_secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const aws_region = process.env.AWS_REGION
console.log(aws_accessKeyId)
aws.config.update({
  accessKeyId: aws_accessKeyId,
  secretAccessKey: aws_secretAccessKey,
  region: aws_region,
  s3BucketEndpoint: true,
  endpoint: "https://4sevcujref.execute-api.us-east-1.amazonaws.com"
})

const s3 = new aws.S3()

const onError = err => {
  fs.writeFile('./error.err', err, function(e) {
    if (e) {
      return console.log(err)
    }
  })
}

app.listen(process.env.PORT, function() {
  console.log(`Server listening on ${process.env.PORT}`)
})
console.log(`Server listening on ${process.env.PORT}`)
console.log('RUNNING CONFIG ===>')
console.log(`Starting on ${process.env.PORT}`)
console.log(`Host is ${process.env.HOST}`)
