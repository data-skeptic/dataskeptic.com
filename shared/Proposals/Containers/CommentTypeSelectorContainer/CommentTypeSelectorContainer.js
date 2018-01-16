import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import CommentTypeSelector from '../../Components/CommentTypeSelector/CommentTypeSelector';

class CommentTypeSelectorContainer extends Component {

    static propTypes = {
        messageType: PropTypes.string,
        onChangeCommentType: PropTypes.func
    };

    constructor() {
        super();
        this.onChoose = this.onChoose.bind(this);
    }

    onChoose(type) {
        console.log(type)
        this.props.onChangeCommentType(type);
    }

    render() {
        const {messageType} = this.props;

        return (
            <CommentTypeSelector onChoose={this.onChoose} active={messageType}/>
        );
    }

}

export default CommentTypeSelectorContainer;