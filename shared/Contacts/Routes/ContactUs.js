import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import axios from 'axios'
import styled from 'styled-components'

import ContactFormContainer from '../Containers/ContactFormContainer/ContactFormContainer'
import { formValueSelector, reset } from 'redux-form'
import {
  init,
  ready,
  recordingStart,
  recordingFinish,
  review,
  submit,
  complete,
  fail
} from '../../Proposals/Actions/RecordingFlowActions'
import { RECORDING } from '../../Proposals/Constants/CommentTypes'
import Recorder, { steps } from '../../Recorder'
import QuestionForm from '../../Questions/Forms/QuestionForm'
import { submitCommentForm } from '../../Proposals/Actions/CommentBoxFormActions'
import SectionBlock from '../Components/SectionBlock/SectionBlock'
import page from '../../Layout/hoc/page'

class ContactUs extends React.Component {
  isSectionOpen = section => section === this.state.openSection
  toggleSection = section => {
    this.setState(prevState => ({
      openSection: prevState.openSection === section ? '' : section
    }))
  }
  recordingReady = noDelay => {
    this.props.dispatch(ready(noDelay))
    this.setState({ submittedUrl: '' })
  }
  recorderRecording = () => {
    this.props.dispatch(recordingStart())
  }
  recorderStop = id => {
    this.props.dispatch(recordingFinish(id))
    this.setState({ submittedUrl: id })
  }
  recorderReview = id => {
    this.props.dispatch(review())
  }
  recorderSubmit = id => {
    this.props.dispatch(submit())
  }
  recorderComplete = id => {
    this.props.dispatch(complete(id))
  }
  recorderError = error => {
    this.props.dispatch(fail(error))
  }
  reset = () => {
    this.setState({ submittedUrl: '' })
    this.props.dispatch(reset(`question`))
  }
  questionSubmit = data => {
    data.recording = this.state.submittedUrl
    data.type = RECORDING
    this.props.dispatch(submitCommentForm(data))
  }
  subscribeSlack = e => {
    e.preventDefault()
    const email = e.target.email.value
    const ocart = this.props.cart.toJS()
    const dispatch = this.props.dispatch
    const token = ''
    const req = { email: email, token: token, set_active: true }

    dispatch({
      type: 'UPDATE_ADDRESS',
      payload: { cls: 'email', val: email }
    })
    dispatch({ type: 'SLACK_UPDATE', payload: { msg: 'Sending...' } })

    var config = {}
    axios
      .post('/api/slack/join', req, config)
      .then(function(resp) {
        var data = resp['data']
        var msg = data['msg']
        dispatch({ type: 'SLACK_UPDATE', payload: { msg } })
      })
      .catch(function(err) {
        var data = err['data']
        var msg = "Sorry, we're having a problem getting that done :("
        if (data != undefined) {
          if (data['msg'] != undefined) {
            msg = data['msg']
          }
        }
        dispatch({ type: 'SLACK_UPDATE', payload: { msg } })
        console.log(err)
      })
  }
  
  onChange = key => event => this.setState({ [key]: event.target.value });
  setMessage = (message, color, time) => {
    this.setState({ message, color });
    let timer;
    timer = setTimeout(() => {
      this.setState({ message: undefined, color: undefined });
      clearTimeout(timer);
    }, time || 5000);
  }
  handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/v1/auth/signup', { ...this.state, password: '', src: 'email_signup' })
      .then(({ data }) => {
        const message = data.success ? 'Thank you for signing up for our mailing list!' : 'It looks like that email address is already signed up.';
        const color = data.success ? '#3d963d' : '#f00';
        this.setMessage(message, color);
      })
      .catch(err => {
        console.error(err);
        this.setMessage('It looks like something went wrong.', '#f00');
      });
  }

  constructor(props) {
    super(props)

    this.state = {
      submittedUrl: '',
      openSection: '',
      email: ''
    }
  }

  render() {
    const { confirmPolicy, activeStep, errorMessage } = this.props
    const { submittedUrl } = this.state

    const osite = this.props.site.toJS()

    const slackstatus = <SlackStatus>{osite.slackstatus}</SlackStatus>

    return (
      <Container>
        <Title>Contact Us</Title>
        <Text>
          We try to respond to every inquiry, but sometimes the volume of
          incoming questions can cause our queue to explode. We prioritize
          responses to Data Skeptic members first, and to those who ask
          questions in a public forum like Twitter, our Facebook wall (not
          Facebook direct message), or Slack. Many people can benefit from
          responses in public places.
        </Text>

        <Socials>
          <SocialBlock order={1}>
            <SocialIcon
              src={
                'https://s3.amazonaws.com/dataskeptic.com/img/2018/contact-us/twitter-square+-+FontAwesome.svg'
              }
            />
            <p>
              You can find us on Twitter via{' '}
              <TwitterLink
                href="https://twitter.com/dataskeptic"
                className="no-line"
              >
                @DataSkeptic
              </TwitterLink>
            </p>
          </SocialBlock>
          <SocialBlock order={3}>
            <SocialIcon
              src={
                'https://s3.amazonaws.com/dataskeptic.com/img/2018/contact-us/facebook-square+-+FontAwesome.svg'
              }
            />
            <p>
              We are on Facebook via{' '}
              <FacebookLink
                href="https://www.facebook.com/dataskeptic"
                className="no-line"
              >
                https://www.facebook.com/dataskeptic
              </FacebookLink>
            </p>
          </SocialBlock>
          <SocialBlock order={2}>
            <SocialForm onSubmit={this.subscribeSlack}>
              <SocialIcon
                src={
                  'https://s3.amazonaws.com/dataskeptic.com/img/2018/contact-us/logo-slack.svg'
                }
              />
              <input name="email" id="email" />
              <button
                type="submit"
                className="slack-button"
                onClick={this.onClick}
              >
                Join Slack
              </button>
              {slackstatus}
            </SocialForm>
          </SocialBlock>
          <SocialBlock order={4}>
            <SocialIcon
              src={
                'https://s3.amazonaws.com/dataskeptic.com/img/2018/contact-us/mail_outline+-+material+copy.svg'
              }
            />
            <SocialForm
              method="post"
              className="validate"
            >
              <input
                name="email"
                className="email"
                placeholder="Email address"
                required
                value={this.state.email}
                onChange={this.onChange('email')}
              />
              <button
                onClick={this.handleSubmit}
                id="mc-embedded-subscribe"
              >
                Join Mailing List
              </button>
            </SocialForm>
          </SocialBlock>
          <SocialBlock order={5} />
          <SocialBlock order={6} style={{ color: this.state.color }}>{this.state.message && this.state.message}</SocialBlock>
        </Socials>

        <ListenerArea>
          <Title>Listener Questions</Title>
          <Text>
            We love hearing from our listeners! If you have a question about one
            of our episodes or a general question that's relevant to Data
            Skeptic, please ask via the in-browser recording system below. Try
            to keep your question to 30 seconds or less and make sure your
            question is a question.
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
        
        <hr />

        <Sections>
          <SectionBlock
            title="General Inquiries"
            open={this.isSectionOpen('general')}
            onToggle={() => this.toggleSection('general')}
          >
            <Text>
              We can no longer reply to every message we get. If your inquiry is
              a question that you'd like us to answer, your best bet is to use
              the Listener Questions section on this page or ask publically via
              Twitter. Alternatively, we do have the contact form below
              available.
            </Text>
            <ContactFormContainer type />
          </SectionBlock>

          <SectionBlock
            title="For Members"
            open={this.isSectionOpen('members')}
            onToggle={() => this.toggleSection('members')}
          >
            <Text>
              Login to the Members' Portal <Link to="/login">here</Link> or send
              us a quick message via the form below.
            </Text>
            <ContactFormContainer type />
          </SectionBlock>

          <SectionBlock
            title="Store / Orders"
            open={this.isSectionOpen('orders')}
            onToggle={() => this.toggleSection('orders')}
          >
            <Text>
              If you have any issues with your order from our store, please
              contact{' '}
              <a href="mailto:orders@dataskeptic.com">orders@dataskeptic.com</a>.
            </Text>
          </SectionBlock>

          <SectionBlock
            title="For Advertisers"
            open={this.isSectionOpen('advertise')}
            onToggle={() => this.toggleSection('advertise')}
          >
            <Text>
              Data Skeptic currently accepts one (1) advertising slot per show.
              We are often booked months in advance. For a rate sheet, please
              contact{' '}
              <a href="mailto:advertising@dataskeptic.com">
                advertising@dataskeptic.com
              </a>.
            </Text>
          </SectionBlock>

          <SectionBlock
            title="For Media Inquiries"
            open={this.isSectionOpen('media')}
            onToggle={() => this.toggleSection('media')}
          >
            <Text>
              Kyle is available for comment to the media. Please send a direct
              email to{' '}
              <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a> to
              make first contact. After connecting, we have a Calendly link to
              share that will allow you to book a time that suits your schedule.
            </Text>
          </SectionBlock>
        </Sections>
      </Container>
    )
  }
}

const SocialBlock = ({ left, children, order }) => (
  <Social order={order}>{children}</Social>
)

const Linkx = styled.a``

const TwitterLink = Linkx.extend`
  color: #1da1f3;
`

const FacebookLink = Linkx.extend`
  color: #3b5998;
`

const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 15px;
`

const Title = styled.h2``

const Text = styled.p``

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
  position: relative;

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
  margin-right: 17px;
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
    > div {
      width: 100%;
      margin-top: 0px;
      padding-bottom: 0px;
    }
  }
`

const ListenerArea = styled.div``

const SocialForm = styled.form`
  flex: 1;
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

const SlackStatus = styled.span`
  position: absolute;
  padding-left: 40px;
  font-size: 12px;
  margin-top: 28px;
  color: #2d1454;

  @media (max-width: 768px) {
    position: relative;
    font-size: 13px;
    margin-top: 4px;
    padding: 0px;
  }
`

const selector = formValueSelector('question')

export default page(
  connect(state => ({
    cart: state.cart,
    site: state.site,
    confirmPolicy: selector(state, 'confirmPolicy'),
    activeStep: state.questions.getIn(['form', 'step']),
    errorMessage: state.questions.getIn(['form', 'error']),
    aws_proposals_bucket: state.proposals.getIn(['aws_proposals_bucket'])
  }))(ContactUs),
  {
    title: 'Contact Us',
    description:
      'We hope to respond to all inquiries, but sometimes the volume of incoming questions can cause our queue to explode. We prioritize responses to Data Skeptic members first, and to those who ask questions in a public forum like Twitter, our Facebook wall (not Facebook direct message), or Slack. Many people can benefit from responses in public places.'
  }
)
