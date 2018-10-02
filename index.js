'use strict'

var fs = require('fs')
var http = require('http')
var https = require('https')
var aws = require('aws-sdk')
var checkEnv = require('./shared/utils/checkEnv').default

var env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
var isSSL = process.env.FORCE_SSL === 1 ? true : env === 'prod'
console.log('NODE_ENV', '=', env, 'FORCE_SSL', '=', isSSL)
// validate env config

var app = require('./server').default

if (process.env.NODE_ENV === 'dev') {
  console.log('wepback.dev')
  require('./webpack.dev').default(app)
}

console.log("Start recording server")
var recordingServer = require('./recordingServer').default
console.log("End recording server")

var aws_accessKeyId = process.env.AWS_ACCESS_KEY_ID
var aws_secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
var aws_region = process.env.AWS_REGION

aws.config.update({
  accessKeyId: aws_accessKeyId,
  secretAccessKey: aws_secretAccessKey,
  region: aws_region
})

var s3 = new aws.S3()

var onError = err => {
  fs.writeFile('./error.err', err, function(e) {
    if (e) {
      return console.log(err)
    }
  })
}

var cert_path = './cert/'

var launch_with_ssl = function() {
  console.log('launch_with_ssl')
  var httpsOptions = {
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
      var host = 'dataskeptic.com'
      res.writeHead(301, { Location: 'https://' + host + req.url })
      res.end()
    })
    .listen(80, process.env.HOST, err => {
      console.log("Failed to listen on 80")
      console.log(err)
      if (err) throw err
      console.dir()
    })

  console.log("start recording server.")
  recordingServer(server)
  console.log('Attempt to load SSL 3')
}

function forceSSL(req, res, next) {
  let redirect

  if (req.headers['host'].match(/^www/) !== null) {
    redirect = 'https://' + req.headers['host'].replace(/^www\./, '') + req.url
  } else if (req.headers['x-forwarded-proto'] !== 'https') {
    var host = req.headers['host'].replace(/^www\./, '')
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

function get_file(resolve, reject, bucket, s3Key) {
        /*
    console.log("Going to load " + bucket + " " + s3Key)
    var params = { Bucket: bucket, Key: s3Key }
        s3
          .getObject(params)
          .createReadStream()
          .pipe(fs.createWriteStream(cert_path + s3Key))
          .on('close', () => {
            console.log("close " + s3Key)
            resolve(true)
          })
          .on('error', (er) => {
            console.log('ERROR! ' + s3Key)
            console.log(er)
            reject(er)
          })
console.log('aws.config')
console.log(aws.config)
    var r = new aws.S3().getObject(params, function(err, data) {
      console.log("Got past get object for " + s3Key)
        if (err) {
          console.log("err")
          console.log(err)
          console.log(err.stack)
          reject(err)
        } else {
            console.log("!!!")
            var fname = cert_path + s3Key
            console.log(fname)
            var body = data.Body.toString()
            //console.log(body);
            fs.writeFile(fname, body, function(err) {
              if (err) {
                console.log(s3Key)
                console.log(err)
              }
              console.log(s3Key + " saved to " + fname)
              resolve(s3Key)
            })
        }
    });
    return r
          */
}

function config_load_promise() {
  console.log("config_load_promise")
  var clp = new Promise(function(resolve, reject) {
    console.log("Start of clp promise")
    var files = ['cert.pem', 'fullchain.pem', 'privkey.pem']
    var bucket = 'config-dataskeptic.com'
    var promises = []
    console.log(cert_path)
    if (!fs.existsSync(cert_path)) {
      console.log('Creating cert directory')
      fs.mkdirSync(cert_path, 777)
    }
    for (var i=0; i < files.length; i++) {
      var s3Key = files[i]
      var p = new Promise((resolve, reject) => {
        var r = get_file(resolve, reject, bucket, s3Key)
      })
      promises.push(p)
      console.log(promises.length)
    }
    return Promise.all(promises)
      .then(function() {
        console.log("After all promises")
        var c = 0
        for (var file of files) {
          if (fs.existsSync(cert_path + file)) {
            c += 1
          }
        }
        if (c == files.length) {
          console.log("Loaded all files")
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
      launch_without_ssl()
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
    //config_load_promise()
    launch_without_ssl()
} else {
    console.log('Loading as dev.')
    launch_without_ssl()
}

console.log('RUNNING CONFIG ===>')
console.log(`Starting on ${process.env.PORT}`)
console.log(`Host is ${process.env.HOST}`)
