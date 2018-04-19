import React from 'react'
import moment from 'moment'
import { Field, reduxForm } from 'redux-form'
import FormController from '../../Forms/Components/FormController/FormController'
import {
  renderField,
  renderSelect,
  renderZip
} from '../../Forms/Components/Field'

import RichTextarea from '../../Forms/Components/RichTextarea'
import JobAdvertiseField from '../../components/jobs/JobAdvertiseField'
import DiscountingField from '../../components/jobs/DiscountingField'

const urlRegex = new RegExp(
  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
)

const urlFields = ['company_url', 'company_logo_url', 'job_url']

export const tomorrow = moment(new Date()).add(1, 'days')

const validate = values => {
  let errors = {}

  urlFields.forEach(field => {
    const val = values[field] || ''

    if (!val.match(urlRegex)) {
      errors[field] = 'Invalid URL'
    }
  })

  if (!values['title']) {
    errors['title'] = 'Cannot be empty.'
  } else if (values['title'].length >= 32) {
    errors['title'] = 'Title must be less than 32 characters.'
  }

  if (!values['job_url']) {
    errors['job_url'] = 'Cannot be empty.'
  }

  if (!values['description']) {
    errors['description'] = 'Cannot be empty.'
  }

  if (!values['go_live_date']) {
    errors['go_live_date'] = 'Cannot be empty.'
  } else {
    const date = moment(values['go_live_date'])
    const diff = date.diff(tomorrow, 'days')
    if (diff < 0) {
      errors['go_live_date'] = 'Please, choose future date'
    }
  }

  if (!values['location']) {
    errors['location'] = 'Cannot be empty.'
  } else if (values['location'].length > 12) {
    errors['location'] = 'Zip is invalid.'
  }

  if (!values['type']) {
    errors['type'] = 'Cannot be empty.'
  }

  if (!values['company_name']) {
    errors['company_name'] = 'Cannot be empty.'
  } else if (values['company_name'].length >= 32) {
    errors['company_name'] = 'Company must be less than 32 characters.'
  }

  if (!values['company_url']) {
    errors['company_url'] = 'Cannot be empty.'
  }

  if (!values['company_logo_url']) {
    errors['company_logo_url'] = 'Cannot be empty.'
  }

  return errors
}

const AddJobForm = ({
  children,
  handleSubmit,
  pristine,
  reset,
  submitting,
  allowSubmit,
  activeStep,
  errorMessage,
  ready,
  recording,
  stop,
  review,
  submit,
  complete,
  submittedUrl,
  error,
  showSubmit,
  customError,
  customSuccess,
  showAdvertiseOptions,
  submitValue,
  changeAdvertise,
  showDiscountOptions,
                      applyDiscount
}) => (
  <FormController
    name={`addJob`}
    showSubmit={showSubmit}
    invalid={!allowSubmit}
    submitValue={submitValue}
    handleSubmit={handleSubmit}
    customError={customError}
    customSuccess={customSuccess}
  >
    <div className="onrow">
      <Field
        label="Job Title"
        component={renderField}
        name="title"
        type="text"
        required
      />

      <Field
        label="Company"
        component={renderField}
        name="company_name"
        type="text"
        required
      />
    </div>

    <div className="onrow">
      <Field
        label="'Apply now' link"
        component={renderField}
        name="job_url"
        type="url"
      />

      <Field
        label="Type"
        component={renderSelect}
        options={[
          { label: 'Full time', value: 'full_time' },
          { label: 'Part time', value: 'part_time' },
          { label: 'Internship', value: 'internship' },
          { label: 'Other', value: 'other' }
        ]}
        name="type"
        required
      />

      <Field
        label="Postal code"
        component={renderField}
        name="location"
        type="text"
        required
      />
    </div>

    <Field
      label="Date to go live"
      component={renderField}
      name="go_live_date"
      type="date"
      required
    />

    <Field
      label="Company Url"
      component={renderField}
      name="company_url"
      type="url"
      required
    />

    <Field
      label="Company Logo"
      component={renderField}
      name="company_logo_url"
      type="url"
    />

    <Field
      label="Description"
      component={renderField}
      customComponent={RichTextarea}
      name="description"
    />

    {showAdvertiseOptions && (
      <Field
        label="Advertise Type"
        component={renderField}
        customComponent={JobAdvertiseField}
        name="adv"
        handleChange={changeAdvertise}
      />
    )}

    {showDiscountOptions && (
      <div>
        <br />
        <Field
          label="Coupon Code"
          component={renderField}
          customComponent={DiscountingField}
          name="coupon"
          handleChange={changeAdvertise}
          className="field"
          onDiscount={applyDiscount}
        />
      </div>
    )}
  </FormController>
)

export default reduxForm({
  form: 'addJob',
  validate
})(AddJobForm)
