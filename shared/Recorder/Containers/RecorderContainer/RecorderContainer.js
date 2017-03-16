import React, {Component} from 'react';
import {v4} from 'uuid';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import {START, UPLOAD, RESUME, STOP} from '../../Constants/actions';
import {float32ToInt16} from '../../Helpers/Converter';

const INITIAL_CHUNK_ID_VAL = 0;

import Recorder from '../../Components/Recorder/Recorder';
import RecordingTimeTracker from '../../Components/RecordingTimeTracker/RecordingTimeTracker';

export class RecorderContainer extends Component {

    static propTypes = {

    };

    constructor() {
        super();

        this.state = {
            recordId: 'default',
            chunkId: INITIAL_CHUNK_ID_VAL,
            recording: false,
            duration: '00:00:00'
        };

        this.togglePlaying = this.togglePlaying.bind(this);
        this.onChunkProcessing = this.onChunkProcessing.bind(this);

        this.startTimeCounter = this.startTimeCounter.bind(this);
        this.stopTimeCounter = this.stopTimeCounter.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
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
        this.setState({
            startedAt: (new Date()),
            recording: true
        });

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

        this.startTimeCounter();
    }

    startTimeCounter() {
        this.timeCounter = setInterval(this.updateDuration, 1000);
    }

    stopTimeCounter() {
        if (this.timeCounter) {
            clearInterval(this.timeCounter);
            this.timeCounter = null;
        }
    }

    updateDuration() {
        const then = this.state.startedAt;
        const now = new Date();

        const duration = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

        console.log('update duration', duration)

        this.setState({
            duration
        })
    }

    uploadChunk(convertedChunk) {
        this.Stream.write(convertedChunk);
    }

    resumeRecording() {
        this.startRecordingNextChunk();
    }

    startRecording() {
        this.setState({
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

        this.stopTimeCounter();
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

    getInfoMessage() {
        if (!isEmpty(this.state.error)) return false;

        if (this.state.recording) {
            return <RecordingTimeTracker duration={this.state.duration} />
        }

        return 'Recording will start when you hit the button below. You will have a chance to review your recording before submitting.';
    }

    render() {
        const {recording, error, duration} = this.state;

        return (
            <div className="recording-container">
                <Recorder
                    recording={recording}
                    error={error}
                    startComponent={<i className="fa fa-microphone icon">&nbsp;</i>}
                    stopComponent={<i className="fa fa-circle icon">&nbsp;</i>}
                    onClick={this.togglePlaying}
                    info={this.getInfoMessage()}
                />
            </div>
        )
    }
}

export default RecorderContainer;