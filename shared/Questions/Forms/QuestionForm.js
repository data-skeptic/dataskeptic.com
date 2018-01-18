import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {UserInfoBox} from "../../Proposals/Components/UserInfoBox/UserInfoBox";
import FormController from '../../Forms/Components/FormController/FormController'

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
                          stop, review,
                          submit,
                          complete,
                          submittedUrl,
                          error
                      }) => (

    <FormController
        name={`question`}
        showSubmit={true}
        invalid={!allowSubmit}
        submitValue={`Submit`}
        handleSubmit={handleSubmit}
    >
        <UserInfoBox/>
        <div className="policy-confirm-container">
                <Field
                    id='confirmPolicy'
                    name={`confirmPolicy`}
                    component={`input`}
                    type={`checkbox`}
                />
                <label htmlFor='confirmPolicy'>I authorize Data Skeptic to use my recording in a future episode.
                    I acknowledge my recording will be associated with whatever I type in the 'Name' blank above.
                    Feel free to type anonymous if you wish.
                </label>
        </div>
        {!allowSubmit
            ?
                <p className={`error`}>
                    Sorry, we require this consent before submitting audio feedback.
                    If this is a concern for you, we recommend sending an email instead.
                </p>
            :   children
        }
    </FormController>
)

export default reduxForm({
    form: 'question'
})(QuestionForm)