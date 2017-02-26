const MIN_NAME_LENGTH = 6;
const MIN_MESSAGE_LENGTH = 6;

const isEmail = value =>
    value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

export const ContactFormValidator = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please provide your name.';
    } else {
        if (values.name.length < MIN_NAME_LENGTH) {
            errors.name = 'Please write your real name';
        }
    }

    if (!values.email) {
        errors.email = 'Required';
    } else {
        if (!isEmail(values.email)) {
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

    console.dir(errors);

    return errors;
};

export default ContactFormValidator;