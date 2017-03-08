import React from 'react';

import { reduxForm } from 'redux-form';

import AddressForm from './AdressForm';
import CreditCardForm from './CreditCardForm';

import CheckoutFormValidator from '../Helpers/CheckoutFormValidator/CheckoutFormValidator';

import FormController from '../../Forms/Components/FormController/FormController';

const Form = ({ handleSubmit, pristine, reset, submitting, customSubmitting, invalid, submitSucceeded, submitFailed, customError }) => (
    <FormController
        name="address-credit"
        handleSubmit={handleSubmit}
        btnWrapperClasses='col-xs-12 col-md-6 complete-btn'
        submitValue={ customSubmitting ? <span><img src="/img/spinner.gif" width="15"/> Processing order...</span> :  <span><i className="glyphicon glyphicon-lock"> </i>&nbsp;Complete Order</span> }
        customError={customError}
        customSubmitting={customSubmitting}
    >
        <div className="col-xs-12 col-sm-12"><AddressForm /></div>
        <div className="col-xs-12 col-sm-12"><CreditCardForm /></div>
    </FormController>
);

const CheckoutForm = reduxForm({
    form: 'checkout',
    validate: CheckoutFormValidator,
    initialValues: {
        "first_name": "Jonh",
        "last_name": "Smith",
        "street_1": "123 Sttreet",
        "street_2": "Apt",
        "city": "Los Angeles",
        "state": "state",
        "zip": "12345",
        "phone": "(310) 312 - 3123",
        "card_number": "4242424242424242",
        "email": "1@mail.ru",
        "card_name": "cardholder",
        "card_month": "12",
        "card_year": "2017",
        "card_cvv": "123",
        "country": "us",
        "total": 3,
        "shipping": 1,
        "products": [
            {
                "product": {
                    "img": "/img/jpg/button-0.jpg",
                    "title": "1/2 inch pin",
                    "price": 2,
                    "active": 1,
                    "type": "misc",
                    "id": "5",
                    "desc": "One inch pins allow you to proudly show off your Data Skeptic affiliation on your hoodie, backpack, or sombrero."
                },
                "size": "",
                "quantity": 1
            }
        ]
    }
})(Form);

export default CheckoutForm;