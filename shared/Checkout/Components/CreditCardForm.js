import React from 'react';

import { renderField } from '../../Forms/Components/Field/Field';

import { Field } from 'redux-form';

export const CreditCard = ({ title = 'Billing Details' }) => (
    <div className="credit-cart-form-container">
        <div className="shipping-address-title">{title}</div>

        <div className="row">

            <Field fieldWrapperClasses="col-md-12" component={renderField}  autocomplete="false" required
                   label="Credit Card Number" name="card-number" type="text" className="number" placeholder="4242 4242 4242 4242"/>

        </div>

        <div className="row">

            <Field fieldWrapperClasses="col-md-5" component={renderField}  autocomplete="false" required
                   label="Cardholder Name" name="card-name" type="text" className="month" placeholder="02"/>


            <Field fieldWrapperClasses="col-md-2" component={renderField}  autocomplete="false" required
                   label="Month" name="card-month" type="text" className="month" placeholder="19"/>


            <Field fieldWrapperClasses="col-md-2" component={renderField}  autocomplete="false" required
                   label="Year" name="card-year" type="text" className="year" placeholder="20"/>

            <Field fieldWrapperClasses="col-md-3" component={renderField}  autocomplete="false" required
                   label="CVV" name="card-cvv" type="text" className="cvv" placeholder="123"/>

        </div>
    </div>
);

export default CreditCard;