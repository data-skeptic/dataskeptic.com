import React, {Component, PropTypes} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import moment from 'moment';

import RecorderContainer from '../../Containers/RecorderContainer/RecorderContainer';
import {
    INIT,
    READY,
    ERROR,
    RECORDING,
    REVIEW,
    SUBMITTING,
    COMPLETE
} from '../../../Recorder/Constants/steps';

import {
    startRecording,
    stopRecording,
    resetRecording,
    updateRecordingDuration
} from '../../Actions/RecorderActions';

import Wizard from '../../../Wizard';
import Debug from '../../../Debug';

import TogglePlayButton from '../../../Player/Components/TogglePlayButton';
import Recorder from '../../Components/Recorder/Recorder';
import RecordingTimeTracker from '../../Components/RecordingTimeTracker/RecordingTimeTracker';

import {float32ToInt16} from '../../Helpers/Converter';

/**
 * Recording flow
 *
 * 0. INIT - initialize
 * 1. READY - browser recording supported | ERROR - browser doesn't support recording
 * 2. RECORDING -
 * 3. REVIEW - user able to review recording or try to record again.
 * 4. SUBMITTING - user submit recording
 * 5. COMPLETE - user successfully submitted record | ERROR - server response with error message
 */
class RecorderFlowContainer extends Component {

    static propTypes = {
        activeStep: PropTypes.string
    };

    constructor() {
        super();

        /**
         * STEPS HOOKS
         **/
        this.stepsActionHandlers = {
            [INIT]: this.onInit.bind(this),
            [READY]: this.onReady.bind(this),
            [RECORDING]: this.onRecording.bind(this),
            [REVIEW]: this.onReview.bind(this),
            [SUBMITTING]: this.onSubmitting.bind(this),
            [COMPLETE]: this.onComplete.bind(this),
            [ERROR]: this.onError.bind(this),
        };

        this.togglePlaying = this.togglePlaying.bind(this);

        this.discardRecord = this.discardRecord.bind(this);
        this.submitRecord = this.submitRecord.bind(this);

        this.haveServerConnection = this.haveServerConnection.bind(this);
        this.initRecorderSuccess = this.initRecorderSuccess.bind(this);
        this.uploadChunk = this.uploadChunk.bind(this);
        this.updateDuration = this.updateDuration.bind(this);

        this.state = {};
    }

    componentWillMount() {
        this.controlFlow(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('[RECORDER FLOW CONTAINER] will receive props');

        if (this.isStepChanged(this.props.activeStep, nextProps.activeStep)) {
            this.controlFlow(nextProps)
        }
    }

    controlFlow(props) {
        this.nextFlowStep(props.activeStep);
    }

    isStepChanged(currentStep, nextStep) {
        return (currentStep !== nextStep);
    }

    nextFlowStep(nextStep) {
        console.log('[RECORDER FLOW CONTAINER] next flow step');
        console.dir(nextStep);

        this.stepsActionHandlers[nextStep]();
    }

    onInit() {
        console.log('onInit()');

        if (this.isBrowserSupportRecording()) {
            this.haveServerConnection()
                .then(() => {
                    this.props.resetRecording();
                    this.props.ready()
                })
                .catch((err) => this.props.error({
                    title: 'Server unreachable',
                    body: 'Error in connection establishment.'
                }));
        } else {
            this.props.error({
                title: 'Browser error',
                body: 'Your browser does not support audio recording.'
            })
        }
    }

    onReady() {
        console.log('onReady()');
    }

    onRecording() {
        console.log('onRecording()');
        this.initRecorder();
    }

    onReview() {
        console.log('onReview()');

        this.stopTimeCounter();
        this.stopStreams(this.browserStream);
    }

    onSubmitting() {
        console.log('onSubmitting()');
    }

    onComplete() {
        console.log('onComplete()');
    }

    onError() {
        console.log('onError()');
    }

    isBrowserSupportRecording() {
        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;
        }

        return !!navigator.getUserMedia;
    }

    haveServerConnection() {
        return new Promise((res, rej) => {
            const {id, chunkId} = this.props.recorder;

            const BinaryClient = require('binaryjs-client').BinaryClient;
            const hostname = window.location.hostname;
            this.client = new BinaryClient(`ws://${hostname}:9001`);

            this.client.on('open', () => {
                const meta = {id, chunkId};
                this.Stream = this.client.createStream(meta);
                res();
            });

            this.client.on('error', (err) => rej(err));
        });
    }

    isRecording() {
        return this.props.activeStep === RECORDING;
    }

    togglePlaying() {
        if (!this.isRecording()) {
            this.props.recording();
            const {id, chunkId} = this.props.recorder;
            this.props.startRecording(id, chunkId);
        } else {
            this.props.stop();
            this.props.stopRecording();
        }
    }

    getInfoMessage() {
        const {duration} = this.props.recorder;

        if (this.isRecording()) {
            return (
                <RecordingTimeTracker duration={duration}/>
            )
        }

        return (
            <div className="text-muted">
                Recording will start when you hit the button below. <i>You will have a chance to review your recording
                before submitting.</i>
            </div>
        );
    }

    discardRecord() {
        this.props.ready();
        this.props.resetRecording();
    }

    submitRecord() {
        this.props.submit();
    }

    initRecorder() {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, this.initRecorderSuccess, (e) => {
                this.props.error({
                    title: 'Recording error',
                    body: 'Enable(link based on browser) dataskeptic.com to use your microphone.'
                });
            });
        } else {
            this.props.error({
                title: 'Recording error',
                body: 'Audio recording is not supported in this browser.'
            });
        }
    }

    initRecorderSuccess(stream) {
        this.browserStream = stream;
        const audioContext = window.AudioContext || window.webkitAudioContext;
        const context = new audioContext();

        // the sample rate is in context.sampleRate
        let audioInput = context.createMediaStreamSource(stream);

        const bufferSize = 2048;
        let recorder = context.createScriptProcessor(bufferSize, 1, 1);
        this.recorder = recorder;

        this.startTimeCounter();

        recorder.onaudioprocess = (e) => {
            if (!this.isRecording()) return;

            const left = e.inputBuffer.getChannelData(0);
            this.uploadChunk(float32ToInt16(left));
        };

        audioInput.connect(recorder);
        recorder.connect(context.destination);
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
        const then = new Date(this.props.recorder.startedAt);
        const now = new Date();

        const duration = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")

        this.props.updateRecordingDuration(duration);
    }

    uploadChunk(convertedChunk) {
        this.Stream.write(convertedChunk);
    }

    stopStreams(stream) {
        for (let track of stream.getTracks()) {
            track.stop()
        }
    }

    render() {
        const {activeStep, recorder, errorMessage = {}} = this.props;
        const {isRecording, isUploading, duration, recordingId, chunkId} = recorder;

        return (
            <div>
                <Debug data={{...recorder, activeStep}} />

                <div className="recording-flow-container">

                    <Wizard activeKey={activeStep}>

                        <div key={INIT} className="init-step">
                            <div className="media init-box">
                                <div className="media-left">
                                    <i className="glyphicon glyphicon-wrench icon"/>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">Setting up recorder...</h4>
                                    <p className="text">Checking browser microphone access and server availability.</p>
                                </div>
                            </div>
                        </div>

                        <div key={[READY, RECORDING]} className="recording-step">
                            <Recorder
                                recording={this.isRecording()}
                                startComponent={<i className="fa fa-microphone icon">&nbsp;</i>}
                                stopComponent={<i className="fa fa-circle icon">&nbsp;</i>}
                                onClick={this.togglePlaying}
                                info={this.getInfoMessage()}
                            />
                        </div>

                        <div key={[REVIEW, SUBMITTING]} className="review-step">
                            <TogglePlayButton
                                recording={false}
                            />
                            <div className="buttons">
                                <button type="button" onClick={this.discardRecord}
                                        className="btn btn-recording-discard btn-xs">
                                    <i className="fa fa-undo" aria-hidden="true"/> Discard and record again
                                </button>
                                <button type="button" onClick={this.submitRecord}
                                        className="btn btn-recording-submit btn-xs">
                                    <i className="fa fa-check" aria-hidden="true"/> Ready to submit
                                </button>
                            </div>
                        </div>

                        <div key={COMPLETE} className="complete-step">
                            <div className="text-success">
                                <i className="fa fa-check-circle" aria-hidden="true"/> Submitted
                            </div>
                        </div>

                        <div key={ERROR} className="error-step">
                            <div className="media error-box">
                                <div className="media-left">
                                    <i className="glyphicon glyphicon-warning-sign icon"/>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">{errorMessage.title}</h4>
                                    <p className="text">{errorMessage.body}</p>
                                </div>
                            </div>
                        </div>
                    </Wizard>
                </div>
            </div>
        )
    }

}

export default connect(
    (state) => ({
        recorder: state.recorder.toJS()
    }),
    (dispatch) => bindActionCreators({
        startRecording,
        stopRecording,
        resetRecording,
        updateRecordingDuration
    }, dispatch)
)(RecorderFlowContainer);