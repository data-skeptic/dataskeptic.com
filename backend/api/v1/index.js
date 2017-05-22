const express = require('express');

module.exports = (cache) => {
    const router = express.Router();

    router.use('/blog', require('./blog')(cache));

   return router;
}