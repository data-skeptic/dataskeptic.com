var add_order = require('./add_order')

console.log("Starting test")

//const c = require('../../config/config.json')
const c = require('./config.json')
var env = "dev"
var stripe_key = c[env]['stripe']
var stripe = require("stripe")(stripe_key)
var base_url = c[env]['base_api'] + env

var email = 'kyle@dataskeptic.com'

const cardData = {
    number: '4242424242424242',
    cvc: '752',
    exp_month: 12,
    exp_year: 2029
};

stripe.tokens.create({card: cardData}, (status, response) => {
    const token = response.id
    const client_ip = response.client_ip // Track this eventually?
	const customer = {
	    first_name: 'Kyle',
	    last_name: 'Tester',
	    street_1: '2646 W. Fullerton',
	    street_2: '',
	    city: 'Chicago',
	    state: 'IL',
	    zip: '60558',
	    email,
	    phone: '312-1791-0752'
	}
	var country = 'us'
	var shipping = 4
	var name    = customer['first_name'] + ' ' + customer['last_name']
	var address = {
	    line1: customer.street_1,
	    line2: customer.street_2,
	    city: customer.city,
	    state: customer.state,
	    country: country,
	    postal_code: customer.zip
	}

	var product = {
		quantity: 1,
		product: {
			active: 1,
			desc: "A testing product.",
			id:24,
			img:"",
			price: 2.00,
			sku: "sku_4",
			title: "Testing",
			type:"test"			
		}
	}
	var products = [product]

	add_order.do_order(base_url, stripe, token, customer, products, shipping, name, address, email).then(function (resp) {
		console.log("====[Done]====================================================")
		console.log(resp)
	}).catch(function(err) {
	    console.log(err)
	})
})
