import isEmpty from 'lodash/isEmpty';

import { cvv, cardMonth, cardYear, cardNumber, phone, email } from '../../../Forms/Validators';

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
    } else {
        if (!email(values.email)) {
            errors.email = 'Invalid email';
        }
    }

    if (isEmpty(values.phone)) {
        errors.phone = 'Please provide Phone Number';
    } else {
        if (!phone(values.phone)) {
            errors.phone = 'Invalid Phone Number';
        }
    }

    // card
    if (isEmpty(values.card_number)) {
        errors.card_number = 'Please provide Card Number';
    } else {
        if (!cardNumber(values.card_number)) {
            errors.card_number = 'Invalid Card Number';
        }
    }

    if (isEmpty(values.card_name)) {
        errors.card_name = 'Please provide Cardholder Name';
    }

    if (isEmpty(values.card_month)) {
        errors.card_month = 'Please provide Expiration Month';
    } else {
        if(!cardMonth(values.card_month)) {
            errors.card_month = 'Invalid month';
        }
    }

    if (isEmpty(values.card_year)) {
        errors.card_year = 'Please provide Expiration Year';
    } else {
        if(!cardYear(values.card_year)) {
            errors.card_year = 'Invalid Year';
        }
    }

    if (isEmpty(values.card_cvv)) {
        errors.card_cvv = 'Please provide Card CVV';
    } else {
        if (!cvv(values.card_cvv)) {
            errors.card_cvv = 'Invalid CVV format';
        }
    }

    return errors;
};

export default CheckoutFormValidator;