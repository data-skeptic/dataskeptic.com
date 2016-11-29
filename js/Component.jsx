var React = require('react')
var Site = require('./components/Site.js')

module.exports = React.createClass( {
	render: function() {
		var test = "a"
		return (
			<html>
				<head>
					<link rel='stylesheet' href='/css/style.css' />
				</head>
			<body>
			<div>
			<h2>Site?</h2>
			he wo
			<p>{test}</p>
			</div>
			<div id="outer"></div>
			<p>After outer</p>
			<script src='/js/scripts.min.js' />
			</body>
			</html>
		)
	}
})