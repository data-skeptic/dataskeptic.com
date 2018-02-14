const express = require('express');

module.exports = (cache) => {
    const router = express.Router();

    router.use('/auth', require('./auth')());
    router.use('/blog', require('./blog')(cache));
    router.use('/contributors', require('./contributors')(cache));
    router.use('/episodes', require('./episodes')(cache));
    router.use('/related', require('./related')(cache));
    router.use('/orders', require('./orders')(cache));
    router.use('/mail', require('./mail')(cache));
    router.use('/store', require('./store')(cache));
    router.use('/slack', require('./slack')(cache));
    router.use('/rfc', require('./rfc')(cache));
    router.use('/refresh', require('./refresh')(cache));
    router.use('/player', require('./player')(cache));

    // lets map to the start of url request
    router.use('/tse', require('./tse')(cache));

   return router;
}
