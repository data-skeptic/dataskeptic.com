import React, {Component} from 'react'
import QuestionForm from '../Forms/QuestionForm'
import {formValueSelector} from 'redux-form';
import {connect} from 'react-redux';

class QuestionsContainer extends Component {

    render() {
        const {confirmPolicy} = this.props;
        return (
            <div className={`center`}>
                <h3>Listener Questions</h3>
                <p>We love hearing from our listeners!
                    If you have a question about one of our episodes or a general question that's relevant to Data
                    Skeptic, please ask via the in-browser recording system below.
                    Try to keep your question to 30 seconds or less and make sure your question is a question.</p>
                <div>
                    <QuestionForm
                        allowSubmit={!!confirmPolicy}
                        initialValues={{
                            confirmPolicy:true
                        }}
                    />
                </div>

            </div>
        )
    }
}

const selector = formValueSelector('question');

export default connect(state => ({
    confirmPolicy: selector(state, 'confirmPolicy')
}))

(QuestionsContainer);