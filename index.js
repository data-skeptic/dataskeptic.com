'use strict';

const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https')
const path = require('path')
const passport = require('passport')
const aws = require('aws-sdk')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const c = require('./config/config.json')
console.dir('index.js : env = ' + env)
var aws_accessKeyId = c[env]['aws']['accessKeyId']
var aws_secretAccessKey = c[env]['aws']['secretAccessKey']
var aws_region = c[env]['aws']['region']

console.log(aws_accessKeyId)
console.log(aws_secretAccessKey)
console.log(aws_region)

aws.config.update(
    {
        "accessKeyId": aws_accessKeyId,
        "secretAccessKey": aws_secretAccessKey,
        "region": aws_region
    }
);
const s3 = new aws.S3();

if (env == "prod") {
	var sns = new aws.SNS();
	var endpointArn = "arn:aws:sns:us-east-1:085318171245:ds-boot";
	var payload = {
    	default: 'Reboot',
    	APNS: {
     		aps: {
        		alert: 'Rebooting',
		        sound: 'default',
		        badge: 1
      		}
    	}
  	};
	payload.APNS = JSON.stringify(payload.APNS);
	payload = JSON.stringify(payload);
	sns.publish({
		Message: payload,
		MessageStructure: 'json',
		TargetArn: endpointArn
	}, function(err, data) {
		if (err) {
			console.log(err.stack);
			return;
		}
		console.log('push sent');
		console.log(data);
	});
}


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
	console.log("Attempt to load SSL 2")

	http.createServer(function (req, res) {
		const host = 'dataskeptic.com'
		res.writeHead(301, { "Location": "https://" + host + req.url })
		res.end()
	}).listen(80, '0.0.0.0')

	console.log("Attempt to load SSL 3")
}

var launch_without_ssl = function() {
	console.log("Launch without SSL")
	app.listen(3000, function () {
		console.log('Server listening on 3000');
	});
}

function config_load_promise() {
	var clp = new Promise(function(resolve, reject) {
		var files = ['cert.pem', 'fullchain.pem', 'privkey.pem', 'config.jsn']
		var bucket = "config-dataskeptic.com"
		var promises = []
		console.log("start")
		if (!fs.existsSync(cert_path)) {
			console.log("Creating cert directory")
			fs.mkdirSync(cert_path, 777);
		} else {
			console.log("Cert path exists")
		}
		for (var file of files) {
			var s3Key = file
		    var p = new Promise((resolve, reject) => {
				console.log("Gettin': " + bucket + " " + s3Key)
			    const params = { Bucket: bucket, Key: s3Key }
console.log(params)
			    s3.getObject(params)
			      .createReadStream()
			      .pipe(fs.createWriteStream(cert_path + s3Key))
			      .on('close', () => {
			      	console.log("Resolving: " + s3Key)
			        resolve(true)
			      })
			  }) 
		    promises.push(p)
		}
		return Promise.all(promises).then(function() {
			console.log("All promises complete")
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
	}).then(function(result) {
		console.log("Done, now launch with SSL")
		launch_with_ssl()
	}, function(err) {
		console.log("Error loading config, assuming development run")
		console.log(err)
		launch_without_ssl()
	});
}

if (env == 'prod') {
	console.log("Loading as prod")
	config_load_promise()
} else {
	console.log("Loading as dev")
	launch_without_ssl()		
}

if (process.env.NODE_ENV === 'dev') {
    require('./webpack.dev').default(app);
}

