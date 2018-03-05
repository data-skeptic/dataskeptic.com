import React from "react"
import { Field, reduxForm } from "redux-form"
import FormController from "../../Forms/Components/FormController/FormController"
import { renderField, renderSelect, renderZip } from "../../Forms/Components/Field"

const urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)

const urlFields = ['company_url', 'company_logo', 'url']

const validate = values => {
  let errors = {}

  urlFields.forEach((field) => {
    const val = values[field] || ''

	  if (!val.match(urlRegex)) {
		  errors[field] = 'Invalid URL'
	  }
  })

	if (!values['title']) {
    errors['title'] = 'Cannot be empty.'
  }

	if (!values['created_at']) {
    errors['created_at'] = 'Cannot be empty.'
  }

	if (!values['location']) {
    errors['location'] = 'Cannot be empty.'
  }

	if (!values['type']) {
    errors['type'] = 'Cannot be empty.'
  }

	if (!values['company']) {
    errors['company'] = 'Cannot be empty.'
  }

	if (!values['company_url']) {
    errors['company_url'] = 'Cannot be empty.'
  }

	if (!values['company_logo']) {
    errors['company_logo'] = 'Cannot be empty.'
  }

  return errors
}

const QuestionForm = ({
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
  showSubmit
}) => (
  <FormController
    name={`addJob`}
    showSubmit={showSubmit}
    invalid={!allowSubmit}
    submitValue={`Submit`}
    handleSubmit={handleSubmit}
  >
    <Field
      label="Title"
      component={renderField}
      name="title"
      type="text"
      required
    />

    <Field
      label="Created At"
      component={renderField}
      name="created_at"
      type="date"
      required
    />

    <Field
      label="Location"
      component={renderZip}
      name="location"
      required
    />

    <Field
      label="Type"
      component={renderSelect}
      options={[
      	{ label: "Full time", value: "full_time" },
      	{ label: "Part time", value: "part_time" },
      	{ label: "Internship", value: "internship" },
      	{ label: "Other", value: "other" }
      ]}
      name="type"
      required
    />

    <Field
      label="Company"
      component={renderField}
      name="company"
      type="text"
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
      name="company_logo"
      type="url"
    />

    <Field label="Url" component={renderField} name="url" type="url" />
  </FormController>
)

export default reduxForm({
  form: "addJob",
  validate
})(QuestionForm)
