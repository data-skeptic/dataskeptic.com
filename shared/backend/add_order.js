var axios = require('axios')
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const c = require('../../config/config.json')
var base_url = c[env]['base_api'] + env

function create_items_list(stripe, customer, products) {
    var items = []
    console.log(products)
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

module.exports = {
    add_order: function(req, res, stripe_key) {
        var stripe = require("stripe")(stripe_key)
        var order = req.body
        var email    = order['customer']['email']
        var token    = order['token']
        var customer = order['customer']
        var products = order['products']
        var shipping = order['shipping']
        var country  = order['country'] 

        var name    = customer['first_name'] + ' ' + customer['last_name'] 
        var stripe = require("stripe")(c[env]['stripe']);
        var address = {
            line1: customer.street_1,
            line2: customer.street_2,
            city: customer.city,
            state: customer.state,
            country: country,
            postal_code: customer.zip
        }
        console.log("Go go stripe!")
        let promise = new Promise(function (resolve, reject) {
            stripe.customers.create({
                description: 'Customer for ' + email,
                email: email,
                source: token
            }, function(err, customer) {
                if (err) {
                    console.log("error: " + err)
                    return reject(err)
                }
                console.log("Stripe customer ready")
                var items = create_items_list(stripe, customer, products)
                if (items.length > 0) {
                    var item = {
                        "amount": shipping,
                        "currency": "usd",
                        "description": "shipping",
                        "parent": "shipping",
                        "type": "sku",
                        "quantity": 1
                    }
                    items.push(item)
                    stripe.orders.create({
                      currency: 'usd',
                      items: items,
                      shipping: {
                        name,
                        address
                      },
                      email
                    }, function(err, stripe_order) {
                        if (err) {
                            console.log("error stripe.orders.create " + err)
                            return reject(err)
                        }
                        var stripe_order_id = stripe_order.id
                        console.log('stripe_order_id=' + stripe_order_id)
                        return stripe.orders.pay(stripe_order_id, {
                            customer: customer.id
                        }, function(err, order2) {
                            if (err) {
                                console.log(err)
                                reject(err)
                            }
                            resolve({order, stripe_order_id})
                        });
                    });
                }
            });
        })
        promise.then(function(result) {
            console.log("STEP 2.")
            var url = base_url + '/store/order/add'
            console.log(url)
            console.log(JSON.stringify(result))
            axios
                .post(url, JSON.stringify(result))
                .then(function(resp) {
                    console.log('resp')
                    console.log(resp)
                    /*
                    const result = resp.data;
                    let paymentComplete = false;
                    let paymentError = '';
                    if (result.msg !== 'ok') {
                        paymentComplete = false;
                        paymentError = result.msg || result.errorMessage || "";
                    } else {
                        paymentComplete = true
                    }
                    if (paymentComplete) {
                        console.log("ok")
                        res.status(200).end(JSON.stringify({'status': 'ok', 'msg': ''}))
                        return result;
                    } else {
                        throw new Error(paymentError);
                    }
                    */
                    res.status(200).end(JSON.stringify({'status': 'ok', 'msg': '', order: result.order, stripe_order_id: result.stripe_order_id }))
                }).catch(function(err) {
                    console.log('err!!!')
                    console.log(err)
                })
        }).catch(function(err) {
            var e = JSON.stringify(err)
            res.status(500).end(JSON.stringify({'status': 'failure', 'msg': e}))
        })
    }
}