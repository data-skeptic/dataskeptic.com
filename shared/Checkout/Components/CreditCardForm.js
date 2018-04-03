import React from 'react'

import { renderField } from '../../Forms/Components/Field/Field'
import { cardNumber, cardMonth, cardYear, cvv } from '../../Forms/Normalizers'
import { Field } from 'redux-form'

export const CreditCard = ({ title = 'Billing Details' }) => (
  <div className="credit-cart-form-container">
    <div className="shipping-address-title">{title}</div>

    <div className="row">
      <Field
        fieldWrapperClasses="col-md-12"
        autoComplete="false"
        label="Credit Card Number"
        name="card_number"
        type="text"
        className="number"
        placeholder="4242 4242 4242 4242"
        component={renderField}
        normalize={cardNumber}
        required
      />
    </div>

    <div className="row">
      <Field
        fieldWrapperClasses="col-md-5"
        autoComplete="false"
        label="Cardholder Name"
        name="card_name"
        type="text"
        className="month"
        placeholder="Jonh Smith"
        component={renderField}
        required
      />

      <Field
        fieldWrapperClasses="col-md-2"
        autoComplete="false"
        required
        label="Month"
        name="card_month"
        type="text"
        className="month"
        placeholder="12"
        component={renderField}
        normalize={cardMonth}
      />

      <Field
        fieldWrapperClasses="col-md-2"
        autoComplete="false"
        required
        label="Year"
        name="card_year"
        type="text"
        className="year"
        placeholder="2020"
        component={renderField}
        normalize={cardYear}
      />

      <Field
        fieldWrapperClasses="col-md-3"
        autoComplete="false"
        required
        label="CVV"
        name="card_cvv"
        type="text"
        className="cvv"
        placeholder="123"
        component={renderField}
        normalize={cvv}
      />
    </div>
  </div>
)

export default CreditCard
