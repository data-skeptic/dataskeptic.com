import React from 'react'
import moment from 'moment'
import { Field, reduxForm } from 'redux-form'
import FormController from '../../Forms/Components/FormController/FormController'
import {
  renderField,
  renderSelect,
  renderZip
} from '../../Forms/Components/Field'
import RichTextarea from "../../Forms/Components/RichTextarea";


export const FORM_KEY = 'addContributor'

const validate = values => {
  let errors = {}


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
      label="img"
      component={renderField}
      name="company_name"
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
      label="twitter"
      component={renderField}
      name="company_name"
      type="text"
      required
    />
    
    <Field
      label="Linkedin"
      component={renderField}
      name="company_name"
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
