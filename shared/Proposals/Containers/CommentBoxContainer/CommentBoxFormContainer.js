import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';
import CommentTypeSelectorContainer from '../../Containers/CommentTypeSelectorContainer/CommentTypeSelectorContainer';

import Recorder from '../../../Recorder';

export class CommentBoxFormContainer extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        console.log(JSON.stringify(data));
    }

    render() {
        const {values} = this.props;
        return (
            <div className="comment-box-form-container">
                <CommentBoxForm onSubmit={this.handleSubmit}>
                    <CommentTypeSelectorContainer />
                    <Recorder />
                </CommentBoxForm>
            </div>
        )
    }
}

export default connect(
    (state) => ({

    }),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(CommentBoxFormContainer);