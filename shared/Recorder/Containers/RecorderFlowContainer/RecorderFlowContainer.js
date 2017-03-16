import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {
    INIT,
    READY,
    ERROR,
    RECORDING,
    REVIEW,
    SUBMITTING,
    COMPLETE,
    SERVER_ERROR
} from '../../Constants/steps';

import Wizard from '../../../Wizard';

/**
 * Recording flow
 *
 * 0. INIT - initialize
 * 1. READY - browser recording supported | ERROR - browser doesn't support recording
 * 2. RECORDING -
 * 3. REVIEW - user able to review recording or try to record again.
 * 4. SUBMITTING - user submit recording
 * 5. COMPLETE - user successfully submitted record | SERVER_ERROR - server response with error message
 */
class RecorderFlowContainer extends Component {

    static propTypes = {
        activeKey: PropTypes.string
    };

    constructor() {
        super();
    }

    getVisibleKey() {
        return this.props.activeStep || ERROR;
    }

    isStepVisible(candidateKey) {
        const visibleKey = this.getVisibleKey();

        return (candidateKey === visibleKey);
    }

    render() {
        const visibleKey = this.getVisibleKey();

        return (
            <div className="recording-steps-container">
                <p>Visible key: <b>{visibleKey}</b></p>

                <div className={classNames('step step-init', {'visible': this.isStepVisible(INIT)})}>
                    init
                </div>

                <div className={classNames('step step-ready', {'visible': this.isStepVisible(READY)})}>
                    ready
                </div>

                <div className={classNames('step step-recording', {'visible': this.isStepVisible(RECORDING)})}>
                    recording
                </div>

                <div className={classNames('step step-review', {'visible': this.isStepVisible(REVIEW)})}>
                    review
                </div>

                <div className={classNames('step step-submitting', {'visible': this.isStepVisible(SUBMITTING)})}>
                    submitting
                </div>

                <div className={classNames('step step-complete', {'visible': this.isStepVisible(COMPLETE)})}>
                    complete
                </div>

                <div
                    className={classNames('step step-error', {'visible': this.isStepVisible(ERROR) || this.isStepVisible(SERVER_ERROR)})}>
                    error
                </div>
            </div>
        )
    }

}

export default RecorderFlowContainer;