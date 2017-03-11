const fs = require('fs');
const http = require('http');
const BinaryServer = require('binaryjs').BinaryServer;

export const RecordingServer = (server) => {
    console.info('[RecordingServer] started');
    // Start Binary.js server
    const bs = BinaryServer({server: server});
    const wav = require('wav');

    const outFile = 'demo.wav';

    console.log(`Wait for new user connections`);
    bs.on('connection', function(client){
        console.log(`Incoming stream from browsers`);
        //
        const fileWriter = new wav.FileWriter(outFile, {
            channels: 1,
            sampleRate: 48000,
            bitDepth: 16
        });

        client.on('stream', function(stream, meta) {
            console.log('new stream');
            stream.pipe(fileWriter);

            stream.on('end', function() {
                fileWriter.end();
                console.log('wrote to file ' + outFile);
            });
        });
    });
};

export default RecordingServer;