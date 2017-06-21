import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import moment from 'moment';


import RecorderContainer from '../../Containers/RecorderContainer/RecorderContainer';
import {
    INIT,
    READY,
    ERROR,
    RECORDING,
    UPLOADING,
    REVIEW,
    SUBMITTING,
    COMPLETE
} from '../../../Recorder/Constants/steps';

import {
    startRecording,
    stopRecording,
    resetRecording,
    updateRecordingDuration,
    getNextId
} from '../../Actions/RecorderActions';

import Wizard from '../../../Wizard';
import Debug from '../../../Debug';
import ProposalLoading from '../../../Proposals/Components/ProposalLoading/ProposalLoading';

import TogglePlayButton from '../../../Player/Components/TogglePlayButton';
import Recorder from '../../Components/Recorder/Recorder';
import RecordingTimeTracker from '../../Components/RecordingTimeTracker/RecordingTimeTracker';

import {float32ToInt16} from '../../Helpers/Converter';
import Resampler from '../../Helpers/Resampler'

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
            [UPLOADING]: this.onUploading.bind(this),
            [REVIEW]: this.onReview.bind(this),
            [SUBMITTING]: this.onSubmitting.bind(this),
            [COMPLETE]: this.onComplete.bind(this),
            [ERROR]: this.onError.bind(this),
        };

        this.toggleRecording = this.toggleRecording.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);

        this.discardRecord = this.discardRecord.bind(this);
        this.submitRecord = this.submitRecord.bind(this);

        this.haveServerConnection = this.haveServerConnection.bind(this);
        this.initRecorderSuccess = this.initRecorderSuccess.bind(this);
        this.uploadChunk = this.uploadChunk.bind(this);
        this.updateDuration = this.updateDuration.bind(this);

        this.state = {
            uploading: false,
            metaReady: false,
            playing: false
        };
    }

    componentWillMount() {
        this.controlFlow(this.props);
        this.props.getNextId();
    }

    componentDidMount() {
        this.audioController = ReactDOM.findDOMNode(this.refs.listen_controller);
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
            this.props.ready();
        } else {
            this.props.error({
                title: 'Browser error',
                body: 'Your browser does not support audio recording.'
            })
        }
    }

    onReady() {
        this.haveServerConnection()
            .then(() => {
                this.props.resetRecording();
            })
            .catch((err) => this.props.error({
                title: 'Server unreachable',
                body: 'Error in connection establishment.'
            }));
    }

    onRecording() {
        console.log('onRecording()');
        this.initRecorder();

        const audio = ReactDOM.findDOMNode(this.refs.listen_controller);
        audio.src = '';
    }

    onUploading() {
        console.log('onUploading()');

        if (!this.state.uploading) {
            this.stopTimeCounter();
            this.stopStreams(this.browserStream);
            this.closeConnection();

            this.setState({
                uploading: true,
                metaReady: false
            })
        }
    }

    onReview() {
        console.log('onReview()');

        this.audioController.src = this.props.submittedUrl + '.wav';

        this.audioController.onloadedmetadata = () => {
            this.setState({metaReady: true});
        };

        this.audioController.onended = () => {
            this.pauseAudio();
        }
    }

    onSubmitting() {
        console.log('onSubmitting()');
        this.props.submit();
    }

    onComplete() {
        console.log('onComplete()');
        this.props.complete(this.props.recorder.id);
    }

    onError() {
        console.log('onError()');
    }

    isBrowserSupportRecording() {
        if (typeof window === "undefined") return;

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
            this.client = new BinaryClient(`ws://${hostname}:9001/recording`);

            const audioCtx = new AudioContext();
            const sampleRate = audioCtx.sampleRate;

            this.client.on('open', () => {
                const meta = {id, chunkId, sampleRate};
                this.Stream = this.client.createStream(meta);
                res();
            });

            this.client.on('error', (err) => rej(err));
        });
    }

    isRecording() {
        return (this.props.activeStep === RECORDING);
    }

    toggleRecording() {
        const {id, chunkId} = this.props.recorder;

        if (!this.isRecording()) {
            this.props.recording();
            this.props.updateRecordingDuration('00:00:00');
            this.props.startRecording(id, chunkId);
        } else {
            this.props.stop(id);
            this.props.stopRecording(id);
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
        this.pauseAudio();
        this.props.ready(true);
        this.props.resetRecording();
        this.props.getNextId();

        this.setState({
            uploading: false
        });
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

    getAudioContext() {
        if (!this.audioContext) {
            const audioContextSource = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new audioContextSource();
        }

        return this.audioContext;
    }

    initRecorderSuccess(stream) {
        this.browserStream = stream;
        const context = this.getAudioContext();

        // the sample rate is in context.sampleRate
        this.audioInput = context.createMediaStreamSource(stream);

        const bufferSize = 4096;
        this.recorder = context.createScriptProcessor(bufferSize, 2, 2);

        this.startTimeCounter();

        this.recorder.onaudioprocess = (e) => {
            if (!this.isRecording()) return;

            const left = e.inputBuffer.getChannelData(0);
            this.uploadChunk(float32ToInt16(left));
        };

        this.audioInput.connect(this.recorder);
        this.recorder.connect(context.destination);
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

        this.recorder.disconnect();
        this.audioInput.disconnect();

        this.recorder = null;
        this.audioInput = null;
    }

    closeConnection() {
        this.client.close();
        this.Stream.end();
    }

    togglePlaying() {
        if (this.isPlaying()) {
            this.pauseAudio();
        } else {
            this.playAudio();
        }
    }

    isMetaReady() {
        return this.state.metaReady;
    }

    isPlaying() {
        return this.state.playing;
    }

    pauseAudio() {
        this.setState({playing: false});

        this.audioController.pause();
    }

    playAudio() {
        this.setState({playing: true});
        this.audioController.play();
    }

    render() {
        const {activeStep, recorder, errorMessage = {}, submittedUrl} = this.props;
        const {isRecording, isUploading, duration, recordingId, chunkId} = recorder;

        const isMetaReady = this.isMetaReady();
        const isPlaying = this.isPlaying();

        return (
            <div>
                <Debug data={{...recorder, activeStep}}/>

                <div className={`recording-flow-container step-${activeStep}`}>

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
                                onClick={this.toggleRecording}
                                info={this.getInfoMessage()}
                            />
                        </div>

                        <div key={UPLOADING} className="uploading-step">
                            <ProposalLoading/>
                        </div>

                        <div key={[REVIEW, SUBMITTING]} className="review-step">
                            <TogglePlayButton
                                onClick={this.togglePlaying}
                                playing={isPlaying}
                                disabled={!isMetaReady}
                            />

                            {isMetaReady &&
                                <div className="buttons">
                                    <button type="button" onClick={this.discardRecord}
                                            className="btn btn-recording-discard btn-xs">
                                        <i className="fa fa-undo" aria-hidden="true"/> Discard and record again
                                    </button>
                                </div>
                            }
                        </div>

                        <div key={COMPLETE} className="complete-step">
                            <div className="text-success">
                                <i className="fa fa-check-circle" aria-hidden="true"/> Audio recording submitted
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

                    <audio ref="listen_controller" className="recording-listener" controls="false"/>
                </div>
            </div>
        )
    }

}

export default connect(
    (state, ownProps) => ({
        submittedUrl: ownProps.submittedUrl,
        recorder: state.recorder.toJS()
    }),
    (dispatch) => bindActionCreators({
        getNextId,
        startRecording,
        stopRecording,
        resetRecording,
        updateRecordingDuration
    }, dispatch)
)(RecorderFlowContainer);