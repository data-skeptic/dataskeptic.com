import React from 'react';

import { reduxForm } from 'redux-form';

import AddressForm from './AdressForm';
import CreditCardForm from './CreditCardForm';

import CheckoutFormValidator from '../Helpers/CheckoutFormValidator/CheckoutFormValidator';

import FormController from '../../Forms/Components/FormController/FormController';

const Form = ({ handleSubmit, pristine, reset, submitting, invalid, submitSucceeded, submitFailed, customError }) => (
    <FormController
        name="address-credit"
        handleSubmit={handleSubmit}
        btnWrapperClasses='col-xs-12 col-md-6 complete-btn'
        submitValue={<span><i className="glyphicon glyphicon-lock"> </i> Complete Order</span>}
        customError={customError}
    >
        <div className="col-xs-12 col-sm-12"><AddressForm /></div>
        <div className="col-xs-12 col-sm-12"><CreditCardForm /></div>
    </FormController>
);

const CheckoutForm = reduxForm({
    form: 'checkout',
    validate: CheckoutFormValidator
})(Form);

export default CheckoutForm;