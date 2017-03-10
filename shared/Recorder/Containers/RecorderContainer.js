import React, {Component} from 'react';

import Recorder from '../Components/Recorder';

function convertoFloat32ToInt16(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l])*0x7FFF;
    }
    return buf.buffer;
}

export class RecorderContainer extends Component {

    static propTypes = {

    };

    constructor() {
        super();

        this.state = {
            recording: false
        };

        this.togglePlaying = this.togglePlaying.bind(this);
        this.onChunkProcessing = this.onChunkProcessing.bind(this);
    }

    componentDidMount() {
        // this.initializeRecorder();
    }

    shouldComponentUpdate() {
        return false;
    }

    initializeRecorder() {
        const BinaryClient = require('binaryjs-client').BinaryClient;
        const client = new BinaryClient('ws://localhost:9001');

        client.on('open', () => {
            this.Stream = client.createStream();

            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;

            if (navigator.getUserMedia) {
                navigator.getUserMedia({audio:true}, this.onChunkProcessing, function(e) {
                    alert('Error capturing audio.');
                });
            } else alert('getUserMedia not supported in this browser.');
        });
    }

    onChunkProcessing(e) {
        const audioContext = window.AudioContext || window.webkitAudioContext;
        const context = new audioContext();

        // the sample rate is in context.sampleRate
        let audioInput = context.createMediaStreamSource(e);

        const bufferSize = 2048;
        let recorder = context.createScriptProcessor(bufferSize, 1, 1);

        recorder.onaudioprocess = (e) => {
            if(!this.state.recording) return;
            console.log ('recording');
            var left = e.inputBuffer.getChannelData(0);
            this.Stream.write(convertoFloat32ToInt16(left));
        };

        audioInput.connect(recorder);
        recorder.connect(context.destination);
    }

    togglePlaying() {
        alert('hey!');
        const nextPlaying = !this.state.recording;
        if (nextPlaying) {
            this.initializeRecorder();
        }
        this.setState({recording: nextPlaying});
    }


    render() {
        const {playing} = this.state;
        return (
            <Recorder
                playing={playing}
                onClick={this.togglePlaying}
            />
        )
    }
}

export default RecorderContainer;