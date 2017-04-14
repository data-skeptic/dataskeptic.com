const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('Episodes');
});

router.get('/latest', function(req, res) {
    res.send('Latest episodes');
});

module.exports = router;