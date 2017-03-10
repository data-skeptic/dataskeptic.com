var fs = require('fs');
var http = require('http');

// Serve client side statically
var express = require('express');
var app = express();

// Start Binary.js server
var BinaryServer = require('binaryjs').BinaryServer;
var bs = BinaryServer({server: server});
var wav = require('wav');

var outFile = 'demo.wav';

console.log(`Wait for new user connections`);
bs.on('connection', function(client){
    console.log(`Incoming stream from browsers`);
    //
    var fileWriter = new wav.FileWriter(outFile, {
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


export default app;
