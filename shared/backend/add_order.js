var axios = require('axios')

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

function save_order_to_database(base_url, stripe_order_id, customer, customer_id, products, shipping, total, token) {
    var url = base_url + '/store/order/add'
    var order = {customer, token, shipping, total, products}
    var req = {stripe_order_id, order}
    return axios
        .post(url, JSON.stringify(req))
        .then(function(resp) {
            var data = resp.data
            var order_id = JSON.parse(data)
            return { order_id, stripe_order_id, customer_id}
        })
}

function finalize_order_with_stripe(stripe, stripe_order_id, customer_id) {
    var req = { customer: customer_id }
    return stripe.orders.pay(stripe_order_id, req)
}

function do_order(base_url, stripe, token, customer, products, shipping, name, address, email, res) {
    console.log("Beginning order processing")
    var total = shipping
    for (var product of products) {
        total += product.product['price'] * (product.product['quantity'] || 1)
    }
    var product = {
        quantity: 1,
        product: {
            "amount": shipping,
            "currency": "usd",
            "sku": "shipping",
            "description": "shipping",
            "type": "shipping"
        }
    }
    return create_stripe_customer(stripe, email, token)
        .then(function(customer) {
            var customer_id = customer.id
            console.log("Created Stripe Customer: " + customer_id)
            return create_stripe_order(stripe, customer, products, name, address, email).then(function(sorder) {
                console.log("Created Stripe Order: " + sorder['id'])
                sorder['customer_id'] = customer_id
                return sorder
            })
        })
        .then(function(resp) {
            var stripe_order_id = resp.id
            var customer_id = resp.customer_id
            return {stripe_order_id, customer_id}
        })
        .then(function(resp) {
            console.log("Saving order to the database")
            var stripe_order_id = resp.stripe_order_id
            var customer_id = resp.customer_id
            return save_order_to_database(base_url, stripe_order_id, customer, customer_id, products, shipping, total, token)
        }).then(function(db_result) {
            console.log("Finalizing order")
            var customer_id = db_result.customer_id
            var stripe_order_id = db_result.stripe_order_id
            return finalize_order_with_stripe(stripe, stripe_order_id, customer_id)
        }).then(function(final_result) {
            console.log("Finishing up")
            var order = final_result.order
            var stripe_order_id = final_result.id
            var charge = final_result.charge
            var email = final_result.email
            var stripe_status = final_result.status
            var resp = {'status': 'ok', 'msg': '', email, total, customer, products, stripe_status, charge, stripe_order_id }
            return resp
        })
}

function add_order(req, res, base_url, stripe_key) {
    console.log("Begin add_order")
    console.log(base_url)
    console.log(stripe_key)
    var stripe = require("stripe")(stripe_key)
    var order = req.body
    var email    = order['customer']['email']
    var token    = order['token']
    var customer = order['customer']
    var products = order['products']
    var shipping = order['shipping']
    var country  = order['country']
    var name    = customer['first_name'] + ' ' + customer['last_name']
    var address = {
        line1: customer.street_1,
        line2: customer.street_2,
        city: customer.city,
        state: customer.state,
        country: country,
        postal_code: customer.zip
    }
    try {
        do_order(base_url, stripe, token, customer, products, shipping, name, address, email).then(function (resp) {
            res.status(200).end(JSON.stringify(resp))
        })
    } catch (err) {
        var e = JSON.stringify(err)
        res.status(500).end(JSON.stringify({'status': 'failure', 'msg': e}))
    }
}

module.exports = { add_order, do_order }
