import React from 'react';

import className from 'classnames';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import Loading from "../../Common/Components/Loading";

import FormController from '../../Forms/Components/FormController/FormController';
import { renderField } from '../../Forms/Components/Field/Field';
import { email } from "../../Forms/Validators";

const Form = ({ handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed }) => (
    <FormController name="priorityInbox" handleSubmit={handleSubmit} submitValue={<span>Send</span>} showSubmit={true}>

        <Field
            label="Name"
            component={renderField}
            name="name"
            type="text"
            className="contact-name"
            placeholder="John Smith"
            autocomplete="false"
            labelWrapperClasses='col-xs-12 col-sm-12'
            inputWrapperStyles='col-xs-12 col-sm-12'
            required
        />
        <Field
            label="Email"
            component={renderField}
            name="email" type="email"
            className="contact-name"
            placeholder="j.smith@work.com"
            autocomplete="false"
            labelWrapperClasses='col-xs-12 col-sm-12'
            inputWrapperStyles='col-xs-12 col-sm-12'
            required
        />
        <Field label="Message"
               component={renderField}
               name="message" type="message"
               className="contact-name"
               textarea autocomplete="false"
               labelWrapperClasses='col-xs-12 col-sm-12'
               inputWrapperStyles='col-xs-12 col-sm-12'
               required
        />

        {!submitting ?
            <div className={ className("col-xs-12 col-sm-12 contact-status", {'success': submitSucceeded, 'error': submitFailed}) }>
                {submitFailed ? <span>There was an error sending your message.  Sorry!  Feel free to reach out to kyle@dataskeptic.com directly.</span> : null }
                {submitSucceeded ? <span>Your message has been sent.  Thanks!</span> : null }
            </div>
            :
            <div className={ className("col-xs-12 col-sm-12 contact-status", {'success': submitSucceeded, 'error': submitFailed}) }>
                { (!submitFailed && !submitSucceeded) ?
                    <Loading/>
                    : null }
            </div>
        }

    </FormController>
);

const MAX_MESSAGE_LENGTH = 160;

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide your name.';
    } else {

    }

    if (!values.email) {
        errors.email = 'Required';
    } else {
        if (!email(values.email)) {
            errors.email = 'Please provide a valid email address.';
        }
    }

    if (!values.message) {
        errors.message = 'Required';
    } else {
        if (values.message.length > MAX_MESSAGE_LENGTH) {
            errors.message = 'Message too long.';
        }
    }

    return errors;
}

const PriorityInbox = reduxForm({
    form: 'priorityInbox',
    validate
})(Form);

export default PriorityInbox;