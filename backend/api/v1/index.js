const express = require('express');

module.exports = (cache) => {
    const router = express.Router();

    router.use('/blog', require('./blog')(cache));
    router.use('/contributors', require('./contributors')(cache));
    router.use('/episodes', require('./episodes')(cache));
    router.use('/related', require('./related')(cache));
    router.use('/orders', require('./orders')(cache));
    router.use('/invoice', require('./invoice')(cache));
    router.use('/mail', require('./mail')(cache));
    router.use('/store', require('./store')(cache));

   return router;
}