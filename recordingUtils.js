const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const sys = require('util')
const exec = require('child_process').exec;

const AWS = require("aws-sdk");

//=========== CONFIG
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const c = require('./config/config.json')
const aws_accessKeyId = c[env]['aws']['accessKeyId']
const aws_secretAccessKey = c[env]['aws']['secretAccessKey']
const aws_region = c[env]['aws']['region']
const recordingConfig = c[env]['recording']

AWS.config.update(
    {
        "accessKeyId": aws_accessKeyId,
        "secretAccessKey": aws_secretAccessKey,
        "region": aws_region
    }
);
//=========== CONFIG


const LOCKED_FILE_NAME = recordingConfig.locked_file_name;
const AWS_RECORDS_BUCKET = recordingConfig.aws_proposals_bucket;
const BASE_RECORDS_PATH = path.join(__dirname, recordingConfig.source);

export const generateRecordPath = (recordId) => path.join(BASE_RECORDS_PATH, recordId);
export const generateChunkPath = (recordId, chunkId) => path.join(generateRecordPath(recordId), `${chunkId}.wav`);

export const startRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);

    fse.ensureDirSync(recordingPath);
};

export const recordingExists = (recordId) => {
    const recordingPath = generateRecordPath(recordId, 0);

    const exists = fs.existsSync(recordingPath);

    return new Promise((res, rej) => {
        exists
            ? res(exists)
            : rej(exists)
    })
};

export const isRecordingLocked = (recordId) => {
    const recordingPath = generateRecordPath(recordId);

};

export const completeRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    lockRecording(recordId);
};

export const lockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, LOCKED_FILE_NAME);

    fse.outputFileSync(lockFile, 'complete')
};

export const unlockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, LOCKED_FILE_NAME);

    fse.removeSync(lockFile);
};

export const walkSync = (currentDirPath, callback) => {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
};

export function fileList(dir) {
    return fs.readdirSync(dir).reduce((list, file) => {
        const name = path.join(dir, file);
        const isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? fileList(name) : [name]);
    }, []);
}

export const getRecordingChunks = (recordId) => {
    const recordingPath = generateRecordPath(recordId);

    return fileList(recordingPath);
};

export const mergeFiles = (files, output) => {

};

export const uploadToS3 = (filePath, id, clb) => {
    console.log('Uploading to s3', filePath);
    console.dir(AWS_RECORDS_BUCKET)

    fs.readFile(filePath, (err, data) => {
        if (err) throw err; // Something went wrong!
        const s3bucket = new AWS.S3({params: {Bucket: AWS_RECORDS_BUCKET}});
        s3bucket.createBucket(() => {
            const params = {
                Key: id + '.wav',
                Body: data
            };

            s3bucket.upload(params, clb);
        });
    });
};

export const clearRecordingPath = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
};

export const convertFileToMp3 = (id, chunkId = 0) => {
    const filePath = generateChunkPath(id, chunkId);
    const recordPath = generateRecordPath(id)

    const mp3File = `${recordPath}/${chunkId}.mp3`;
    const command = `ffmpeg -i ${filePath} -f mp3 ${mp3File}`;

    return new Promise((res, rej) => {
        exec(command, function (error, stdout, stderr) {

            if (error) {
                return rej(error)
            }

            if (stderr) {
                return res(mp3File)
            }

            return res(mp3File)
        });
    })
}
