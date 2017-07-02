const path = require('path');
const fs = require('fs');

const aws = require("aws-sdk");

function recordingExist(recordId, bucket) {
    return new Promise((res, rej) => {
        const params = {
            Bucket: bucket,
            Key: recordId
        };

        const s3bucket = new aws.S3({params: {Bucket: bucket}});
        s3bucket.headObject(params, function(err, data) {
            if (err) {
                rej(err)
            } else {
                res(data);
            }
        });
    })
}

module.exports = {
    ready: function (req, res, bucket) {
        const recordId = req.query.id + '.wav';
        if (!recordId) {
            res.send({
                error: 'Please specify record id'
            });

            return;
        }

        recordingExist(recordId, bucket)
            .then((data) => {
                res.send({
                    ready: true,
                    data
                })
            })
            .catch((err) => {
                res.send({
                    ready: false,
                    err
                })
            })
    }
};