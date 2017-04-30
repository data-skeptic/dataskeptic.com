'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https')
const path = require('path')

var app = require('./server').default;

const onError = (err) => {
	fs.writeFile('./error.err', err, function(e) {
		if (e) {
			return console.log(err)
		}
	})
}

onError("test writing files")

if (fs.existsSync('/ssl/cert.pem')) {
	const httpsOptions = {
	  cert: fs.readFileSync('/ssl/cert.pem'),
	  ca: [ fs.readFileSync('/ssl/fullchain.pem') ],
	  key: fs.readFileSync('/ssl/privkey.pem')
	}

	var server = https.createServer(httpsOptions, app)
	  .listen(443, '0.0.0.0', function () {
	    console.log('Serving in https')
	  })
	
	server.on('error', (err) => {
		onError(err)
	})

	http.createServer(function (req, res) {
	    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	    res.end();
	}).listen(80);	
} else {
	app.listen(3000, function () {
		console.log('Server listening on 3000');
	});
}

