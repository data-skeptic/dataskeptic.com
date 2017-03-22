const BinaryServer = require('binaryjs').BinaryServer;
const bs = BinaryServer({port: 9001});
const wav = require('wav');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const AWS = require("aws-sdk");

const LOCKED_FILE_NAME = '.locked';
const BASE_RECORDS_PATH = path.join(__dirname, 'recordings');
const AWS_RECORDS_BUCKET = 'dataskeptic-records';

const actions = require('./shared/Recorder/Constants/actions');

const generateRecordPath = (recordId) => path.join(BASE_RECORDS_PATH, recordId);
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
};

const lockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, LOCKED_FILE_NAME);

    fse.outputFileSync(lockFile, 'complete')
};

const unlockRecording = (recordId) => {
    const recordingPath = generateRecordPath(recordId);
    const lockFile = path.join(recordingPath, LOCKED_FILE_NAME);

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

const uploadToS3 = (filePath, id, clb) => {
    console.log('Uploading to s3', filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) throw err; // Something went wrong!
        const s3bucket = new AWS.S3({params: {Bucket: AWS_RECORDS_BUCKET}});
        s3bucket.createBucket(() => {
            const params = {
                Key: id,
                Body: data
            };

            s3bucket.upload(params, clb);
        });
    });
};

const clearRecordingPath = (recordId) => {
    const recordingPath = generateRecordPath(recordId);


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
            const {id, chunkId} = client.meta;
            const filePath = generateChunkPath(id, chunkId);
            console.log('Connection closed', id);
            completeRecording(id);
            uploadToS3(filePath, id, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    clearRecordingPath(id);
                }
            });

            if (fileWriter !== null) {
                fileWriter.end();
            }
        });
    });
};




AWS.config.loadFromPath('awsconfig.json');

if (process.env.NODE_ENV !== 'production') {
    fse.emptyDir(BASE_RECORDS_PATH, err => {
        if (err) return console.error(err);

        run();
    })
} else {
    run();
}
