const BinaryServer = require('binaryjs').BinaryServer;
const bs = BinaryServer({port: 9001});
const wav = require('wav');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const baseRecordsPath = path.join(__dirname, 'recordings');
const AWS = require("aws-sdk");
const lockedFileName = '.locked';

const actions = require('./shared/Recorder/Constants/actions');

const generateRecordPath = (recordId) => path.join(baseRecordsPath, recordId);
const generateChunkPath = (recordId, chunkId) => path.join(generateRecordPath(recordId), `${chunkId}.wav`);

const startRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);

    fse.ensureDirSync(recordingPath);
};

const isRecordingLocked = (recordId) => {
    const recordingPath = generateRecordPath(recordId);

};

const completeRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    lockRecording(recordId);
    uploadToS3(recordingPath);
};

const lockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, lockedFileName);

    fse.outputFileSync(lockFile, 'complete')
};

const unlockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, lockedFileName);

    fse.removeSync(lockFile);
};

const walkSync = (currentDirPath, callback) => {
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

function fileList(dir) {
    return fs.readdirSync(dir).reduce((list, file) => {
        const name = path.join(dir, file);
        const isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? fileList(name) : [name]);
    }, []);
}

const getRecordingChunks = (recordId) => {
    const recordingPath = generateRecordPath(recordId);

    return fileList(recordingPath);
};

const mergeFiles = (files, output) => {

};

const uploadToS3 = (filePath) => {
    console.log('Uploading to s3', filePath);
};

const run = () => {
    console.log(`Wait for new user connections`);
    bs.on('connection', (client) => {
        console.dir('connection');

        let fileWriter = null;
        client.on('stream', (stream, meta) => {
            console.log('stream');
            console.log('meta', meta);

            const {id, chunkId} = meta;
            client.meta = {
                id,
                chunkId
            };
            startRecording(id);

            const filePath = generateChunkPath(id, chunkId);
            console.log('writing in:', filePath);
            let fileWriter = new wav.FileWriter(filePath, {
                channels: 1,
                sampleRate: 48000,
                bitDepth: 16
            });

            stream.pipe(fileWriter);
        });

        client.on('close', () => {
            const {id} = client.meta;
            console.log('Connection closed', id);
            completeRecording(id);
            if (fileWriter !== null) {
                fileWriter.end();
            }
        });
    });
};

AWS.config.loadFromPath('awsconfig.json');
run();