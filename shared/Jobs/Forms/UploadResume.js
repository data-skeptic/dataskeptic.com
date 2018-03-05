import React from "react"
import className from "classnames"
import { reduxForm } from "redux-form"
import { Field } from "redux-form"

import { FormController } from "../../Forms/Components"
import { renderCheckbox } from "../../Forms/Components/Field"
import { renderField } from "../../Forms/Components/Field/Field"

export const KEY = "uploadResume"
export const RESUME_FIELD = "resume"
export const NOTIFY_FIELD = "notify"

const validate = values => {
  const errors = {}

  if (values.emails && values.emails.length > 0) {
	  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		  errors.email = 'Invalid email address'
	  }
  }

  return errors
}

const Form = ({
  handleSubmit,
  children,
  ristine,
  reset,
  submitting,
  invalid,
  submitSucceeded,
  submitFailed,
  showEmail
}) => (
  <FormController
    name="contacts"
    handleSubmit={handleSubmit}
    submitValue={<span>Submit</span>}
    showSubmit={true}
    btnWrapperClasses={"submit-wrapper"}
  >
    {children}

    <Field
      label="Notify me when there's news about this project"
      component={renderCheckbox}
      name={NOTIFY_FIELD}
      type="checkbox"
    />

	  {showEmail && <Field
      component={renderField}
      required
      label="Email"
      name="email"
      type="text"
      placeholder="john@site.com"
    />}
  </FormController>
)

const UploadResume = reduxForm({
  form: KEY,
  validate
})(Form)

export default UploadResume
