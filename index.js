'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const app = require('./server').default;
const recordingServer = require('./recordingServer').default;

let server = null;
if (fs.existsSync('/ssl/cert.pem')) {
	const httpsOptions = {
	  cert: fs.readFileSync('/ssl/cert.pem'),
	  ca: [ fs.readFileSync('/ssl/fullchain.pem') ],
	  key: fs.readFileSync('/ssl/privkey.pem')
	};

	server = https.createServer(httpsOptions, app)
	  .listen(443, '0.0.0.0', function () {
	    console.log('Serving in https')
	  });

    http.createServer(function (req, res) {
	    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	    res.end();
	}).listen(80);	
} else {
	server = http.createServer(app).listen(3000);
}

if (server) {
    recordingServer(server);
}