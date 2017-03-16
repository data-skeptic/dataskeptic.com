import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';
import CommentTypeSelectorContainer from '../../Containers/CommentTypeSelectorContainer/CommentTypeSelectorContainer';

import Recorder, {steps as RECORDING_STEPS} from '../../../Recorder';

class CommentBoxFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data));
    }

    render() {
        const {values, activeStep} = this.props;
        return (
            <div className="comment-box-form-container">
                <CommentBoxForm onSubmit={this.handleSubmit}>
                    <CommentTypeSelectorContainer />
                    <Recorder activeStep={activeStep}/>
                </CommentBoxForm>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        activeStep: RECORDING_STEPS.INITIAL
    }),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(CommentBoxFormContainer);