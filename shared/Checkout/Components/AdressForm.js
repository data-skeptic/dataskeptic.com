import React from 'react'

import { renderField } from '../../Forms/Components/Field/Field'
import { phone } from '../../Forms/Normalizers'
import { Field } from 'redux-form'

import CountrySelector from '../../Common/Components/CountrySelector'

export const AddressForm = ({ title = 'Shipping Information' }) => (
  <div className="address-form-container">
    <div className="address-form">
      <div className="shipping-address-title">{title}</div>

      <div className="row no-clear">
        <Field
          fieldWrapperClasses="col-md-6"
          component={renderField}
          autocomplete="false"
          required
          label="First Name"
          name="first_name"
          type="text"
          className="first_name"
          placeholder="John"
        />

        <Field
          fieldWrapperClasses="col-md-6"
          component={renderField}
          autocomplete="false"
          required
          label="Last Name"
          name="last_name"
          type="text"
          className="last_name"
          placeholder="Smith"
        />
      </div>

      <div className="row no-clear">
        <Field
          fieldWrapperClasses="col-md-8"
          component={renderField}
          autocomplete="false"
          required
          label="Street Address"
          name="street_1"
          type="text"
          className="street_1"
          placeholder="123 Main Street"
        />

        <Field
          fieldWrapperClasses="col-md-4"
          component={renderField}
          autocomplete="false"
          label="Apt, suite, etc."
          name="street_2"
          type="text"
          className="street_2"
          placeholder="Apt 101"
        />
      </div>

      <div className="row no-clear">
        <Field
          fieldWrapperClasses="col-md-12"
          component={renderField}
          autocomplete="false"
          required
          label="City / Town"
          name="city"
          type="text"
          className="city"
          placeholder="Los Angeles"
        />
      </div>

      <div className="row no-clear">
        <div className="col-md-5">
          <div className="field-label">
            Country <span className="required">*</span>
          </div>
          <div className="field-input">
            <CountrySelector />
          </div>
        </div>

        <Field
          fieldWrapperClasses="col-md-4"
          component={renderField}
          autocomplete="false"
          required
          label="State / Province"
          name="state"
          type="text"
          className="city"
          placeholder=""
        />

        <Field
          fieldWrapperClasses="col-md-3"
          autocomplete="false"
          required
          label="Postal Code"
          name="zip"
          type="text"
          className="zip"
          placeholder="12345"
          component={renderField}
        />
      </div>

      <div className="row">
        <Field
          fieldWrapperClasses="col-md-6"
          autocomplete="false"
          required
          label="Email"
          name="email"
          type="text"
          className="email"
          placeholder="j.smith@work.com"
          component={renderField}
        />

        <Field
          fieldWrapperClasses="col-md-6"
          autocomplete="false"
          required
          label="Phone"
          name="phone"
          type="text"
          className="phone"
          placeholder="(310) 313 - 3413"
          component={renderField}
        />
      </div>
    </div>
  </div>
)

export default AddressForm
