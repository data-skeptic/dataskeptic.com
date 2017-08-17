const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mime = require('mime');

const uuid = require('uuid').v4;
const aws = require("aws-sdk");
const send = require('../modules/emails').send;

const proposalsDocs = new aws.DynamoDB.DocumentClient();

const PROPOSALS_TABLE_NAME = 'proposals';


const env="prod";

//=========== CONFIG
const c = require('../../../config/config.json')
const aws_accessKeyId = c[env]['aws']['accessKeyId']
const aws_secretAccessKey = c[env]['aws']['secretAccessKey']
const aws_region = c[env]['aws']['region']
const AWS_FILES_BUCKET = c[env]['recording']['aws_files_bucket']
const AWS_RECORDS_BUCKET = c[env]['recording']['aws_proposals_bucket']

const temp_files = c[env]['recording']['temp_files']
const EMAIL_ADDRESS = c[env]['recording']['emails']['admin']

aws.config.update(
    {
        "accessKeyId": aws_accessKeyId,
        "secretAccessKey": aws_secretAccessKey,
        "region": aws_region
    }
);
//=========== CONFIG

function saveProposal(proposal) {
    proposal.id = uuid();

    const params = {
        TableName: PROPOSALS_TABLE_NAME,
        Item: proposal
    };

    return new Promise((res, rej) => {
        proposalsDocs.put(params, function(err, data) {
            if (err) {
                rej(err);
            } else {
                res(data);
            }
        });
    });
}

function uploadProposalFile(file, aws_files_bucket) {
    console.log('[PROPOSALS] upload proposal file');
    const filesBucket = new aws.S3({params: {Bucket: AWS_FILES_BUCKET}});
    console.dir(file);

    return new Promise((res, rej) => {
        fs.readFile(file.path, (err, data) => {
            if (err) {
                rej(err);
            }

            filesBucket.createBucket(() => {
                const params = {
                    Key: file.filename,
                    Body: data
                };

                filesBucket.upload(params, (err, data) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(data);
                    }
                });
            });
        });
    });
}

function uploadFilesS3Async(files, aws_files_bucket) {
    return Promise.all(files.map(file => uploadProposalFile(file, aws_files_bucket)))
        .catch((e) => {
            console.error(e)
        })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../', temp_files))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
    }
});

const generateUrserDataBlock = (userData) => {
    return `
        <p><b>Name:</b> ${userData.name}</p>  
        <p><b>Email:</b> ${userData.email}</p>  
    `;
};

const awsFileLink = (filename) => {
    return `https://s3.amazonaws.com/${AWS_FILES_BUCKET}/${filename}`
};

const awsRecordLink = (recordId) => {
    return `https://s3.amazonaws.com/${AWS_RECORDS_BUCKET}/${recordId}`
};

const generateProposalBody = (type, proposal) => {
    let body = '';

    let heading = '<h3>You have received a new ';
    if (type === 'UPLOAD') {
        heading += 'proposal with attachments.';

        body += `<p>See attachments files</p>`;
        body += `<ul>`;
        let files = proposal.files.map((file, index) => {
            console.log('parse file');
            console.dir(file);
            body += `<a href="${awsFileLink(file)}">${file}</a>`;
        });
        body += `</ul>`;

    } else if (type === 'RECORDING') {
        heading += 'audio proposal.';

        body += `<a href="${awsRecordLink(proposal.recording)}">Listen now</a>`;
    } else {
        heading += 'proposal.';

        body += `<i>Comment:</i><q>${proposal.comment}</q>`;
    }
    heading += '</h3>';

    return heading + body + generateUrserDataBlock(proposal);
};

module.exports = {
    write: function (req, res) {
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
            .then((proposal) => {
                const destination = EMAIL_ADDRESS;
                const subject = '[Notification] New proposal';

                let message = generateProposalBody(req.body.type, userData);

                return send(destination, message, subject)
                    .then(() => userData)
            })
            .then((data) => {
                res.send({
                    success: true,
                    data: JSON.stringify(data, null, 2)
                });

                return data;
            })

            .catch((err) => {
                res.send({
                    success: false,
                    error: err
                })
            })

    },
    upload: (req, res, aws_files_bucket) => {
        const upload = multer({
            storage: storage
        }).array('files');

        upload(req, res, function(err) {
            if (err) {
                console.error(err);
                res.send({
                    success: false,
                    error: err.message
                });
            } else {
                uploadFilesS3Async(req.files, aws_files_bucket);

                res.send({
                    success: true,
                    files: req.files.map((file) => file.filename)
                })
            }
        })
    }
};