const ignoredKeys = ['latest', 'guid'];
import filter from 'lodash/filter';
import moment from 'moment';
import axios from 'axios'

const NOT_FOUND_ERROR = {
    error: true,
    message: "Not Found"
};
function isIgnoredKey(key) {
    return ignoredKeys.includes(key);
}
function matchingOffset(order, index, offset) {
    return (index >= offset);
}

function matchingLimit(order, index, limit) {
    return (index < limit);
}

function compare(dateTimeA, dateTimeB) {
    const momentA = moment(dateTimeA, "YYYY-MM-DD");
    const momentB = moment(dateTimeB, "YYYY-MM-DD");
    if (momentA > momentB) return 1;
    else if (momentA < momentB) return -1;
    else return 0;
}
const isExist = (orders_list, guid) => !!orders_list[guid];

function list(limit, stripe_key) {
    const stripe = require("stripe")(stripe_key);

    return new Promise((res, rej) => {
        stripe.orders.list({limit: limit}, (err, orders) => {
            if (err) {
                rej(err)
            } else {
                res(orders)
            }
        })
    })
}

export const getAll = (url, stripe_key, offset, limit, env, exclude = ['/orders', '/transcripts']) => {
    return list(limit, stripe_key)
        .then((orders_list) => {


            console.dir("orders = " + orders_list);
            // remove unnecessary keys
            let orders = filter(orders_list, (order, id) => !isIgnoredKey(id));
            // filter only relative orders
            console.dir("orders2 = " + orders);
            // orders = filter(orders, (order, id) => isMatchingQuery(order, {url, exclude, env}));
            console.dir("orders3 = " + orders);
            // calculate total matched orders count
            const total = orders.length;

            console.dir("orders4 = " + orders);
            // slice over limits
            orders = orders
                .filter((order, index) => matchingOffset(order, index, offset))
                .filter((order, index) => matchingLimit(order, index, limit));
            console.dir("orders5 = " + orders);
            // var latestId = "";
            // if (Object.keys(orders_list).length > 0) {
            //     latestId = orders_list['latest']['guid'];
            // }

            return {
                env,
                orders,
                total//,
                // latestId
            }
        })
};

export const fulFillOrder = (stripe_key, obj) => {

    return new Promise((resolve, reject) => {


        var stripe = require("stripe")(stripe_key)
        var oid = obj['oid']
        console.log("oid=" + oid)
        stripe.orders.update(oid, {
            status: "fulfilled"
        }, function (err, resp) {
            if (err == null) {
                console.log("---")
                console.log(resp)
               return resolve(JSON.stringify(resp))
            } else {
                console.log("===")
                console.log(err)
                return reject(JSON.stringify(err))
            }
        })
    })
};

export const createOrder = (obj, key) => {

    var t = 'Basic ' + new Buffer(':' + key).toString('base64')
    var config = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': t
    };
    var instance = axios.create()
    instance.request({
        url: 'https://api.scalablepress.com/v2/quote',
        method: 'POST',
        headers: {},
        data: obj,
        withCredentials: true,
        auth: {
            username: '',
            password: key
        }
    }).then(function (resp) {
        var data = resp['data']
        var status = resp['status']
        if (status == 200) {
            var orderIssues = data['orderIssues']
            if (orderIssues != undefined && orderIssues.length > 0) {
                var resp = {status: "Order Issues", "response": resp}
                return resp
            } else {
                var orderToken = data['orderToken']
                console.log("orderToken=" + orderToken)
                var i2 = axios.create()
                var obj2 = {orderToken}
                i2.request({
                    url: 'https://api.scalablepress.com/v2/order',
                    method: 'POST',
                    headers: {},
                    data: obj2,
                    withCredentials: true,
                    auth: {
                        username: '',
                        password: key
                    }
                })
            }
        }
    })
};