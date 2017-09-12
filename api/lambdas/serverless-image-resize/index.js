'use strict';
const ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    AWS = require('aws-sdk'),
    https = require('https'),
    request = require('request'),
    gm = require('gm').subClass({
        imageMagick: true
    }),
    resizeImg = require('resize-img'),
    md5 = require('crypto-js/md5');
const S3 = new AWS.S3({
    signatureVersion: 'v4',
});
//const Sharp = require('sharp');

const BUCKET = process.env.BUCKET;
module.exports = api;

function downloadFile(url) {
    return new Promise(function (resolve, reject) {
        var requestSettings = {
            url: url,
            method: 'GET',
            encoding: null
        };

        request(requestSettings, function (error, response, body) {
            if (error) {
                reject(error)
            }
            else {
                resolve(body)
            }
        })
    });
}

function convertImage(image, width, height){
    return new Promise(function(resolve, reject) {
        gm(image).resize(width, height).setFormat('jpeg').toBuffer('JPG', function(err, buffer) {
            if (err) reject(err);
            resolve(buffer);
        });
    });
}

api.get('/', function (req, res) {
    'use strict'

    var url = req.queryString.url;
    var size = req.queryString.size;

    if (!url || !size) return '404';

    const sizes = size.match('(\\d+)x(\\d+)');

    if (sizes.length !== 3)
        return 'Wrong Size';
    var width = parseInt(sizes[1], 10)
    var height = parseInt(sizes[2], 10)
    return downloadFile(url).then(function (data) {
        return convertImage(data, width, height);
    }).then(function (data) {
        return S3.upload({
            Body: new Buffer(data, 'binary'),
            Bucket: BUCKET,
            ContentType: 'image/jpeg',
            Key: md5(url) + '',
        }).promise()
    }).then(function (data) {
        return new api.ApiResponse('OK', {
            'X-Version': '301',
            'Content-Type': 'text/plain',
            'Location': data.Location
        }, 301);
    });
});


/*
exports.handler = function(event, context, callback) {
    const key = event.queryStringParameters.key;
    const match = key.match(/(\d+)x(\d+)\/(.*)/);
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    const originalKey = match[3];

    S3.getObject({Bucket: BUCKET, Key: originalKey}).promise()
        .then(data => Sharp(data.Body)
            .resize(width, height)
            .toFormat('png')
            .toBuffer()
        )
        .then(buffer => S3.putObject({
                Body: buffer,
                Bucket: BUCKET,
                ContentType: 'image/png',
                Key: key,
            }).promise()
        )
        .then(() => callback(null, {
                statusCode: '301',
                headers: {'location': `${URL}/${key}`},
                body: '',
            })
        )
        .catch(err => callback(err))
}
*/