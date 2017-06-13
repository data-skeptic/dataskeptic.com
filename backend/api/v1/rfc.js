const express = require('express');

const rfcService = require('../../modules/rfc/services/rfcService');

module.exports = (cache) => {

    const router = express.Router();

    router.get('/list', function (req, res) {
        rfcService.getRFC()
            .then((contributors) => {
                res.send(contributors);
            })
            .catch((err) => {
                res.send(err);
            })
    });
    return router;
}

