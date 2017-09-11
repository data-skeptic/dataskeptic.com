import React, {Component} from 'react'
import QuestionForm from '../Forms/QuestionForm'
import {formValueSelector} from 'redux-form';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {
    init,
    ready,
    recordingStart,
    recordingFinish,
    review,
    submit,
    complete,
    fail
} from '../../Proposals/Actions/RecordingFlowActions';


class QuestionsContainer extends Component {

    recordingReady = (noDelay) => {
        this.props.ready(noDelay);
    }
    recorderRecording =() =>{
        this.props.recordingStart();
    }

    recorderStop =(id) => {
        this.props.recordingFinish(id);
        const bucket = this.props.aws_proposals_bucket
        const recordingUrl = `https://s3.amazonaws.com/${bucket}/${id}`;
        this.props.reviewRecording(recordingUrl);
    }
    recorderReview = (id) => {
        this.props.review()
    }
    recorderSubmit = (id) => {
        this.props.submit();
    }
    recorderComplete = (id) => {
        this.props.complete(id);
        this.props.completeRecording(id);
    }
    recorderError = (error) => {
        this.props.fail(error);
    }

    render() {
        const {confirmPolicy,activeStep,errorMessage,submittedUrl} = this.props;
        return (
            <div className={`center`}>
                <h3>Listener Questions</h3>
                <p>We love hearing from our listeners!
                    If you have a question about one of our episodes or a general question that's relevant to Data
                    Skeptic, please ask via the in-browser recording system below.
                    Try to keep your question to 30 seconds or less and make sure your question is a question.</p>
                <div>
                    <QuestionForm
                        allowSubmit={!!confirmPolicy}
                        activeStep ={activeStep}
                        errorMessage = {errorMessage}
                        ready={this.recordingReady}
                        recording={this.recorderRecording}
                        stop={this.recorderStop}
                        review={this.recorderReview}
                        submit={this.recorderSubmit}
                        complete={this.recorderComplete}
                        error={this.recorderError}
                        submittedUrl={submittedUrl}
                        initialValues={{
                            confirmPolicy:true
                        }}
                    />
                </div>

            </div>
        )
    }
}

const selector = formValueSelector('question');

export default connect(state => ({
    confirmPolicy: selector(state, 'confirmPolicy'),
    activeStep: state.questions.getIn(['form', 'step']),
    errorMessage : state.questions.getIn(['form', 'error']),
    submittedUrl: state.questions.getIn(['review', 'url']),
    aws_proposals_bucket: state.proposals.getIn(['aws_proposals_bucket'])

}),
    (dispatch) => bindActionCreators({
        init,
        ready,
        recordingStart,
        recordingFinish,
        submit,
        review,
        complete,
        fail
    }, dispatch)
)(QuestionsContainer);