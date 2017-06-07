const express = require('express');
const MetaDataService = require('../../modules/Player/Services/MetaDataService');
var stripe_key = "sk_test_81PZIV6UfHDlapSAkn18bmQi";
var sp_key = "test_Z_gOWbE8iwjhXf4y4vqizQ";

module.exports = (cache) => {
    const router = express.Router();
    router.post('/', function (req, res) {
        MetaDataService
            .getMeta()
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });

    return router;
}