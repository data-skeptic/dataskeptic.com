'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const express = require('express');
const fs = require('fs')
const http = require('http');
const https = require('https');
const path = require('path');

const app = require('./server').default;


const aws = require('aws-sdk');
aws.config.loadFromPath('awsconfig.json');
const ses = new aws.SES({apiVersion: '2010-12-01'});

const onError = (err) => {
	const subject = 'Error';
	const from = 'kyle@dataskeptic.com';
	const body = JSON.stringify(err);

    const email_request = {
        Source: from,
        Destination: { ToAddresses: ['kyle@dataskeptic.com'] },
        Message: {
            Subject: {
                Data: subject
            },
            Body: {
                Html: {
                    Data: body
                }
            }
        }
    };

    ses.sendEmail(email_request, function(err, data) {
    	if(err) console.log(err);
    });
};

if (fs.existsSync('/ssl/cert.pem')) {
	const httpsOptions = {
	  cert: fs.readFileSync('/ssl/cert.pem'),
	  ca: [ fs.readFileSync('/ssl/fullchain.pem') ],
	  key: fs.readFileSync('/ssl/privkey.pem')
	};

    const server = https.createServer(httpsOptions, app)
	  .listen(443, '0.0.0.0', function () {
	    console.log('Serving in https')
	  });

	server.on('error', (err) => {
		onError(err);
	});

	http.createServer(function (req, res) {
	    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	    res.end();
	}).listen(80);
} else {
	app.listen(3000, function () {
		console.log('Server listening on 3000');
	});
}

process.on('uncaughtException', function(err) {
    onError(err);
});