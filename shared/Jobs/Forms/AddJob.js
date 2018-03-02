import React from "react"
import { Field, reduxForm } from "redux-form"
import FormController from "../../Forms/Components/FormController/FormController"
import { renderField, renderSelect, renderZip } from "../../Forms/Components/Field"

const validate = values => {
  let errors = {}

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
