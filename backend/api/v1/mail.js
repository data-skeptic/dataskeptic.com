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

    router.post('/preview', function (req, res) {
        const body = req.body
        let template

        try {
          template = MailServices.template(body)
        } catch (e) {
	        return res.status(400).send(`Email review generation failed. Check the logs.`)
        }

        res.render('email', {template});
    })

    return router;
}