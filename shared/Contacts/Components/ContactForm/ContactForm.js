import React from 'react';

import className from 'classnames';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

import { ContactFormValidator } from '../../Helpers/ContactFormValidator/ContactFormValidator';

import Loading from "../../../Common/Components/Loading";

const renderField = ({ input, label, type, textarea, required, meta: { touched, error, warning, invalid } }) => {
    const textareaType = <textarea {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
    const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;

    return (
        <div>
            <div className="col-xs-12 col-sm-12 contact-label contact-name-lbl">{label}&nbsp;{required ? <span className="required">*</span> : null}</div>
            <div className="col-xs-12 col-sm-12">
                {textarea ? textareaType : inputType}

                <p className="error-message">{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</p>
            </div>
        </div>
    );
};

const Form = ({ handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed }) => (
    <form className="row contact-form" onSubmit={handleSubmit} autocomplete="false">
        <div className="col-xs-12 col-md-12"><h2>Contact Us</h2></div>


        <Field label="Name" component={renderField} name="name" type="text" className="contact-name" placeholder="John Smith" autocomplete="false" required/>
        <Field label="Email" component={renderField} name="email" type="email" className="contact-name" placeholder="j.smith@work.com" autocomplete="false" required/>
        <Field label="Message" component={renderField} name="message" type="message" className="contact-name" textarea autocomplete="false" required/>

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

        { !submitSucceeded && !submitting ?
        <div className="col-xs-12 col-sm-12">
            <button className="btn contact-send" type="submit" disabled={(pristine || invalid) || submitting} >Send</button>
        </div>
        : null}
    </form>
);


const ContactForm = reduxForm({
    form: 'contact',
    validate: ContactFormValidator
})(Form);

export default ContactForm;