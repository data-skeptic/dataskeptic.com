import React from "react"
import { reduxForm } from "redux-form"
import { Field } from "redux-form"
import _ from "lodash"

import { FormController } from "../../Forms/Components"
import { renderCheckbox } from "../../Forms/Components/Field"
import { renderField } from "../../Forms/Components/Field/Field"
import DragAndDropFileUploadField from "../../Forms/Components/DragAndDropFileUploadField"

export const KEY = "uploadResume"
export const RESUME_FIELD = "resume"
export const NOTIFY_FIELD = "notify"
export const SUBSCRIBE_FIELD = "subscribe"

const isEmailValid = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

const validate = values => {
  const errors = {}

  if (values[NOTIFY_FIELD]) {
    if (_.isEmpty(values.email)) {
      errors.email = "Email field is required"
    } else if (!isEmailValid(values.email)) {
      errors.email = "Invalid email address"
    }
  }

  if (_.isEmpty(values.resume)) {
    errors.resume = "Please upload resume"
  }

  return errors
}

const initialValues = {
  [NOTIFY_FIELD]: true,
  [SUBSCRIBE_FIELD]: true
}

const Form = ({ handleSubmit, children, customError, showEmail, bucket }) => (
  <FormController
    name="contacts"
    handleSubmit={handleSubmit}
    submitValue={<span>Submit</span>}
    showSubmit={true}
    customError={customError}
    btnWrapperClasses={"submit-wrapper"}
  >
    <Field
      label={`If you're concerned about privacy, feel free to remove your contact information from PDF you upload.`}
      component={renderField}
      customComponent={DragAndDropFileUploadField}
      name={RESUME_FIELD}
      accept="application/pdf"
      bucket={bucket}
      saveOrigin={true}
    />

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
