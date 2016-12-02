var React = require('react')
//var Site = require('./components/Site.js')

module.exports = React.createClass( {
	_handleClick: function() {
		alert()

	},
	render: function() {
		console.log("render Component")
		console.log(this.props)
		return (
			<html>
				<head>
					<link rel='stylesheet' href='/css/style.css' />
				</head>
			<body>
				<div>
					<h2>{this.props.title}</h2>
					<button onClick={this._handleClick}>Click</button>
				</div>
			<script dangerouslySetInnerHTML={{
				__html: 'window.PROPS=' + JSON.stringify(this.props)
			}} />
			<script src='/bundle.js' />
			</body>
			</html>
		)
	}
})