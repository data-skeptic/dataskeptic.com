import React from 'react';

import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

const Form = ({ handleSubmit, pristine, reset, submitting }) => (
    <form className="row contact-form" onSubmit={handleSubmit} autocomplete="false">
        <div className="col-xs-12"><h2>Contact Us</h2></div>
        <div className="col-xs-12 col-sm-12 contact-label contact-name-lbl">Name:</div>
        <div className="col-xs-12 col-sm-12"><Field component="input" name="name" type="text" className="contact-name" placeholder="John Smith" required/></div>
        <div className="col-xs-12 col-sm-12 contact-label contact-email-lbl">E-Mail:</div>
        <div className="col-xs-12 col-sm-12"><Field component="input" name="email" type="email" className="contact-email" placeholder="j.smith@work.com" required/></div>
        <div className="col-xs-12 col-sm-12 contact-label">Message:</div>
        <div className="col-xs-12 col-sm-12">
            <Field component="textarea" type="text" className="contact-msg" name="message" required />
        </div>
        <div className="col-xs-12 col-sm-12">
            <button className="btn contact-send" type="submit" disabled={pristine || submitting} >Send</button>
        </div>
    </form>
);


const ContactForm = reduxForm({
    form: 'contact'
})(Form);

export default ContactForm;