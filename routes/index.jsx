var router = require('express').Router()
var React = require('react')
var ReactDOMServer = require('react-dom/server')
//var Component = require('./Component.jsx')
var ReactRouter = require('react-router')

router.get('*', function(request, response) {
	console.log("get")
	var props = { title: 'tester3' }
	ReactRouter.match({
		routes: (
			<ReactRouter.Router history={ReactRouter.browserHistory}>
				<ReactRouter.Route path='/' component={require('../js/Component.jsx')}>
				</ReactRouter.Route>
			</ReactRouter.Router>
		),
		location: request.url
	}, function(error, redirectLocation, renderProps) {
		if (renderProps) {
			var html = ReactDOMServer.renderToString(
				<ReactRouter.RouterContext {...renderProps} />
			);
			response.send(html)
		} else {
		response.status(404).send('Not found')
		}
	})
})

module.exports = router