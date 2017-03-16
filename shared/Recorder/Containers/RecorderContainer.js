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
            recordId: 'default',
            chunkId: INITIAL_CHUNK_ID_VAL,
            recording: false
        };

        this.togglePlaying = this.togglePlaying.bind(this);
        this.onChunkProcessing = this.onChunkProcessing.bind(this);
    }

    componentWillUnmount() {
        this.stopRecording();
    }

    generateRandomRecordId() {
        return v4();
    }

    isInitialized() {
        return (this.state.chunkId > INITIAL_CHUNK_ID_VAL);
    }

    initializeRecorder() {
        const BinaryClient = require('binaryjs-client').BinaryClient;
        const hostname = window.location.hostname;
        this.client = new BinaryClient(`ws://${hostname}:9001`);

        this.client.on('open', () => {
            console.log('[Recording]', 'connection open');
            this.Stream = this.client.createStream({
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

        this.client.on('error', () => {
            this.handleError('Server unreachable.')
        })
    }

    onChunkProcessing(stream) {
        this.browserStream = stream;
        const audioContext = window.AudioContext || window.webkitAudioContext;
        const context = new audioContext();

        // the sample rate is in context.sampleRate
        let audioInput = context.createMediaStreamSource(stream);

        const bufferSize = 2048;
        let recorder = context.createScriptProcessor(bufferSize, 1, 1);
        this.recorder = recorder;

        recorder.onaudioprocess = (e) => {
            if(!this.state.recording) return;
            console.log ('recording');
            const left = e.inputBuffer.getChannelData(0);
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
        this.setState({
            recording: true,
            recordId: this.generateRandomRecordId(),
        });

        if (!this.isInitialized()) {
            this.initializeRecorder();
        }
    }

    stopRecording() {
        this.setState({
            recording: false,
            chunkId: INITIAL_CHUNK_ID_VAL
        });

        if (this.recorder) {
            this.recorder.disconnect();
        }

        if (this.client) {
            this.client.close();
        }

        if (this.browserStream) {
            this.stopStreams(this.browserStream);
        }

        this.recordingComplete();
    }

    recordingComplete() {
        const {id} = this.state;
        if (this.props.recordingComplete) {
            this.props.recordingComplete(id);
        }
    }

    stopStreams(stream) {
        for (let track of stream.getTracks()) { track.stop() }
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

        if (recording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    render() {
        const {recording, error} = this.state;

        return (
            <div className="recording-container">
                <Recorder
                    recording={recording}
                    error={error}
                    startComponent={<i className="fa fa-microphone icon">&nbsp;</i>}
                    stopComponent={<i className="fa fa-circle icon">&nbsp;</i>}
                    onClick={this.togglePlaying}
                />
            </div>
        )
    }
}

export default RecorderContainer;