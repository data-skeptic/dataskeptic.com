import React, {PropTypes} from 'react';

import {Field} from 'redux-form';
import {renderField} from '../../../Forms/Components/Field/Field';

export const CommentTypeBox = () => (
    <Field label="Comment" component={renderField} name="comment" textarea type="text" className="comment-box" required/>
);

CommentTypeBox.propTypes = {};

export default CommentTypeBox;