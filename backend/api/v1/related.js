const express = require('express');
const router = express.Router();

const RelatedService = require('../../modules/related/services/RelatedService');

router.get('/', function(req, res) {
    RelatedService.getAll()
        .then((contributors) => {
            res.send(contributors);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;