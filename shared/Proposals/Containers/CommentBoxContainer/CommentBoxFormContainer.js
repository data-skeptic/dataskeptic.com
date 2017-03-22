import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';
import CommentTypeSelectorContainer from '../../Containers/CommentTypeSelectorContainer/CommentTypeSelectorContainer';

import {changeCommentType, goToSubmitStep} from '../../Actions/CommentBoxFormActions';
import {TEXT, UPLOAD, RECORDING, SUBMIT} from '../../Constants/CommentTypes';

import CommentTypeBox from '../../Components/CommentTypeBox/CommentTypeBox';
import UserInfoBox from '../../Components/UserInfoBox/UserInfoBox';
import UploadFileTypeBox from '../../Components/UploadFileTypeBox/UploadFileTypeBox';
import Recorder, {steps as RECORDING_STEPS} from '../../../Recorder';

import {
    init,
    ready,
    recordingStart,
    recordingFinish,
    review,
    submit,
    complete,
    fail
} from '../../Actions/RecordingFlowActions';
import Wizard from '../../../Wizard';
import Debug from '../../../Debug';

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
        this.recorderSubmit = this.recorderSubmit.bind(this);
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

    recorderSubmit() {
        this.props.submit();
    }

    recorderComplete() {
        this.props.complete();
        this.props.goToSubmitStep();
    }

    recorderError(error) {
        this.props.fail(error);
    }

    shouldShowSubmitButton() {
        return [TEXT, UPLOAD, SUBMIT].indexOf(this.props.messageType) > -1;
    }

    render() {
        const {values, messageType, errorMessage, activeStep} = this.props;
        const showSubmit = this.shouldShowSubmitButton();

        return (
            <div className="comment-box-form-container">
                <Debug data={values}/>

                <CommentTypeSelectorContainer onChangeCommentType={this.onChangeCommentType} messageType={messageType}/>

                <CommentBoxForm onSubmit={this.handleSubmit} showSubmit={showSubmit}>
                    <Wizard activeKey={messageType}>
                        <CommentTypeBox key={TEXT}/>

                        <UploadFileTypeBox key={UPLOAD}/>

                        <Recorder
                            key={RECORDING}
                            activeStep={activeStep}
                            errorMessage={errorMessage}

                            ready={this.recordingReady}
                            recording={this.recorderRecording}
                            stop={this.recorderStop}
                            review={this.recorderReview}
                            submit={this.recorderSubmit}
                            complete={this.recorderComplete}
                            error={this.recorderError}
                        />

                        <UserInfoBox key={[TEXT,UPLOAD,SUBMIT]}/>
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

        errorMessage: state.proposals.getIn(['form', 'error']).toJS()
    }),
    (dispatch) => bindActionCreators({
        changeCommentType,
        goToSubmitStep,

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