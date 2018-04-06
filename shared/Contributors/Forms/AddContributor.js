import React from 'react'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { Field, reduxForm } from 'redux-form'
import FormController from '../../Forms/Components/FormController/FormController'
import {
  renderField,
  renderSelect,
  renderZip
} from '../../Forms/Components/Field'
import RichTextarea from '../../Forms/Components/RichTextarea'
import ImageUploadField from '../../Forms/Components/ImageUploadField'

export const FORM_KEY = 'addContributor'

const validate = values => {
  let errors = {}

  if (isEmpty(values.prettyname)) {
    errors.prettyname = 'Pretty Name field is required'
  }

  if (isEmpty(values.img)) {
    errors.img = 'Image field is required'
  }

  if (isEmpty(values.author)) {
    errors.author = 'Author field is required'
  }

  if (isEmpty(values.twitter)) {
    errors.twitter = 'Author field is required'
  }

  if (isEmpty(values.linkedin)) {
    errors.linkedin = 'Linkedin field is required'
  }

  if (isEmpty(values.bio)) {
    errors.bio = 'Bio field is required'
  }

  if (isEmpty(values.sort_rank)) {
    errors.sort_rank = 'Sort rank field is required'
  } else if (values.sort_rank < 0) {
    errors.sort_rank = 'Number should be positive'
  }

  return errors
}

const AddContributorForm = ({
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
  customSuccess
}) => (
  <FormController
    name={`addJob`}
    showSubmit={showSubmit}
    invalid={!allowSubmit}
    submitValue={`Submit`}
    handleSubmit={handleSubmit}
    customError={customError}
    customSuccess={customSuccess}
  >
    <Field
      label="Pretty Name"
      component={renderField}
      name="prettyname"
      type="text"
      required
    />

    <Field
      label="Image"
      component={renderField}
      name={`img`}
      required
      customComponent={ImageUploadField}
      bucket={c['files']['site_bucket']}
      accept="image/jpeg, image/png"
      disabled={disabled}
    />

    <Field
      label="Author"
      component={renderField}
      name="author"
      type="text"
      required
    />

    <Field
      label="Twitter"
      component={renderField}
      name="twitter"
      type="text"
      required
    />

    <Field
      label="Linkedin"
      component={renderField}
      name="linkedin"
      type="text"
      required
    />

    <Field
      label="Bio"
      component={renderField}
      customComponent={RichTextarea}
      name="bio"
    />

    <Field
      label="Sort Rank"
      component={renderField}
      name="sort_rank"
      type="number"
      required
    />
  </FormController>
)

export default reduxForm({
  form: FORM_KEY,
  validate
})(AddContributorForm)
