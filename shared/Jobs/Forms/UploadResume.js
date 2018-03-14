import React from 'react'
import className from 'classnames'
import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'

import { FormController } from '../../Forms/Components'
import { renderCheckbox } from '../../Forms/Components/Field'
import { renderField } from '../../Forms/Components/Field/Field'
import DragAndDropFileUploadField from "../../Forms/Components/DragAndDropFileUploadField";

export const KEY = 'uploadResume'
export const RESUME_FIELD = 'resume'
export const NOTIFY_FIELD = 'notify'

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
  customError,
  showEmail,
  bucket,
  prefix
}) => (
  <FormController
    name="contacts"
    handleSubmit={handleSubmit}
    submitValue={<span>Submit</span>}
    showSubmit={true}
    customError={customError}
    btnWrapperClasses={'submit-wrapper'}
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

    {prefix}
    
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
  </FormController>
)

const UploadResume = reduxForm({
  form: KEY,
  validate
})(Form)

export default UploadResume
