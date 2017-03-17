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
    }

    render() {
        const {activeStep, onStepReady} = this.props;
        const {ready, recording, stop, review, submitting, complete, error} = this.props;

        return (
            <div className="recording-flow-container">
                <p>{activeStep}</p>

                <Wizard activeKey={activeStep}>
                    <div key={INIT}>init</div>
                    <div key={[READY, RECORDING]}>ready & recording</div>
                    <div key={COMPLETE}>completed</div>
                    <div key={[REVIEW, SUBMITTING]}>
                        <TogglePlayButton
                            recording={false}
                        />
                    </div>
                    <div key={ERROR}>error</div>
                </Wizard>

                <RecorderContainer
                    onReady={ready}
                    onRecording={recording}
                    onStop={stop}
                    onReview={review}
                    onSubmitting={submitting}
                    onComplete={complete}
                    onError={error}
                />
            </div>
        )
    }

}

export default RecorderFlowContainer;