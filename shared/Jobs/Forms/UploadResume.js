import React from "react"
import { reduxForm } from "redux-form"
import { Field } from "redux-form"

import { FormController } from "../../Forms/Components"
import { renderCheckbox } from "../../Forms/Components/Field"
import { renderField } from "../../Forms/Components/Field/Field"

export const KEY = "uploadResume"
export const RESUME_FIELD = "resume"
export const NOTIFY_FIELD = "notify"
export const SUBSCRIBE_FIELD = "subscribe"

const isEmailValid = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

const validate = values => {
  const errors = {}

  if (values[NOTIFY_FIELD]) {
    if (!values.email || values.email.length === 0) {
      errors.email = "Email field is required"
    } else if (!isEmailValid(values.email)) {
      errors.email = "Invalid email address"
    }
  }

  return errors
}

const initialValues = {
  [NOTIFY_FIELD]: true,
  [SUBSCRIBE_FIELD]: true
}

const Form = ({ handleSubmit, children, customError, showEmail }) => (
  <FormController
    name="contacts"
    handleSubmit={handleSubmit}
    submitValue={<span>Submit</span>}
    showSubmit={true}
    customError={customError}
    btnWrapperClasses={"submit-wrapper"}
  >
    {children}

    <Field
      label="Notify me when there's news about this project"
      component={renderCheckbox}
      name={NOTIFY_FIELD}
      type="checkbox"
    />

    {showEmail && (
      <Field
        component={renderField}
        required
        label="Email"
        name="email"
        type="text"
        placeholder="listener@dataskeptic.com"
      />
    )}

    <Field
      label="Please send me periodic curated career development information and good job matches (opt-out anytime)"
      component={renderCheckbox}
      name={SUBSCRIBE_FIELD}
      type="checkbox"
    />
  </FormController>
)

const UploadResume = reduxForm({
  form: KEY,
  validate,
  initialValues
})(Form)

export default UploadResume
