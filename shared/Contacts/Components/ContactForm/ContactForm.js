import React from 'react';

import className from 'classnames';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import { ContactFormValidator } from '../../Helpers/ContactFormValidator/ContactFormValidator';

import Loading from "../../../Common/Components/Loading";

import FormController from '../../../Forms/Components/FormController/FormController';
import { renderField } from '../../../Forms/Components/Field/Field';

const Form = ({ handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed }) => (
    <FormController name="contacts" handleSubmit={handleSubmit} submitValue="Send">
        <div className="col-xs-12 col-md-12"><h2>Contact Us</h2></div>

        <Field label="Name" component={renderField} name="name" type="text" className="contact-name" placeholder="John Smith" autocomplete="false" labelWrapperClasses='col-xs-12 col-sm-12' inputWrapperStyles='col-xs-12 col-sm-12' required/>
        <Field label="Email" component={renderField} name="email" type="email" className="contact-name" placeholder="j.smith@work.com" autocomplete="false" labelWrapperClasses='col-xs-12 col-sm-12' inputWrapperStyles='col-xs-12 col-sm-12' required/>
        <Field label="Message" component={renderField} name="message" type="message" className="contact-name" textarea autocomplete="false" labelWrapperClasses='col-xs-12 col-sm-12' inputWrapperStyles='col-xs-12 col-sm-12' required/>

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


const ContactForm = reduxForm({
    form: 'contact',
    validate: ContactFormValidator
})(Form);

export default ContactForm;