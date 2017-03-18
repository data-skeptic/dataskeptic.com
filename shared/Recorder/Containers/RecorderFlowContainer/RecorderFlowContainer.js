import React, {Component, PropTypes} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import RecorderContainer from '../../Containers/RecorderContainer/RecorderContainer';
import {
    INIT,
    READY,
    ERROR,
    RECORDING,
    REVIEW,
    SUBMITTING,
    COMPLETE,
    SERVER_ERROR
} from '../../../Recorder/Constants/steps';

import Wizard from '../../../Wizard';
import TogglePlayButton from '../../../Player/Components/TogglePlayButton';
import Recorder from '../../Components/Recorder/Recorder';
import RecordingTimeTracker from '../../Components/RecordingTimeTracker/RecordingTimeTracker';

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
    }

    componentWillMount() {
        this.controlFlow(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('[RECORDER FLOW CONTAINER] will receive props');

        this.controlFlow(nextProps)
    }

    controlFlow(props) {
        this.nextFlowStep(props.activeStep);
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
                .then(() => this.props.ready())
                .catch((err) => this.props.error('Server unreachable'));
        } else {
            this.props.error('Browser doents support recording')
        }
    }

    onReady() {
        console.log('onReady()');
    }

    onRecording() {
        console.log('onRecording()');
    }

    onReview() {
        console.log('onReview()');
    }

    onSubmitting() {
        console.log('onSubmitting()');
    }

    onComplete() {
        console.log('onComlete()');
    }

    onError() {
        console.log('onComplete()');
    }

    isBrowserSupportRecording() {
        return true;

        if (!navigator.getUserMedia) {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia;
        }

        return !!navigator.getUserMedia;
    }

    haveServerConnection() {
        return new Promise((res, rej) => {
            const BinaryClient = require('binaryjs-client').BinaryClient;
            const hostname = window.location.hostname;
            this.client = new BinaryClient(`ws://${hostname}:9001`);

            this.client.on('open', () => res());
            this.client.on('error', (err) => rej(err));
        });
    }

    isRecording() {
        return this.props.activeStep === RECORDING;
    }

    togglePlaying() {
        if (!this.isRecording()) {
            this.props.recording();
        } else {
            this.props.stop();
        }
    }

    getInfoMessage() {
        return 'test';
    }

    render() {
        const {activeStep, onStepReady} = this.props;
        const {ready, recording, stop, review, submitting, complete, error} = this.props;

        return (
            <div className="recording-flow-container">
                <p>{activeStep}</p>

                <Wizard activeKey={activeStep}>
                    <div key={INIT}>init</div>
                    <div key={[READY, RECORDING]}>
                        <Recorder
                            recording={this.isRecording()}
                            error={''}
                            startComponent={<i className="fa fa-microphone icon">&nbsp;</i>}
                            stopComponent={<i className="fa fa-circle icon">&nbsp;</i>}
                            onClick={this.togglePlaying}
                            info={this.getInfoMessage()}
                        />
                    </div>
                    <div key={COMPLETE}>completed</div>
                    <div key={[COMPLETE, REVIEW, SUBMITTING]} className="review-box">
                        <TogglePlayButton
                            recording={false}
                        />
                        <div className="buttons">
                            <button type="button" className="btn btn-recording-discard btn-xs"><i className="fa fa-undo" aria-hidden="true" /> Discard and record again</button>
                            <button type="button" className="btn btn-recording-submit btn-xs"><i className="fa fa-check" aria-hidden="true" /> Ready to submit</button>
                        </div>
                    </div>
                    <div key={ERROR}>error</div>
                </Wizard>

                {/*<RecorderContainer
                    onReady={ready}
                    onRecording={recording}
                    onStop={stop}
                    onReview={review}
                    onSubmitting={submitting}
                    onComplete={complete}
                    onError={error}
                />*/}
            </div>
        )
    }

}

export default RecorderFlowContainer;