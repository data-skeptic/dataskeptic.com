import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {
    INIT,
    READY,
    ERROR,
    RECORDING,
    REVIEW,
    SUBMITTING,
    COMPLETE
} from '../../Constants/steps';

import Wizard from '../../../Wizard';

import RecorderContainer from '../../Containers/RecorderContainer/RecorderContainer';

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
        const {activeStep} = this.props;

        return (
            <div className="recording-flow-container">

                <Wizard activeKey={activeStep}>
                    <div key={INIT}>
                        init
                    </div>

                    <div key={READY}>
                        ready
                    </div>

                    <div key={RECORDING}>
                        <RecorderContainer />
                    </div>

                    <div key={REVIEW}>
                        review
                    </div>

                    <div key={SUBMITTING}>
                        submitting
                    </div>

                    <div key={COMPLETE}>
                        complete
                    </div>

                    <div key={ERROR}>
                        error
                    </div>
                </Wizard>
            </div>
        )
    }

}

export default RecorderFlowContainer;