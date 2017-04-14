const express = require('express');
const router = express.Router();

const EpisodeServices = require('../../modules/episodes/services/EpisodeServices');

router.get('/', function(req, res) {
    EpisodeServices.getAll()
        .then((episodes) => {
            res.send(episodes);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/latest', function(req, res) {
    res.send('Latest episodes');
});

module.exports = router;