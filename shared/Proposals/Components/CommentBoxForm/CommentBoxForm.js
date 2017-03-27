import React from 'react';
import className from 'classnames';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import Loading from "../../../Common/Components/Loading";

import FormController from '../../../Forms/Components/FormController/FormController';
import { renderField } from '../../../Forms/Components/Field/Field';

import * as types from '../../Constants/CommentTypes';

import ProposalFormValidator from '../../Helpers/CommentFormValidator/CommentFormValidator';

const Form = ({ children, handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed, showSubmit=true, customSubmitting, customSuccess }) => (
    <FormController name="commentBox"
                    handleSubmit={handleSubmit}
                    submitValue={'Submit proposal'}
                    showSubmit={showSubmit}
                    submitSucceeded={submitSucceeded}
                    customSubmitting={customSubmitting}
                    customSuccess={customSuccess}
    >
        {children}
    </FormController>
);

const CommentBoxForm = reduxForm({
    form: 'commentBox',
    validate: ProposalFormValidator,
    initialValues: {
        type: '',
        files: [],
        recording: {}
    }
})(Form);

export default CommentBoxForm;