import React from 'react';
import className from 'classnames';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import Loading from "../../../Common/Components/Loading";

import FormController from '../../../Forms/Components/FormController/FormController';
import { renderField } from '../../../Forms/Components/Field/Field';

import * as types from '../../Constants/CommentTypes';

const Form = ({ children, handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed }) => (
    <FormController name="commentBox" handleSubmit={handleSubmit} submitValue={'Send'}>
        {children}

        <Field label="Name" component={renderField} name="name" type="text" className="contact-name" placeholder="John Smith" autocomplete="false" required/>
        <Field label="Email" component={renderField} name="email" type="email" className="contact-name" placeholder="j.smith@work.com" autocomplete="false" required/>
    </FormController>
);

const CommentBoxForm = reduxForm({
    form: 'commentBox'
})(Form);

export default CommentBoxForm;