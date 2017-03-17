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

import Wizard from '../../../Wizard';

class CommentBoxFormContainer extends Component {

    static propTypes = {
        messageType: PropTypes.string,
        changeCommentType: PropTypes.func
    };

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCommentType = this.onChangeCommentType.bind(this);

        this.recordingStarted = this.recordingStarted.bind(this);
        this.recordingUploaded = this.recordingUploaded.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data));
    }

    onChangeCommentType(type) {
        this.props.changeCommentType(type);
    }

    recordingStarted() {
        console.log('started');
    }

    recordingUploaded() {
        console.log('uploaded');
    }

    nextStep() {
        console.log('next step');
    }

    render() {
        const {values, messageType, activeStep} = this.props;

        return (
            <div className="comment-box-form-container">
                <CommentTypeSelectorContainer onChangeCommentType={this.onChangeCommentType} messageType={messageType} />
                <CommentBoxForm onSubmit={this.handleSubmit}>
                    <Wizard activeKey={messageType}>
                        <CommentTypeBox key={TEXT} />

                        <UploadFileTypeBox key={UPLOAD} />

                        <Recorder activeStep={activeStep}
                                  key={RECORDING}
                                  onStepReady={this.nextStep}
                                  onRecordingStart={this.recordingStarted}
                                  onRecordingUploaded={this.recordingUploaded}
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
        changeCommentType
    }, dispatch)
)(CommentBoxFormContainer);