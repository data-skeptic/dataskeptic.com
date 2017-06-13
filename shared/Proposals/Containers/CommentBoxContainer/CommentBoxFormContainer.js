import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';
import CommentTypeSelectorContainer from '../../Containers/CommentTypeSelectorContainer/CommentTypeSelectorContainer';

import {
    changeCommentType,
    uploadFiles,
    updateFiles,
    reviewRecording,
    completeRecording,
    submitCommentForm
} from '../../Actions/CommentBoxFormActions';

import {
    TEXT,
    UPLOAD,
    RECORDING,
    SUBMIT
} from '../../Constants/CommentTypes';

import CommentTypeBox from '../../Components/CommentTypeBox/CommentTypeBox';
import UserInfoBox from '../../Components/UserInfoBox/UserInfoBox';
import UploadFileTypeBox from '../../Components/UploadFileTypeBox/UploadFileTypeBox';
import Recorder, {steps} from '../../../Recorder';

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

import json from '../../../../global-config.json';
import awsConf from '../../../../awsconfig.json';
const AWS_BUCKET = json.aws_proposals_bucket;
const AWS_REGION = awsConf.region;

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

        customSubmitting: PropTypes.bool
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

        this.fileDrop = this.fileDrop.bind(this);
        this.fileRemove = this.fileRemove.bind(this);
    }

    handleSubmit(data) {
        const type = this.props.messageType;

        data.type = type;
        this.props.submitCommentForm(data);
    }

    onChangeCommentType(type) {
        this.props.changeCommentType(type);
    }

    recordingReady(noDelay) {
        this.props.ready(noDelay);
    }

    recorderRecording() {
        this.props.recordingStart();
    }

    recorderStop(id) {
        this.props.recordingFinish(id);

        debugger;
        // const recordingUrl = `https://s3-${AWS_REGION}.amazonaws.com/${AWS_BUCKET}/${id}`;
        const recordingUrl = `https://s3.amazonaws.com/${AWS_BUCKET}/${id}`;
        this.props.reviewRecording(recordingUrl);
    }

    recorderReview(id) {
        this.props.review()
    }

    recorderSubmit(id) {
        this.props.submit();
    }

    recorderComplete(id) {
        this.props.complete(id);
        this.props.completeRecording(id);
    }

    recorderError(error) {
        this.props.fail(error);
    }

    isRecordingComplete() {
        const {messageType, activeStep} = this.props;
        if (messageType === RECORDING) {
            return (activeStep === steps.COMPLETE);
        }

        return false;
    }

    shouldShowSubmitButton() {
        const {messageType} = this.props;

        if (this.isRecordingComplete()) {
            return true;
        }

        return [TEXT, UPLOAD, SUBMIT].indexOf(messageType) > -1;
    }

    shouldShowInfoBox() {
        const {messageType} = this.props;
        return true;

        if (messageType === TEXT || messageType === UPLOAD) {
            return true;
        } else if (this.isRecordingComplete()) {
            return true;
        }

        return false;
    }

    fileDrop(files) {
        this.props.uploadFiles(files);
    }

    fileRemove(removeIndex) {
        let {files} = this.props.values;

        files = files.filter((file, index) => index !== removeIndex);
        this.props.updateFiles(files);
    }

    getSuccessMessage() {
        const {customSubmitting} = this.props;

        if (customSubmitting) {
            return 'Thank you for proposal!'
        } else {
            return false;
        }
    }

    render() {
        const {values, messageType, errorMessage, activeStep, submittedUrl = ''} = this.props;
        const {customSubmitting} = this.props;

        const {files} = values;
        const showSubmit = this.shouldShowSubmitButton();
        const showInfoBox = this.shouldShowInfoBox();
        const successMessage = this.getSuccessMessage();

/*
    Disabling these for now.  Leave them here in case I easily want to add them back.
    
                        <CommentTypeBox key={TEXT}/>

                        <UploadFileTypeBox
                            key={UPLOAD}
                            onDrop={this.fileDrop}
                            onRemove={this.fileRemove}
                            files={files}
                        />
*/
        return (
            <div className="comment-box-form-container">
                <Debug data={values}/>

                <CommentTypeSelectorContainer onChangeCommentType={this.onChangeCommentType} messageType={messageType}/>

                <b>{customSubmitting}</b>

                <CommentBoxForm onSubmit={this.handleSubmit} showSubmit={showSubmit} customSubmitting={customSubmitting}
                                customSuccess={successMessage}>
                    { showInfoBox ?
                        <UserInfoBox />
                        : null }

                    <Wizard activeKey={messageType}>

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

                            submittedUrl={submittedUrl}
                        />

                        <CommentTypeBox key={TEXT}/>

                        <UploadFileTypeBox
                            key={UPLOAD}
                            onDrop={this.fileDrop}
                            onRemove={this.fileRemove}
                            files={files}
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

        customSubmitting: state.proposals.getIn(['form', 'submitted']),

        activeStep: state.proposals.getIn(['form', 'step']),
        messageType: state.proposals.getIn(['form', 'type']),

        errorMessage: state.proposals.getIn(['form', 'error']).toJS(),
        submittedUrl: state.proposals.getIn(['review', 'url'])
    }),
    (dispatch) => bindActionCreators({
        changeCommentType,

        uploadFiles,
        updateFiles,

        completeRecording,
        reviewRecording,
        submitCommentForm,

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