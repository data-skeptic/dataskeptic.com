const path = require("path");
const fs = require("fs");

const aws = require("aws-sdk");

function recordingExist(recordId, bucket) {
  return new Promise((res, rej) => {
    const params = {
      Bucket: bucket,
      Key: recordId
    };

    const s3bucket = new aws.S3({ params: { Bucket: bucket } });
    s3bucket.headObject(params, function(err, data) {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}

import { recordingExists, generateChunkPath } from "../../../recordingUtils";

module.exports = {
  ready: function(req, res, bucket) {
    const recordId = req.query.id;

    if (!recordId) {
      return res.send({
        error: "Please specify record id"
      });
    }

    recordingExists(recordId)
      .then(data => {
        res.send({
          ready: true,
          data
        });
      })
      .catch(err => {
        res.send({
          ready: false,
          err
        });
      });
  },
  getTempFile: function(req, res) {
    const filePath = generateChunkPath(req.query.id, 0);

    try {
      return res.sendFile(filePath);
    } catch (e) {
      res.send({
        error: true
      });
    }
  }
};
