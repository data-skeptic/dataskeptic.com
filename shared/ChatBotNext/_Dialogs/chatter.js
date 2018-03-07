var message_dict = require('../Dialogs/msgs.json')

function get_message(key) {
	var arr = key.split(">")
	return get_message2(arr, message_dict)
}

function get_message2(a, d) {
	if (a.length > 1) {
		return get_message2(a.slice(1, a.length), d[a[0]])
	} else {
		var replies = d[a[0]]
		var i = parseInt(Math.floor(replies.length * Math.random()))
		return replies[i]
	}
}

module.exports = {
    get_message: get_message
};
