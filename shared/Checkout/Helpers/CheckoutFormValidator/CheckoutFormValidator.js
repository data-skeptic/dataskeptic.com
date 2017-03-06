import isEmpty from 'lodash/isEmpty';

const defaultValues = {
    // address
    first_name: '',
    last_name: '',
    street_1: '',
    street_2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: '',
    // card
    card_number: '',
    card_name: '',
    card_month: '',
    card_year: '',
    card_cvv: ''
};

export const CheckoutFormValidator = (values) => {
    const errors = {};

    // address
    if (isEmpty(values.first_name)) {
        errors.first_name = 'Please provide First Name';
    }

    if (isEmpty(values.last_name)) {
        errors.last_name = 'Please provide Last Name';
    }

    if (isEmpty(values.street_1)) {
        errors.street_1 = 'Please provide Street Address';
    }

    if (isEmpty(values.city)) {
        errors.city = 'Please provide City';
    }

    if (isEmpty(values.state)) {
        errors.state = 'Please provide State or Province';
    }

    if (isEmpty(values.zip)) {
        errors.zip = 'Please provide Zip Code';
    }

    if (isEmpty(values.email)) {
        errors.email = 'Please provide Email';
    }

    if (isEmpty(values.phone)) {
        errors.phone = 'Please provide Phone Number';
    }

    // card
    if (isEmpty(values.card_number)) {
        errors.card_number = 'Please provide Card Number';
    }

    if (isEmpty(values.card_name)) {
        errors.card_name = 'Please provide Cardholder Name';
    }

    if (isEmpty(values.card_month)) {
        errors.card_month = 'Please provide Expiration Month';
    }

    if (isEmpty(values.card_year)) {
        errors.card_year = 'Please provide Expiration Year';
    }

    if (isEmpty(values.card_cvv)) {
        errors.card_cvv = 'Please provide Card CVV';
    }

    return errors;
};

export default CheckoutFormValidator;