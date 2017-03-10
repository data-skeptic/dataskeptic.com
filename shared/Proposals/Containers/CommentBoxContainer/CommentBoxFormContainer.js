import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CommentBoxForm from '../../Components/CommentBoxForm/CommentBoxForm';

export class CommentBoxFormContainer extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="comment-box-form-container">
                <div className="comment-type-selector">
                    <div className="btn-group btn-group-justified" role="group" aria-label="...">
                        <div className="btn-group" role="group">
                            <div type="button" className="btn btn-default btn-type active">
                                <div className="description">
                                    Comment <small>Post a few words</small>
                                </div>
                                <div className="icon icon-keyboard"></div>
                            </div>
                        </div>
                        <div className="btn-group" role="group">
                            <div type="button" className="btn btn-default btn-type">
                                <div className="description">
                                    Upload <small>Drag or drop file</small>
                                </div>
                                <div className="icon icon-upload"></div>
                            </div>
                        </div>
                        <div className="btn-group" role="group">
                            <div type="button" className="btn btn-default btn-type">
                                <div className="description">
                                    Audio Comment <small>Record via microphone</small>
                                </div>
                                <div className="icon icon-record"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <CommentBoxForm />
            </div>
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => bindActionCreators({

    }, dispatch)
)(CommentBoxFormContainer);