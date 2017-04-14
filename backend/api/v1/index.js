const express = require('express');
const router = express.Router();

router.use('/blog', require('./blog'));
router.use('/episodes', require('./episodes'));
router.use('/orders', require('./orders'));

module.exports = router;