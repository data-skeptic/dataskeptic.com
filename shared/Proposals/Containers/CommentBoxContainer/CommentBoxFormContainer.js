import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';
import CommentTypeSelectorContainer from '../../Containers/CommentTypeSelectorContainer/CommentTypeSelectorContainer';

import {changeCommentType} from '../../Actions/CommentBoxFormActions';
import Recorder, {steps as RECORDING_STEPS} from '../../../Recorder';

class CommentBoxFormContainer extends Component {

    static propTypes = {
        messageType: PropTypes.string,
        changeCommentType: PropTypes.func
    };

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeCommentType = this.onChangeCommentType.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data));
    }

    onChangeCommentType(type) {
        this.props.changeCommentType(type);
    }

    render() {
        const {values, messageType, activeStep} = this.props;

        return (
            <div className="comment-box-form-container">
                <CommentBoxForm onSubmit={this.handleSubmit}>
                    <CommentTypeSelectorContainer onChangeCommentType={this.onChangeCommentType} messageType={messageType} />
                    <Recorder activeStep={activeStep}/>
                </CommentBoxForm>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        activeStep: state.proposals.get('step'),
        messageType: state.proposals.getIn(['form', 'type']),
        recording: state.proposals.getIn(['recording', 'type'])
    }),
    (dispatch) => bindActionCreators({
        changeCommentType
    }, dispatch)
)(CommentBoxFormContainer);