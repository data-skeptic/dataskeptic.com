import React, { Component } from "react"
import { connect } from "react-redux"
import { change, formValueSelector } from "redux-form"
import styled from "styled-components"
import { changePageTitle } from "../../Layout/Actions/LayoutActions"
import UploadFileTypeBox from "../../Proposals/Components/UploadFileTypeBox/UploadFileTypeBox"
import UploadResume, {
  KEY,
  RESUME_FIELD,
  NOTIFY_FIELD
} from "../Forms/UploadResume"

import { submitResume } from "../../reducers/JobsReducer"

class Careers extends Component {
  onResumeUpload = data => {
    const value = data[0]
    this.setResume(value)
    this.props.dispatch({
      type: "UPLOAD_RESUME",
      payload: data
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { title } = Careers.getPageMeta(this.props)
    dispatch(changePageTitle(title))
  }
  submit = data => {
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
      title: "Careers | Data Skeptic"
    }
  }

  render() {
    const { resume, notify, submitted, error } = this.props
    const files = resume ? [resume] : []

    return (
      <Container className="careers_page">
        <Title>Careers</Title>
        <Row>
          <Column>
            <Text>
              Data Skeptic is asking listeners to send us their resumes for an
              upcoming project. Submit your resume and we'll send you a
              personalized analysis which compares your resume to other
              submissions.
            </Text>
            <Text>
              If you're concerned about privacy, feel free to remove your
              contact information from PDF you upload.
            </Text>

            {!submitted ? (
              <UploadResume
                showSubmit={true}
                onSubmit={this.submit}
                customError={error}
                showEmail={notify}
              >
                <UploadBox
                  wrapperClass="resume_upload"
                  multiple={false}
                  files={files}
                  onDrop={this.onResumeUpload}
                  onRemove={this.onResumeRemove}
                />
              </UploadResume>
            ) : (
              <Success>
                <h1>Thank you!</h1>
                <p>Resume Uploaded.</p>
                <img
                  src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
                  width="200"
                />
              </Success>
            )}
          </Column>
          <Right>
            <Img src="https://s3.amazonaws.com/dataskeptic.com/img/2018/kyle-reading-the-master-algorithm.jpg" />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eaque et laborum nobis officiis quia ratione ut veniam? Cum delectus dolor dolorum eligendi eos maiores molestias officiis quae ratione repudiandae!
            </Text>
          </Right>
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
  submitted: state.jobs.getIn(["resume", "submitted"]),
  error: state.jobs.getIn(["resume", "error"])
}))(Careers)
