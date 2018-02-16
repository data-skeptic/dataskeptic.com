var axios = require('axios')
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../config/config.json')
var base_url = c[env]['base_api'] + env

function create_items_list(stripe, customer, products) {
    var items = []
    for (var product of products) {
        var p = product.product
        var size = ''
        var sku = p['sku']
        if ('size' in product) {
            size = product['size']
            if (size != '') {
                sku = sku + "_" + size
            }
        }
        if (p['type'] == 'membership') {
            sku = p['sku']
            stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    {plan: sku}
                ]
            }, function(err, subscription) {
                if (err) {
                    console.log("subscription error: " + err)
                    return null
                }
            })
        } else {
            var item = {
                "amount": p['price'],
                "currency": "usd",
                "description": p['title'],
                "quantity": product['quantity']
            }
            if (sku != undefined) {
                item["type"] = "sku"
                if (size != '') {
                    item['parent'] = p['sku']
                } else {
                    item['parent'] = p['sku']                    
                }
            }
            items.push(item)
        }
    }
    return items
}

function create_stripe_customer(stripe, email, token) {
    return stripe.customers.create({
        description: 'Customer for ' + email,
        email: email,
        source: token
    })
}

function create_stripe_order(stripe, customer, products, name, address, email) {
    var items = create_items_list(stripe, customer, products)
    return stripe.orders.create({
      currency: 'usd',
      items: items,
      shipping: {
        name,
        address
      },
      email
    })
}

function update_stripe_order(stripe, items, stripe_order_id, shipping) {
    /*
    var item = {
        "amount": shipping,
        "currency": "usd",
        "description": "shipping",
        "type": "shipping"
    }
    items.push(item)
    */
    var shipping_methods = [{
        //id: 'ship_free-shipping',
        amount: shipping,
        currency: 'usd',
        delivery_estimate: null,
        description: 'Free shipping'
    }]
    return stripe.orders.update({
        id: stripe_order_id,
        shipping_methods
    })
}

function save_order_to_database(order, stripe_order_id) {
    console.log("Saving order to the database")
    var url = base_url + '/store/order/add'
    console.log(url)
    return axios
        .post(url, JSON.stringify(result))
        .then(function(resp) {
            return {resp, order, stripe_order_id}
        })
}

function finalize_order_with_stripe(db_result) {
    var stripe_order_id = db_result.stripe_order_id
    var customer = db_result.customer.id // customer: customer.id
    stripe.orders.pay(stripe_order_id, { customer }, function(err, order) {
        return {order, stripe_order_id}
    });
}

function do_order(stripe, token, customer, products, shipping, name, address, email, res) {
    console.log("Beginning order processing")
    // TODO: provide user with more transparency by giving progress bar that updates at each step
    return create_stripe_customer(stripe, email, token)
        .then(function(customer) {
            console.log("Created Stripe Customer")
            console.log(customer)
            return create_stripe_order(stripe, customer, products, name, address, email)
        })
        .then(function(order_result) {
            console.log("Updating Stripe Order")
            console.log(order_result)
            var stripe_order_id = order_result.id
            console.log('stripe_order_id=' + stripe_order_id)
            var items = order_result.items
            return update_stripe_order(stripe, items, stripe_order_id, shipping)
        })
        .then(function(stripe_result) {
            console.log("Saving order to the database")
            console.log(stripe_result)
            return save_order_to_database(stripe_result)
        }).then(function(db_result) {
            console.log("Finalizing order")
            console.log(db_result)
            return finalize_order_with_stripe(db_result)
        }).then(function(db_result, stripe_order_id) {
            console.log(stripe_order_id)
            console.log(db_result)
            var order = db_result.order
            var resp = {'status': 'ok', 'msg': '', order, stripe_order_id }
            return resp
        })
}

module.exports = {
    add_order: function(req, res, stripe_key) {
        var stripe = require("stripe")(stripe_key)
        var order = req.body
        var email    = order['customer']['email']
        var token    = order['token']
        var customer = order['customer']
        var products = order['products']
        var shipping = order['shipping']
        console.log(["add_order shipping", shipping])
        var country  = order['country']
        var name    = customer['first_name'] + ' ' + customer['last_name']
        var stripe = require("stripe")(c[env]['stripe'])
        var address = {
            line1: customer.street_1,
            line2: customer.street_2,
            city: customer.city,
            state: customer.state,
            country: country,
            postal_code: customer.zip
        }
        try {
            do_order(stripe, token, customer, products, shipping, name, address, email).then(function (resp) {
                res.status(200).end(JSON.stringify(resp))
            })
        } catch (err) {
            var e = JSON.stringify(err)
            res.status(500).end(JSON.stringify({'status': 'failure', 'msg': e}))
        }
    }
}