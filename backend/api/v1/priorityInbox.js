const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const express = require('express');
const aws = require('aws-sdk')
const config = require('../../../config/config.json');

const phoneNumber = config[env].sns_number;

const DEFAULT_PREFIX = `[dataskeptic.com] `
const MAX_MESSAGE_LENGTH = 160

function sendSMS(number, message) {
    const sns = new aws.SNS();

    const params = {
        Message: message,
        MessageStructure: 'string',
        PhoneNumber: number,
        Subject: 'Admin Messages'
    };

    return new Promise((res, rej) => {
        sns.publish(params, function(err, data) {
            if (err) rej(err)
            else     res(data)
        });
    })
}

const calculateMessage = (message, prefix) =>
    prefix + message.substring(0, MAX_MESSAGE_LENGTH - prefix.length)

module.exports = (cache) => {
    const router = express.Router();

    router.post('/', function (req, res) {
        if (!phoneNumber) {
            res.send({
                error: true,
                message: 'No admin phone number specified'
            })
        }

        const message = calculateMessage(req.body.message, DEFAULT_PREFIX)

        sendSMS(phoneNumber, message)
            .then((data) => res.send(data))
            .catch((err) => res.send(err))
    });

    return router;
}