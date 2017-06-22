const path = require('path');

const AWS = require("aws-sdk");
const config = require('../../../global-config.json');
const AWS_RECORDS_BUCKET = config.aws_proposals_bucket;

AWS.config.loadFromPath(path.resolve(__dirname, '../../../awsconfig.json'));
const s3bucket = new AWS.S3({params: {Bucket: AWS_RECORDS_BUCKET}});

function recordingExist(recordId) {
    return new Promise((res, rej) => {
        const params = {
            Bucket: AWS_RECORDS_BUCKET,
            Key: recordId
        };

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
    ready: function (req, res) {
        const recordId = req.query.id + '.wav';
        if (!recordId) {
            res.send({
                error: 'Please specify record id'
            });

            return;
        }

        recordingExist(recordId)
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