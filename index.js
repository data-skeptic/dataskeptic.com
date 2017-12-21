'use strict';

const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https')
const path = require('path')
const passport = require('passport')
const aws = require('aws-sdk')
const s3 = new aws.S3();

const onError = (err) => {
    fs.writeFile('./error.err', err, function(e) {
        if (e) {
            return console.log(err)
        }
    })
}

const cert_path = './cert/'
const recordingServer = require('./recordingServer').default
const app = require('./server').default

var launch_with_ssl = function() {
	console.log("Attempt to load SSL")
	const httpsOptions = {
		cert: fs.readFileSync(cert_path + 'cert.pem'),
		ca: [ fs.readFileSync(cert_path + 'fullchain.pem') ],
		key: fs.readFileSync(cert_path + 'privkey.pem')
	}

	var server = https.createServer(httpsOptions, app)
	.listen(443, '0.0.0.0', function () {
		console.log('Serving in https')
	})
	server.on('error', (err) => {
		onError(err)
		console.log(err)
	})

	http.createServer(function (req, res) {
		const host = 'dataskeptic.com'
		res.writeHead(301, { "Location": "https://" + host + req.url })
		res.end()
	}).listen(80, '0.0.0.0')
}

var launch_without_ssl = function() {
	console.log("Launch without SSL")
	app.listen(3000, function () {
		console.log('Server listening on 3000');
	});
}

var config_load_promise = new Promise(function(resolve, reject) {
	var files = ['cert.pem', 'fullchain.pem', 'privkey.pem', 'config.jsn']
	var bucket = "config-dataskeptic.com"
	var promises = []
	for (var file of files) {
		var s3Key = file
		console.log("Getting: " + s3Key)
	    var p = new Promise((resolve, reject) => {
		    const params = { Bucket: bucket, Key: s3Key }
		    s3.getObject(params)
		      .createReadStream()
		      .pipe(fs.createWriteStream(cert_path + s3Key))
		      .on('close', () => {
		        resolve(true)
		      })
		  }) 
	    promises.push(p)
	}
	return Promise.all(promises).then(function() {
		var c = 0
		for (file of files) {
			console.log("Checking for " + file)
			if (fs.existsSync(cert_path + file)) {
			    c += 1
			}
		}
		if (c == files.length) {
			console.log("Found all expected files")
			resolve(true)
		} else {
			console.log("Found less files than expected: " + c + " instead of " + files.length)
			resolve(false)
		}
	}).catch(function(err) {
		console.log("Errors getting files")
		console.log(err)
		resolve(false)
	})
})

config_load_promise.then(function(result) {
	launch_with_ssl()
}, function(err) {
	console.log("Error loading config, assuming development run")
	console.log(err)
	launch_without_ssl()
});


