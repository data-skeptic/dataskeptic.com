const express = require('express');
const OrdersServices = require('../../modules/orders/services/OrdersServices');
var stripe_key = "sk_test_81PZIV6UfHDlapSAkn18bmQi";
var sp_key = "test_Z_gOWbE8iwjhXf4y4vqizQ";

module.exports = (cache) => {
    const router = express.Router();
    router.get('/', function (req, res) {

        const params = req['params'];
        const query = req.query;

        let url = req.url;
        const x = req.url.indexOf('?');
        if (x > 0) {
            url = url.substring(0, x)
        }

        const offset = query['offset'] || 0;
        const limit = query['limit'] || 10;

        const pre = '/api/v1/orders';
        url = url.substring(pre.length, url.length);

        OrdersServices.getAll(url, stripe_key, offset, limit, global.env)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });

    router.post('/create', function (req, res) {
        OrdersServices.createOrder(req.body, sp_key)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });

    router.get('/fulfill', function (req, res) {
        OrdersServices.fulFillOrder(sp_key, req.body)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });
    return router;
}