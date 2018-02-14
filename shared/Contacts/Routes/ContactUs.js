import React from "react"
import ReactDOM from "react-dom"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';
import styled from 'styled-components'

import ContactFormContainer from '../Containers/ContactFormContainer/ContactFormContainer';
import {changePageTitle} from '../../Layout/Actions/LayoutActions';
import {formValueSelector, reset} from 'redux-form';
import {
    init,
    ready,
    recordingStart,
    recordingFinish,
    review,
    submit,
    complete,
    fail
} from '../../Proposals/Actions/RecordingFlowActions';
import {RECORDING} from "../../Proposals/Constants/CommentTypes";
import Recorder, {steps} from '../../Recorder';
import QuestionForm from "../../Questions/Forms/QuestionForm";
import {submitCommentForm} from "../../Proposals/Actions/CommentBoxFormActions";
import SectionBlock from "../Components/SectionBlock/SectionBlock";

class ContactUs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            submittedUrl: ''
        }
    }

    recordingReady = (noDelay) => {
        this.props.dispatch(ready(noDelay))
        this.setState({submittedUrl: ''});
    }

    recorderRecording = () =>{
        this.props.dispatch(recordingStart())
    }

    recorderStop = (id) => {
        this.props.dispatch(recordingFinish(id))
        this.setState({submittedUrl:id});
    }

    recorderReview = (id) => {
        this.props.dispatch(review())
    }

    recorderSubmit = (id) => {
        this.props.dispatch(submit())
    }

    recorderComplete = (id) => {
        this.props.dispatch(complete(id))
    }

    recorderError = (error) => {
        this.props.dispatch(fail(error))
    }

    questionSubmit = (data) => {
        data.recording = this.state.submittedUrl;
    	data.type = RECORDING;
        console.log(`question submit`)
        console.dir(data)
    	this.props.dispatch(submitCommentForm(data))
    }

    reset = () => {
        this.setState({submittedUrl: ''});
    	this.props.dispatch(reset(`question`))
	}

    componentDidMount() {
        const {dispatch} = this.props;
        const {title} = ContactUs.getPageMeta(this.props);
        dispatch(changePageTitle(title));
    }

    static getPageMeta() {
        return {
            title: 'Contact Us | Data Skeptic',
			description: 'We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our queue to explode. We prioritize responses to Data Skeptic members first, and to those who ask questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack. Many people can benefit from responses in public places.'
        }
    }

	onChangeEmail = (event) => {
		console.log(event)
		var i = event.target
		var email = i.value
		var target = event.target
		var cls = "email"
		var val = target.value
		var dispatch = this.props.dispatch
		dispatch({type: "UPDATE_ADDRESS", payload: {cls, val} })
	}

	onClick = (event) => {
		var ocart = this.props.cart.toJS()
		var address = ocart.address
		var email = address.email
		var dispatch = this.props.dispatch
		var token = ""
		var req = {email: email, token: token, set_active: true}
		dispatch({type: "SLACK_UPDATE", payload: {msg: "Sending..."} })
		var config = {}
		axios
			.post("/api/slack/join", req, config)
			.then(function(resp) {
				var data = resp['data']
				var msg = data['msg']
				dispatch({type: "SLACK_UPDATE", payload: {msg} })            
			})
			.catch(function(err) {
				var data = err['data']
				var msg = "Sorry, we're having a problem getting that done :("
				if (data != undefined) {
					if (data['msg'] != undefined) {
						msg = data['msg']
					}
				}
				dispatch({type: "SLACK_UPDATE", payload: {msg} })
				console.log(err)
			})
	}

	render() {
			const {confirmPolicy,activeStep,errorMessage} = this.props;
			const { submittedUrl } = this.state

			const osite = this.props.site.toJS()
			const ocart = this.props.cart.toJS()
			let email = ""
			const address = ocart.address
			if (address != undefined) {
				email = address.email
			}

			const slackstatus = (
				<div className="slack-status">{osite.slackstatus}</div>
			)

    	return (
		    <Container>
			    <Title>Contact Us</Title>
					<Text>We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our queue to explode.  We prioritize responses to Data Skeptic members first, and to those who ask questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack.  Many people can benefit from responses in public places.</Text>

			    <Socials>
						<SocialBlock order={1}>
							<SocialIcon src={"/img/png/contacts_slack.png"} />
							<p>You can find us on Twitter via <TwitterLink href="https://twitter.com/dataskeptic">@DataSkeptic</TwitterLink></p>
						</SocialBlock>
				    <SocialBlock order={3}>
					    <SocialIcon src={"/img/png/contacts_slack.png"} />
					    <p>We are on Facebook via <FacebookLink href="https://www.facebook.com/dataskeptic">https://www.facebook.com/dataskeptic</FacebookLink></p>
						</SocialBlock>
				    <SocialBlock order={2}>
					    <SocialForm>
						    <SocialIcon src={"/img/png/contacts_slack.png"} />
					      <input onChange={this.onChangeEmail} className='slack-email' value={email} />
					      <button type="submit" className="slack-button" onClick={this.onClick}>Join Slack</button>
					    </SocialForm>
						</SocialBlock>
				    <SocialBlock order={4}>
					    <SocialForm onSubmit={() => console.log(e)}>
						    <SocialIcon src={"/img/png/contacts_slack.png"} />
						    <input  />
						    <button type="submit"  className="slack-button" onClick={this.onClick}>Join Mailing List</button>
					    </SocialForm>
						</SocialBlock>
			    </Socials>

			    <Sections>
						<SectionBlock title="For Members">
							<Text>members</Text>

							<ContactFormContainer type/>
						</SectionBlock>

				    <SectionBlock title="For Orders">
							<Text>orders</Text>

					    <ContactFormContainer type="orders"/>
						</SectionBlock>

				    <SectionBlock title="For Advertisers">
					    <Text>advertise</Text>

					    <ContactFormContainer type/>
						</SectionBlock>

				    <SectionBlock title="For Listeners">
					    <Text>listeners</Text>

					    <ContactFormContainer type/>
						</SectionBlock>

				    <SectionBlock title="For Media Inquiries">
					    <Text>media</Text>

					    <ContactFormContainer type/>
						</SectionBlock>

				    <SectionBlock title="For PR Firms">
					    <Text>pr</Text>

					    <ContactFormContainer type/>
						</SectionBlock>

				    <SectionBlock title="For General">
					    <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>

					    <ContactFormContainer type/>
				    </SectionBlock>
			    </Sections>

			    <ListenerArea>
				    <Title>Listener Questions</Title>
				    <Text>
					    We love hearing from our listeners!
					    If you have a question about one of our episodes or a general question that's relevant to Data
					    Skeptic, please ask via the in-browser recording system below.
					    Try to keep your question to 30 seconds or less and make sure your question is a question.
				    </Text>
				    <QuestionFormWrapper>
					    <QuestionForm
						    allowSubmit={confirmPolicy}
						    showSubmit={activeStep === 'REVIEW'}
						    initialValues={{
							    confirmPolicy: true
						    }}
						    onSubmit={this.questionSubmit}
					    >
						    <Recorder
							    activeStep={activeStep}
							    errorMessage={errorMessage}
							    ready={this.recordingReady}
							    recording={this.recorderRecording}
							    stop={this.recorderStop}
							    review={this.recorderReview}
							    submit={this.recorderSubmit}
							    complete={this.recorderComplete}
							    error={this.recorderError}
							    submittedUrl={submittedUrl}
							    reset={this.reset}
						    />
						    {activeStep === 'COMPLETE' && <p>Thanks for your question!</p>}
					    </QuestionForm>
				    </QuestionFormWrapper>
			    </ListenerArea>
		    </Container>
	    )
	}

	renderOld() {
		var osite = this.props.site.toJS()
		var ocart = this.props.cart.toJS()
		var email = ""
		var address = ocart.address
		if (address != undefined) {
			email = address.email
		}
		var slackstatus = (
			<div className="slack-status">{osite.slackstatus}</div>
		)
		/* Had to comment this out because there was a breaking change introduced that removes the submit button
					<ContactFormContainer />

		*/

        const {confirmPolicy,activeStep,errorMessage} = this.props;
        const { submittedUrl } = this.state

		return (
	    	<div className="center">
				<div className="row contact-page">
					<div className="col-xs-12"><h2>Contact Us</h2></div>
					<div className="col-xs-12">
						<p></p>
						<div className="row">
							<div className="col-xs-12 col-sm-4 contact-person-out">
								<div className="contact-person">
									<a href="mailto:orders@dataskeptic.com"><img src="img/png/email-icon.png" /></a>
									<span className="vcenter"><p>For inquiries related to a purchase of any kind, including membership, please contact <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a> for prioritized service.</p></span>
									</div>
							</div>
							<div className="col-xs-12 col-sm-4 contact-person-out">
								<div className="contact-person">
									<a href="mailto:advertising@dataskeptic.com"><img src="img/png/email-icon.png" /></a>
									<span className="vcenter"><p>For advertising related questions or issues, contact <a href="advertising@dataskeptic.com">advertising@dataskeptic.com</a>.</p></span>
									</div>
							</div>
							<div className="col-xs-12 col-sm-4 contact-person-out">
								<div className="contact-person">
									<a href="mailto:kyle@dataskeptic.com"><img src="img/png/email-icon.png" /></a>
									<span className="vcenter"><p>If you're looking to mail us something like a review copy of a book, please contact <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a>.</p></span>
								</div>
							</div>
						</div>
						<br/>
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								<div className="slack-join row">
									<div className="col-xs-12 col-sm-3 slack-join-left">
										<img src="/img/png/slack-icon.png" />
									</div>
									<div className="col-xs-12 col-sm-9 slack-join-right">
											<p>To join our Slack channel, enter your email in the box below.</p>
				 						<input onChange={this.onChangeEmail.bind(this)} className='slack-email' value={email} />
				 						<button className="slack-button" onClick={this.onClick.bind(this)}>Join dataskeptic.slack.com</button>
				 						{slackstatus}
				 					</div>
			 					</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<br/>
		 						<p>You can find us on Twitter via <TwitterLink href="https://twitter.com/dataskeptic">@DataSkeptic</TwitterLink></p>
								<br/>
								<p>We are on Facebook via <FacebookLink href="https://www.facebook.com/dataskeptic">https://www.facebook.com/dataskeptic</FacebookLink>.</p>
							</div>
						</div>
						<br/>
						<p>You can also reach us via the contact form below.</p>
						<p>Please note, we often reply via the Data Skeptic blog and may share a link to our reply if its something many readers may enjoy.  If so, we refer to people via firstname only.  If that's an issue, let us know.</p>
					</div>
					&nbsp;
					<br/>
			        <h2>Send us a message</h2>
					<ContactFormContainer/>

                    <br/>
                    <h2>Listener Questions</h2>
                    <p>
						We love hearing from our listeners!
                        If you have a question about one of our episodes or a general question that's relevant to Data
                        Skeptic, please ask via the in-browser recording system below.
                        Try to keep your question to 30 seconds or less and make sure your question is a question.
					</p>
                    <div>

                    </div>

				</div>
			</div>
		)
	}
}

const SocialBlock = ({left, children, order}) =>
	<Social order={order}>
		{children}
	</Social>

const Link = styled.a``

const TwitterLink = Link.extend`color: #1DA1F3`

const FacebookLink = Link.extend`color: #3B5998`


const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 15px;
`

const Title = styled.h2`

`

const Text = styled.p`

`

const Socials = styled.div`
	justify-content: space-between;
	display: flex;
	flex-wrap: wrap;
`

const Social = styled.div`
	display: flex;
	width: 50%;
	order: ${props => props.order};
  align-items: center;
  margin-bottom: 20px;
  min-height: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 32px;
    order: initial;
  }
  
  p {
    padding: 0px;
    margin: 0px;
  }
`

const SocialIcon = styled.img`
	width: 32px;
	height: 32px;
	margin-right: 7px;
`

const Sections = styled.div`
	display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
	margin-top: 24px;
	
	> div {
		width: 48.9%;
	}
	
	@media (max-width: 768px) {
    >div {
      width: 100%;
      margin-top: 0px;
      padding-bottom: 0px;
    }
  }
`


const ListenerArea = styled.div`
	
`

const SocialForm = styled.form`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 10px
	background: red;
	
	input {
		flex-grow: 1;
		background: #F9FAF9;
		border: 1px solid #E1E3E2;
		margin-right: 12px;
		border-radius: 5px;
		padding: 0px 20px;
    line-height: 38px;
	}
	
	button {
		width: 160px;
		height: 40px;
		background: #F0D943;
		font-size: 16px;
		color: #333333;
		border: none;
		border-radius: 5px;
	}
	
	@media (max-width: 768px) {
		flex-wrap: wrap;
		
		input {
			margin-right: 0px;
		}
		
    button {
      margin-top: 13px;
      width: 100%;
    }
  }
`

const QuestionFormWrapper = styled.div``

const selector = formValueSelector('question');
export default connect(
	state => ({
		cart: state.cart,
		site: state.site,
        confirmPolicy: selector(state, 'confirmPolicy'),
        activeStep: state.questions.getIn(['form', 'step']),
        errorMessage : state.questions.getIn(['form', 'error']),
        aws_proposals_bucket: state.proposals.getIn(['aws_proposals_bucket'])
	})
)(ContactUs)


