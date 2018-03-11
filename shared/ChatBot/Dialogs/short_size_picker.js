var chatter = require("./chatter")

var AWS = require('aws-sdk');
var ses = new AWS.SES({apiVersion: '2010-12-01'});

function get_opening_remark(dispatch, reply, cstate) {
	return chatter.get_message("ROOT>SHIRT3")
}

function handler(dispatch, reply, cstate, message) {
	var sizes = ['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl']
	var size = message.text.toLowerCase()
	if (sizes.includes(size)) {
	    var product = {
	      active: 1,
	      desc: 'Data Skeptic Logo t-shirt',
	      id: '',
	      img: 'https://s3.amazonaws.com/dataskeptic.com/img/merch/tshirt-orig.png',
	      price: 20.0,
	      sku: '',
	      title: 'Data Skeptic Logo t-shirt',
	      type: 'other'
	    }
	    var size = size
	    dispatch({
	      type: 'ADD_TO_CART',
	      payload: { product, size }
	    })

		var msg = chatter.get_message("STORE>ADDED_TO_CART")
		var handler = undefined
		return {msg, handler}
	} else {
		var msg = "Sorry, I'm not sure what size you want.  "
		msg += chatter.get_message("STORE>SIZE")
		var handler = module.exports.handler
		return {msg, handler}
	}
}

function can_handle(message, cstate, reply) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('size') != -1) {
		return true
	} else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}

