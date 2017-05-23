const express = require('express');
const InvoiceServices = require('../../modules/invoice/services/InvoiceServices');
var stripe_key = "sk_test_81PZIV6UfHDlapSAkn18bmQi";
var sp_key = "test_Z_gOWbE8iwjhXf4y4vqizQ";

module.exports = (cache) => {
    const router = express.Router();
    router.get('/:id', function (req, res) {



        InvoiceServices.getInvoice(req.params.id)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });



    router.get('/:id/pay', function (req, res) {
        InvoiceServices.payInvoice(stripe_key)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });
    return router;
}