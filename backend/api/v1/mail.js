const express = require('express');
const MailServices = require('../../modules/mail/services/MailServices');

module.exports = (cache) => {
    const router = express.Router();

    router.post('/', function (req, res) {
        MailServices
            .sendMail(req.body)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.send(err);
            })
    });

    return router;
}