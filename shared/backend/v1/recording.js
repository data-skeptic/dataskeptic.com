var fs = require('fs');
var path = require('path');
var wav = require('wav');

var outFile = 'demo.wav';
const outputFolder = path.resolve(__dirname, '../../../public/', outFile);

function recording(client) {
    console.info('[RECORDING MODULE] to' + outputFolder);

    var fileWriter = new wav.FileWriter(outputFolder, {
        channels: 1,
        sampleRate: 48000,
        bitDepth: 16
    });

    client.on('stream', function(stream, meta) {
        console.log('new stream');
        const file = fs.createWriteStream(outputFolder);

        try {
            stream.pipe(fileWriter);
        } catch(e) {
            console.error(e);
        }

        stream.on('end', function() {
            fileWriter.end();
            console.log('wrote to file ' + outFile);
        });
    });
}

module.exports = {
    recording: recording
};