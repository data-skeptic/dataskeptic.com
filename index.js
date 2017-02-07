'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https')
const path = require('path')

var app = require('./server').default;

if (fs.existsSync('/ssl/cert.pem')) {
	const httpsOptions = {
	  cert: fs.readFileSync('/ssl/cert.pem'),
	  ca: [ fs.readFileSync('/ssl/fullchain.pem') ],
	  key: fs.readFileSync('/ssl/privkey.pem')
	}

	https.createServer(httpsOptions, app)
	  .listen(443, '0.0.0.0', function () {
	    console.log('Serving in https')
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



