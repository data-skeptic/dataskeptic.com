const express = require('express')

module.exports = (cache) => {
    const router = express.Router();

    router.post('/', (req, res) => {
       res.send()
    });

    return router;
}

