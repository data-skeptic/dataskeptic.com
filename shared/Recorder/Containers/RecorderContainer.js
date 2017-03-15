import React, {Component} from 'react';
import {v4} from 'uuid';
import Recorder from '../Components/Recorder';

import {START, UPLOAD, RESUME, STOP} from '../Constants/actions';
import {float32ToInt16} from '../Helpers/Converter';

const INITIAL_CHUNK_ID_VAL = 0;

export class RecorderContainer extends Component {

    static propTypes = {

    };

    constructor() {
        super();

        this.state = {
            recordId: this.generateRandomRecordId(),
            chunkId: INITIAL_CHUNK_ID_VAL,
            recording: false
        };

        this.togglePlaying = this.togglePlaying.bind(this);
        this.onChunkProcessing = this.onChunkProcessing.bind(this);
    }

    generateRandomRecordId() {
        return v4();
    }

    componentDidMount() {
        // this.initializeRecorder();
    }

    isInitialized() {
        return (this.state.chunkId > INITIAL_CHUNK_ID_VAL);
    }

    initializeRecorder() {
        const BinaryClient = require('binaryjs-client').BinaryClient;
        const hostname = window.location.hostname;
        const client = new BinaryClient(`ws://${hostname}:9001`);

        client.on('open', () => {
            console.log('[Recording]', 'connection open');
            this.Stream = client.createStream({
                id: this.state.recordId,
                chunkId: this.state.chunkId
            });

            if (!navigator.getUserMedia) {
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia || navigator.msGetUserMedia;
            }

            if (navigator.getUserMedia) {
                navigator.getUserMedia({audio:true}, this.onChunkProcessing, (e) => {
                    this.handleError('Error capturing audio.');
                });
            } else {
                this.handleError('Audio recording is not supported in this browser.');
            }
        });

        client.on('error', () => {
            this.handleError('Server unreachable.')
        })
    }

    onChunkProcessing(e) {
        const audioContext = window.AudioContext || window.webkitAudioContext;
        const context = new audioContext();

        // the sample rate is in context.sampleRate
        let audioInput = context.createMediaStreamSource(e);

        const bufferSize = 2048;
        let recorder = context.createScriptProcessor(bufferSize, 1, 1);
        this.recorder = recorder;

        recorder.onaudioprocess = (e) => {
            if(!this.state.recording) return;
            console.log ('recording');
            var left = e.inputBuffer.getChannelData(0);
            this.uploadChunk(float32ToInt16(left));
        };

        audioInput.connect(recorder);
        recorder.connect(context.destination);
    }

    uploadChunk(convertedChunk) {
        this.Stream.write(convertedChunk);
    }

    resumeRecording() {
        this.startRecordingNextChunk();
    }

    startRecording() {
        this.setState({recording: true});

        if (!this.isInitialized()) {
            this.initializeRecorder();
        }
    }

    stopRecording() {
        this.setState({recording: false});
        if (this.recorder) {
            this.recorder.stop();
        }
    }

    startRecordingNextChunk() {
        const chunkId = this.state.chunkId + 1;
        this.setState({chunkId})
    }

    handleError(error) {
        this.setState({error: error});
    }

    togglePlaying() {
        const recording = this.state.recording;

        debugger;
        if (recording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    render() {
        const {playing, error} = this.state;

        return (
            <Recorder
                playing={playing}
                error={error}
                onClick={this.togglePlaying}
            />
        )
    }
}

export default RecorderContainer;