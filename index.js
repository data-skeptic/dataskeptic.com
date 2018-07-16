'use strict'

const fs = require('fs')
const http = require('http')
const https = require('https')
const aws = require('aws-sdk')
const checkEnv = require('./shared/utils/checkEnv').default

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const isSSL = process.env.FORCE_SSL === 1 ? true : env === 'prod'
console.log('NODE_ENV', '=', env, 'FORCE_SSL', '=', isSSL)
// validate env config
try {
  checkEnv()
} catch (e) {
  throw e
  process.exit(1)
}

const app = require('./server').default

if (process.env.NODE_ENV === 'dev') {
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

const cert_path = './cert/'

var launch_with_ssl = function() {
  console.log('launch_with_ssl')
  const httpsOptions = {
    cert: fs.readFileSync(cert_path + 'cert.pem'),
    ca: [fs.readFileSync(cert_path + 'fullchain.pem')],
    key: fs.readFileSync(cert_path + 'privkey.pem')
  }

  var server = https
    .createServer(httpsOptions, app)
    .listen(process.env.HTTPS_PORT, '0.0.0.0', function() {
      console.log(`Serving in https on port ${process.env.HTTPS_PORT}`)
    })
  server.on('error', err => {
    console.log(`Failed to listen on port ${process.env.HTTPS_PORT}`)
    onError(err)
    console.log(err)
  })
  console.log('Attempt to load SSL 2')

  http
    .createServer(function(req, res) {
      const host = 'dataskeptic.com'
      res.writeHead(301, { Location: 'https://' + host + req.url })
      res.end()
    })
    .listen(80, process.env.HOST, err => {
      console.log("Failed to listen on 80")
      console.log(err)
      if (err) throw err
      console.dir()
    })

  recordingServer(server)
  console.log('Attempt to load SSL 3')
}

function forceSSL(req, res, next) {
  let redirect

  if (req.headers['host'].match(/^www/) !== null) {
    redirect = 'https://' + req.headers['host'].replace(/^www\./, '') + req.url
  } else if (req.headers['x-forwarded-proto'] !== 'https') {
    const host = req.headers['host'].replace(/^www\./, '')
    redirect = 'https://' + host + req.url
  }

  if (redirect) {
    res.writeHead(302, { Location: redirect })
    return res.end()
  }

  return next()
}

var launch_without_ssl = function() {
  console.log('Launch without SSL')
  app.listen(process.env.PORT, function() {
    console.log(`Server listening on ${process.env.PORT}`)
  })
}

function config_load_promise() {
  console.log("config_load_promise")
  var clp = new Promise(function(resolve, reject) {
    var files = ['cert.pem', 'fullchain.pem', 'privkey.pem', 'config.jsn']
    var bucket = 'config-dataskeptic.com'
    var promises = []
    if (!fs.existsSync(cert_path)) {
      console.log('Creating cert directory')
      fs.mkdirSync(cert_path, 777)
    }
    for (var file of files) {
      var s3Key = file
      var p = new Promise((resolve, reject) => {
        const params = { Bucket: bucket, Key: s3Key }
        s3
          .getObject(params)
          .createReadStream()
          .pipe(fs.createWriteStream(cert_path + s3Key))
          .on('close', () => {
            resolve(true)
          })
          .on('error', (er) => {
            console.log('ERROR!')
            console.log(er)
          })
      })
      promises.push(p)
    }
    return Promise.all(promises)
      .then(function() {
        var c = 0
        for (file of files) {
          if (fs.existsSync(cert_path + file)) {
            c += 1
          }
        }
        if (c == files.length) {
          resolve(true)
        } else {
          console.log('Found less files than expected: ' + c + ' instead of ' + files.length)
          resolve(false)
        }
      })
      .catch(function(err) {
        console.log('Errors getting files')
        console.log(err)
        resolve(false)
      })
  }).then(
    function(result) {
      console.log('Done, now launch with SSL')
      launch_with_ssl()
    },
    function(err) {
      console.log('Error loading config, assuming development run')
      console.log(err)
      launch_without_ssl()
    }
  )
}

if (env === 'prod') {
    console.log('===[Loading as prod]=============================')
    console.log('===[Loaded as prod]==============================')
    config_load_promise()
} else {
    console.log('Loading as dev.')
    launch_without_ssl()
}

console.log('RUNNING CONFIG ===>')
console.log(`Starting on ${process.env.PORT}`)
console.log(`Host is ${process.env.HOST}`)
