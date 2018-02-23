const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const sys = require('util')
const exec = require('child_process').exec;

const AWS = require("aws-sdk");

AWS.config.update(
    {
        "accessKeyId": process.env.AWS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
        "region": process.env.AWS_REGION
    }
);
//=========== CONFIG

export const generateRecordPath = (recordId) => path.join(process.env.RECORDING_SOURCE, recordId);
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
    const lockFile = path.join(recordingPath, process.env.RECORDING_LOCKED_FILE_NAME);

    fse.outputFileSync(lockFile, 'complete')
};

export const unlockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, process.env.RECORDING_LOCKED_FILE_NAME);

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
    console.dir(process.env.RECORDING_AWS_PROPOSAL_BUCKET)

    fs.readFile(filePath, (err, data) => {
        if (err) throw err; // Something went wrong!
        const s3bucket = new AWS.S3({params: {Bucket: process.env.RECORDING_AWS_PROPOSAL_BUCKET}});
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
