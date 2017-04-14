const express = require('express');
const router = express.Router();

const ContributorsService = require('../../modules/contributors/services/ContributorsService');

router.get('/', function(req, res) {
    ContributorsService.getAll()
        .then((contributors) => {
            res.send(contributors);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;