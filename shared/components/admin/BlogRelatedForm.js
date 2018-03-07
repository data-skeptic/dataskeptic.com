import React from "react"
import { Field, reduxForm } from "redux-form"
import FormController from "../../Forms/Components/FormController/FormController"
import {
  renderField,
  renderSelect,
  renderZip
} from "../../Forms/Components/Field"

export const FORM_KEY = 'blogRelated'

const validate = values => {
  let errors = {}


  return errors
}

const BlogRelatdForm = ({
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
    name={FORM_KEY}
    showSubmit={showSubmit}
    invalid={!allowSubmit}
    handleSubmit={handleSubmit}
  >
    related
    
  </FormController>
)

export default reduxForm({
  form: FORM_KEY,
  validate
})(BlogRelatdForm)
