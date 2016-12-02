var React = require('react')
var ReactDOM = require('react-dom')
var Component = require('./Component.jsx')

console.log("client")

var props = window.PROPS

  //	<Site/>

ReactDOM.render(
  	React.createElement(Component, props), document
);
