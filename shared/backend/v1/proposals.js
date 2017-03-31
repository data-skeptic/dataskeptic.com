const path = require('path');
const fs = require('fs');

const multer = require('multer');
const mime = require('mime');

const uuid = require('uuid').v4;
const AWS = require("aws-sdk");
const config = require('../../../global-config.json');

const send = require('../modules/emails').send;

const AWS_RECORDS_BUCKET = config.aws_proposals_bucket;
const AWS_FILES_BUCKET = config.aws_files_bucket;

AWS.config.loadFromPath(path.resolve(__dirname, '../../../awsconfig.json'));
const filesBucket = new AWS.S3({params: {Bucket: AWS_FILES_BUCKET}});
const proposalsDocs = new AWS.DynamoDB.DocumentClient();

const PROPOSALS_TABLE_NAME = 'proposals';

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

function uploadProposalFile(file) {
    console.log('[PROPOSALS] upload proposal file');
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

function uploadFilesS3Async(files) {
    return Promise.all(files.map(file => uploadProposalFile(file)));
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../../', config.temp_files))
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

        body += `<a href="${awsRecordLink(proposal.recording)}">Listen it now ></a>`;
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
                const destination = config.emails.admin;
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
    upload: (req, res) => {
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
                uploadFilesS3Async(req.files);

                res.send({
                    success: true,
                    files: req.files.map((file) => file.filename)
                })
            }
        })
    }
};