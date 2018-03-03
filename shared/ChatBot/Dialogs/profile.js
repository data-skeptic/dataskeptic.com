var chatter = require("./chatter")

function get_opening_remark(dispatch, reply, cstate) {
	return "Whose profile would you like to see?"
}
function handler(dispatch, reply, cstate, message) {
	var lmsg = message.text.toLowerCase().trim()
	if (lmsg == "exit") {
		var msg = "What should we talk about now?"
		var handler = undefined
		return {msg, handler}
	}
	var msg = "I'm sorry, I'm not sure who you mean.  My string matching is very poorly implemented in this regard.  You'd think Kyle would have done a better job programming me.  That guy, geez.  Can you simplify?  Let's try first name only, lower case as if this was implemented in the worst possible way.  To give up, type 'exit'"
	var handler = module.exports.handler

	var contributors_dict = {}
	contributors_dict['kyle'] = {
		prettyname: "Kyle Polich",
		img: "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
		twitter: "@dataskeptic",
		linkedin: "https://www.linkedin.com/in/kyle-polich-5047193",
		bio: "Kyle studied computer science and focused on artificial intelligence in grad school. His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology."
	}
	contributors_dict['kyle'] = {
		prettyname: "Linh Da Tran",
		author: "linhda",
		img: "https://s3.amazonaws.com/dataskeptic.com/contributors/linh-da-tran.jpg",
		twitter: "",
		linkedin: "",
		bio: "Originally from North Carolina, Linhda graduated undergrad from UNC-Chapel Hill (Tarheels!) and promptly moved to the Golden Coast when she heard of sunnier days, fewer mosquitos and a long coastline of beaches. When she is not on the podcast, she enjoys commuting to work via bike, spending time with Yoshi, cooking then eating, lots of sleep and occasional yoga and making small-batch artisan ice cream. Her short stature and below average bike size has deterred many a LA bike thieves-- evidence that it pay off to be short."
	}

	if (lmsg in contributors_dict) {
		var contributor = contributors_dict[lmsg]
		msg = `**${contributor.prettyname}** - ${contributor.bio} <br/><br/>![contributor.prettyname](${contributor.img})`
		handler = undefined
	} else {}
	return {msg, handler}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('cast') != -1) {
		return true
	}
	else if (lmsg.indexOf('host') != -1) {
		return true
	}
	else if (lmsg.indexOf('profile') != -1) {
		return true
	}
	else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}
