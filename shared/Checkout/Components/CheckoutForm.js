import React from 'react';

import { reduxForm } from 'redux-form';

import AddressForm from './AdressForm';
import CreditCardForm from './CreditCardForm';

import CheckoutFormValidator from '../Helpers/CheckoutFormValidator/CheckoutFormValidator';

import FormController from '../../Forms/Components/FormController/FormController';

const Form = ({ handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed }) => (
    <FormController name="address-credit" handleSubmit={handleSubmit} submitValue="Checkout">
        <div className="col-xs-12 col-sm-12"><AddressForm /></div>
        <div className="col-xs-12 col-sm-12"><CreditCardForm /></div>
    </FormController>
);

const CheckoutForm = reduxForm({
    form: 'checkout',
    validate: CheckoutFormValidator
})(Form);

export default CheckoutForm;