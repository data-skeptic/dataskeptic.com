import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CommentTypeSelector from '../../Components/CommentTypeSelector/CommentTypeSelector';

import {changeCommentType} from '../../Actions/CommentBoxFormActions';

export class CommentTypeSelectorContainer extends Component {
    constructor() {
        super();
        this.onChoose = this.onChoose.bind(this);
    }

    onChoose(type) {
        this.props.changeCommentType(type);
    }

    render() {
        const {messageType} = this.props;

        return (
            <CommentTypeSelector onChoose={this.onChoose} active={messageType}/>

        );
    }
}

export default connect(
    (state) => ({
        messageType: state.proposals.getIn(['form', 'type'])
    }),
    (dispatch) => bindActionCreators({
        changeCommentType
    }, dispatch)
)(CommentTypeSelectorContainer);
