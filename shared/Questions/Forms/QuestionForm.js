import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {UserInfoBox} from "../../Proposals/Components/UserInfoBox/UserInfoBox";
import FormController from '../../Forms/Components/FormController/FormController'

const QuestionForm = ({handleSubmit, pristine, reset, submitting}) =>(

  <FormController name={`question`}>
        <UserInfoBox />
    </FormController>
 

)
export default reduxForm({
    form: 'question' // a unique identifier for this form
})(QuestionForm)