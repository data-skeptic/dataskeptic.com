module.exports = {
	order_list: function(req, res, stripe_key) {
	    var stripe = require("stripe")(stripe_key)
	    stripe.orders.list({limit: 10}, function(err, orders) {
	      if (err) {
	        console.log(err)
	      }
	      return res.status(200).end(JSON.stringify(orders))
	    })
	}
}