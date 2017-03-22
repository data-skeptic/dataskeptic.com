import React from 'react';
import className from 'classnames';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import Loading from "../../../Common/Components/Loading";

import FormController from '../../../Forms/Components/FormController/FormController';
import { renderField } from '../../../Forms/Components/Field/Field';

import * as types from '../../Constants/CommentTypes';

const Form = ({ children, handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed, showSubmit }) => (
    <FormController name="commentBox" handleSubmit={handleSubmit} submitValue={'Submit proposal'} showSubmit={showSubmit} >
        {children}
    </FormController>
);

const CommentBoxForm = reduxForm({
    form: 'commentBox'
})(Form);

export default CommentBoxForm;