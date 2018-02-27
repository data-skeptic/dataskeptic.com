const MIN_MESSAGE_LENGTH = 6;

import {email} from '../../../Forms/Validators';

export const ContactFormValidator = values => {
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
        if (values.message.length < MIN_MESSAGE_LENGTH) {
            errors.message = 'Please provide a message.';
        }
    }

    return errors;
};

export default ContactFormValidator;