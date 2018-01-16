module.exports = {
	order_fulfill: function(req, res, stripe_key) {
	    var stripe = require("stripe")(stripe_key)
	    var obj = req.body
	    var oid = obj['oid']
	    stripe.orders.update(oid, {
	      status: "fulfilled"
	    }, function(err, resp) {
	      if (err == null) {
	        return res.status(200).end(JSON.stringify(resp))
	      } else {
	        console.log(err)
	        return res.status(400).end(JSON.stringify(err))        
	      }
	    })
	}
}