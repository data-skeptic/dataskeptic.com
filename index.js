'use strict';

// require('babel-core/register')({});
// require('babel-polyfill');

const express = require('express')
const fs = require('fs')
const http = require('http');
const https = require('https')
const path = require('path')
const passport = require('passport')

const onError = (err) => {
    fs.writeFile('./error.err', err, function(e) {
        if (e) {
            return console.log(err)
        }
    })
}

const recordingServer = require('./recordingServer').default
const app = require('./server').default

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
        const host = 'dataskeptic.com';

        res.writeHead(301, { "Location": "https://" + host + req.url });
        res.end();
    }).listen(80, '0.0.0.0');

	// recordingServer(server)
} else {
	app.listen(3000, function () {
		console.log('Server listening on 3000');
	});
}

