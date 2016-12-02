require('babel-register')({
	presets: ['react']
})
var express = require('express')
var app = express()
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var Component = require('./Component.jsx')

app.use(express.static('public'))
app.use(require('../routes/index.jsx'))

var PORT = 3000
app.listen(PORT, function() {
	console.log('http://localhost:' + PORT)
})