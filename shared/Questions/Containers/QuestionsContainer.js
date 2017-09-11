import React,{Component} from 'react'
import QuestionForm from '../Forms/QuestionForm'

class QuestionsContainer extends Component{
    render(){
        return(
            <div className={`center`}>
                <h3>Listener Questions</h3>
                <p>We love hearing from our listeners!
                    If you have a question about one of our episodes or a general question that's relevant to Data Skeptic, please ask via the in-browser recording system below.
                    Try to keep your question to 30 seconds or less and make sure your question is a question.</p>
                <div className={`comment-box-form-container`}>
                <QuestionForm/>
                </div>

            </div>
        )
    }
}
export default QuestionsContainer;