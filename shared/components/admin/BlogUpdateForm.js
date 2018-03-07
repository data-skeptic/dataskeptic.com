import React from "react"
import {Field, FieldArray, reduxForm} from "redux-form"
import FormController from "../../Forms/Components/FormController/FormController"
import {
  renderField,
  renderSelect,
  renderZip
} from "../../Forms/Components/Field"
import {renderRelated} from "./BlogRelatedFields";

export const FORM_KEY = 'blogUpdate'

const validate = values => {
  let errors = {}


  return errors
}

const BlogUpdateForm = ({
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

    <Field
      label="Title"
      component={renderField}
      name="title"
      type="text"
      required
    /> 
    
    <Field
      label="Author"
      component={renderField}
      name="author"
      type="text"
      required
    />   
    
    <Field
      label="Abstract"
      component={renderField}
      name="abstract"
      inputWrapperStyles="abstract"
      textarea
      rows={10}
      required
    />
    
    <Field
      label="Publish Date"
      component={renderField}
      name="publish_date"
      type="date"
      required
    />

    <FieldArray
      name="related"
      component={renderRelated}
      rerenderOnEveryChange={true}
    />
    
  </FormController>
)

export default reduxForm({
  form: FORM_KEY,
  validate
})(BlogUpdateForm)
