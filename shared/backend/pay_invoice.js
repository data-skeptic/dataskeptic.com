module.exports = {

  pay_invoice: function(req, res, stripe_key) {
  	console.log("pay invoice")
  	var stripe = require("stripe")(stripe_key)
    var params = req['params']
    var id = req.query.id
    var amount = req.query.amount * 100 // Stripe wants it in pennies
	var token = req.query.token
	var charge = stripe.charges.create({
		amount: amount,
		currency: "usd",
		description: "Invoice #" + id,
		source: token,
	}, function(err, charge) {
		if (err) {
			console.log(err)
			var resp = {"error": true, "msg": "Unable to complete transaction.  Please contact kyle@dataskeptic.com for assistance."}
			return res.status(400).end(JSON.stringify(resp))
		}
		var resp = {"error": false, "msg": ""}
		return res.status(200).end(JSON.stringify(resp))
	});
  }
}