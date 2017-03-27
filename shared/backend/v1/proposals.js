const path = require('path');

const uuid = require('uuid').v4;
const AWS = require("aws-sdk");
const config = require('../../../recording-config.json');
const AWS_RECORDS_BUCKET = config.aws_bucket;

AWS.config.loadFromPath(path.resolve(__dirname, '../../../awsconfig.json'));
// const s3bucket = new AWS.S3({params: {Bucket: AWS_RECORDS_BUCKET}});
const docClient = new AWS.DynamoDB.DocumentClient();

const PROPOSALS_TABLE_NAME = 'proposals';

function saveProposal(proposal) {
    proposal.id = uuid();

    const params = {
        TableName: PROPOSALS_TABLE_NAME,
        Item: proposal
    };

    return new Promise((res, rej) => {
        docClient.put(params, function(err, data) {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}

module.exports = {
    write: function (req, res) {

        console.log(req);

        const ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let userData = {
            ip,
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            userAgent: req.headers['user-agent']
        };

        switch (req.body.type) {
            case 'UPLOAD':
                userData.files = req.body.files;
                break;

            case 'RECORDING':
                userData.recording = req.body.recording;
                break;

            default:
                userData.comment = req.body.comment;
        }

        saveProposal(userData)
            .then((data) => {
                res.send({
                    success: true,
                    data
                })
            })
            .catch((err) => {
                res.send({
                    success: false,
                    error: err
                })
            })

    }
};