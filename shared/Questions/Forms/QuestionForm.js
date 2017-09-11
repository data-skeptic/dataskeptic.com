import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {UserInfoBox} from "../../Proposals/Components/UserInfoBox/UserInfoBox";
import FormController from '../../Forms/Components/FormController/FormController'
import {renderField} from "../../Forms/Components/Field/Field";
import Recorder, {steps} from '../../Recorder';

const QuestionForm = ({handleSubmit,
                          pristine,
                          reset,
                          submitting,
                          allowSubmit,
                          activeStep,
                          errorMessage,
                          ready,
                          recording,
                          stop,review,
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
    >
        <UserInfoBox/>
        <Field
            name={`confirmPolicy`}
            component={renderField}
            type={`checkbox`}
            label={`I authorize Data Skeptic to use my recording in a future episode.
                   I acknowledge my recording will be associated with whatever I type in the 'Name' blank above.
                   Feel free to type anonymous if you wish.`}
        />
        {!allowSubmit
            ? <p className={`error`}>Sorry, we require this consent before submitting audio feedback.
                If this is a concern for you, we recommend sending an email instead.</p>
            : <div></div>}
        <Recorder
            activeStep={activeStep}
            errorMessage={errorMessage}
            ready={ready}
            recording={recording}
            stop={stop}
            review={review}
            submit={submit}
            complete={complete}
            error={error}
            submittedUrl={submittedUrl}
        />

    </FormController>
)

export default reduxForm({
    form: 'question' // a unique identifier for this form
})(QuestionForm)