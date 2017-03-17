import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';
import CommentTypeSelectorContainer from '../../Containers/CommentTypeSelectorContainer/CommentTypeSelectorContainer';

import {changeCommentType} from '../../Actions/CommentBoxFormActions';
import {TEXT, UPLOAD, RECORDING} from '../../Constants/CommentTypes';

import CommentTypeBox from '../../Components/CommentTypeBox/CommentTypeBox';
import UploadFileTypeBox from '../../Components/UploadFileTypeBox/UploadFileTypeBox';
import Recorder, {steps as RECORDING_STEPS} from '../../../Recorder';


import {init, ready, recordingStart, recordingFinish, review, submit, complete, fail} from '../../Actions/RecordingFlowActions';
import Wizard from '../../../Wizard';

class CommentBoxFormContainer extends Component {

    static propTypes = {
        messageType: PropTypes.string,

        changeCommentType: PropTypes.func,
        init: PropTypes.func,
        ready: PropTypes.func,
        recordingStart: PropTypes.func,
        recordingFinish: PropTypes.func,
        submit: PropTypes.func,
        complete: PropTypes.func,
    };

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCommentType = this.onChangeCommentType.bind(this);

        this.recordingReady = this.recordingReady.bind(this);
        this.recorderRecording = this.recorderRecording.bind(this);
        this.recorderStop = this.recorderStop.bind(this);
        this.recorderReview = this.recorderReview.bind(this);
        this.recorderSubmitting = this.recorderSubmitting.bind(this);
        this.recorderComplete = this.recorderComplete.bind(this);
        this.recorderError = this.recorderError.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data));
    }

    onChangeCommentType(type) {
        this.props.changeCommentType(type);
    }

    recordingReady() {
        this.props.ready();
    }

    recorderRecording() {
        this.props.recordingStart();
    }

    recorderStop() {
        this.props.recordingFinish();
    }

    recorderReview() {
        this.props.review()
    }

    recorderSubmitting() {
        this.props.submit()
    }

    recorderComplete() {
        this.props.complete()
    }

    recorderError(error) {
        this.props.fail(error);
    }

    render() {
        const {values, messageType, activeStep} = this.props;

        return (
            <div className="comment-box-form-container">
                <CommentTypeSelectorContainer onChangeCommentType={this.onChangeCommentType} messageType={messageType}/>
                <CommentBoxForm onSubmit={this.handleSubmit}>
                    <Wizard activeKey={messageType}>
                        <CommentTypeBox key={TEXT}/>

                        <UploadFileTypeBox key={UPLOAD}/>

                        <Recorder
                            key={RECORDING}
                            activeStep={activeStep}

                            ready={this.recordingReady}
                            recording={this.recorderRecording}
                            stop={this.recorderStop}
                            review={this.recorderReview}
                            submitting={this.recorderSubmitting}
                            complete={this.recorderComplete}
                            error={this.recorderError}
                        />
                    </Wizard>
                </CommentBoxForm>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        values: state.proposals.getIn(['form']).toJS(),

        activeStep: state.proposals.getIn(['form', 'step']),
        messageType: state.proposals.getIn(['form', 'type']),
        recording: state.proposals.getIn(['recording', 'type'])
    }),
    (dispatch) => bindActionCreators({
        changeCommentType,
        init,
        ready,
        recordingStart,
        recordingFinish,
        submit,
        review,
        complete,
        fail
    }, dispatch)
)(CommentBoxFormContainer);