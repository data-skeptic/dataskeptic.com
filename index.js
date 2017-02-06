'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const express = require('express')
const fs = require('fs')
const https = require('https')
const path = require('path')

var app = require('./server').default;

/*
const httpsOptions = {
  cert: fs.readFileSync('/ssl/cert.pem'),
  ca: [ fs.readFileSync('/ssl/fullchain.pem') ],
  key: fs.readFileSync('/ssl/privkey.pem')
}

https.createServer(httpsOptions, app)
  .listen(443, '0.0.0.0', function () {
    console.log('Serving in https')
  })
  */

var http = require('http');
http.createServer(app)
  .listen(3000, '0.0.0.0', function () {
    console.log('Serving in http')
  })

