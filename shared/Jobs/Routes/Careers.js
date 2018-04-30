import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change, formValueSelector } from 'redux-form'
import styled from 'styled-components'
import moment from 'moment'

import { changePageTitle } from '../../Layout/Actions/LayoutActions'
import UploadFileTypeBox from '../../Proposals/Components/UploadFileTypeBox/UploadFileTypeBox'
import UploadResume, {
  KEY,
  RESUME_FIELD,
  NOTIFY_FIELD
} from '../Forms/UploadResume'

import { submitResume } from '../../reducers/JobsReducer'

const FILES_BUCKET = process.env.SITE_BUCKET

class Careers extends Component {
  onResumeUpload = data => {
    const value = data[0]
    this.setResume(value)
    this.props.dispatch({
      type: 'UPLOAD_RESUME',
      payload: data
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { title } = Careers.getPageMeta(this.props)
    dispatch(changePageTitle(title))
  }
  submit = data => {
    data = {
      ...data,
      Bucket: FILES_BUCKET
    }

    return submitResume(this.props.dispatch, data)
  }

  onResumeRemove = () => {
    this.setResume(null)
  }

  setResume = value => {
    this.props.dispatch(change(KEY, RESUME_FIELD, value))
  }

  static getPageMeta() {
    return {
      title: 'Careers | Data Skeptic'
    }
  }

  render() {
    const { resume, notify, submitted, error, submitting } = this.props
    const files = resume ? [resume] : []
    var due_date = new Date(2018, 4, 1)
    var due_date_str = due_date.toString()

    return (
      <Container className="careers_page">
        <Title>Resume corpus submission system</Title>
        <Row>
          <Column>
            <Text>
              Data Skeptic is asking listeners to send us their resumes for an
              upcoming project. Submit your resume and we'll send you a
              personalized analysis which compares your resume to other
              submissions.
            </Text>

            {!submitted ? (
              <UploadResume
                showSubmit={true}
                onSubmit={this.submit}
                customError={error}
                showEmail={notify}
                bucket={FILES_BUCKET}
                customSubmitting={submitting}
              />
            ) : (
              <Success>
                <h3>Thank you!</h3>
                <p>Resume Uploaded.</p>
                <p>We're planning about two weeks of data collection.</p>
                <p>After that, our analysis phase will begin.</p>
                <p>
                  You should expect your personalized report in the next 1-2
                  weeks.
                </p>
                <img
                  src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
                  width="200"
                />
              </Success>
            )}
          </Column>
          <Right />
        </Row>
      </Container>
    )
  }
}

const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 15px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  margin-right: 2em;
  margin-bottom: 2em;

  @media (max-width: 500px) {
    margin-right: 0;
  }
`

// flex: 1; // same width
// flex: 0 0 230px; // side right
const Right = Column.extend`
  flex: 0 0 230px;

  @media (max-width: 768px) {
    flex-basis: auto;
  }
`

const Title = styled.h2``

const Text = styled.p``

const Img = styled.img`
  max-width: 100%;
  margin-bottom: 1em;
`

const Success = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const UploadBox = styled(UploadFileTypeBox)`
  background: black;
`

const selector = formValueSelector(KEY)
export default connect(state => ({
  resume: selector(state, RESUME_FIELD),
  notify: selector(state, NOTIFY_FIELD),
  submitted: state.jobs.getIn(['resume', 'submitted']),
  submitting: state.jobs.getIn(['resume', 'submitting']),
  error: state.jobs.getIn(['resume', 'error'])
}))(Careers)
