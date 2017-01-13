import axios from 'axios'

module.exports = {
	order_fulfill: function(req, res, stripe_key) {
	    var stripe = require("stripe")(stripe_key)
	    var obj = req.body
	    var oid = obj['oid']
	    console.log("oid=" + oid)
	    stripe.orders.update(oid, {
	      status: "fulfilled"
	    }, function(err, resp) {
	      if (err == null) {
	        console.log("---")
	        console.log(resp)
	        return res.status(200).end(JSON.stringify(resp))
	      } else {
	        console.log("===")
	        console.log(err)
	        return res.status(400).end(JSON.stringify(err))        
	      }
	    })
	}
}