import React from 'react';

import { reduxForm } from 'redux-form';

import AddressForm from './AdressForm';
import CreditCardForm from './CreditCardForm';

import CheckoutFormValidator from '../Helpers/CheckoutFormValidator/CheckoutFormValidator';

import FormController from '../../Forms/Components/FormController/FormController';

const Form = ({ handleSubmit, pristine, reset, submitting, customSubmitting, invalid, submitSucceeded, submitFailed, customSuccess, customError }) => (
    <FormController
        name="address-credit"
        showSubmit={true}
        handleSubmit={handleSubmit}
        btnWrapperClasses='col-xs-12 col-md-6 complete-btn'
        submitValue={ customSubmitting ? <span><img src="/img/spinner.gif" width="15"/> Processing order...</span> :  <span><i className="glyphicon glyphicon-lock"> </i>&nbsp;Complete Order</span> }
        customSuccess={customSuccess}
        customError={customError}
        customSubmitting={customSubmitting}
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