import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Blogs, { Wrapper as CarouselWrapper } from '../Containers/Blogs'

import Events, { Wrapper as EventsWrapper } from '../Containers/Events'
import Jobs from '../Containers/Jobs'

import { loadCareersCity } from '../../reducers/JobsReducer'
import UploadResume from '../Forms/UploadResume'
import page from "../../Layout/hoc/page";

const FILES_BUCKET = process.env.SITE_BUCKET

class CityCareers extends Component {
  static defaultProps = {
    blogs: [],
    events: [],
    jobs: [],
    loading: false,
    loaded: false,
    error: null
  }

  componentDidMount() {
    const cityId = this.props.params.id
    this.props.dispatch(loadCareersCity(cityId))
  }

  render() {
    const { loading, loaded, error, submitted, submitting, notify } = this.props
    let { jobs, events, blogs } = this.props

    return (
      <Container className="careers_city_page">
        <Layout>
          <Left>
            <Blogs blogs={blogs} />
            <Title>Events</Title>
            <Row>
              <Events events={events} />
              <Resume>
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
                      You should expect your personalized report in the next 3-4
                      weeks.
                    </p>
                    <img
                      src="https://s3.amazonaws.com/dataskeptic.com/img/bot/bot-image.png"
                      width="200"
                    />
                  </Success>
                )}
              </Resume>
            </Row>
          </Left>
          <Right>
            <Title>Jobs</Title>
            <Jobs jobs={jobs} />
          </Right>
        </Layout>
      </Container>
    )
  }
}

const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 15px;
`

const Title = styled.h1`
  color: #2d1454;
  font-size: 24px;
  line-height: 31px;
  font-weight: bold;
  text-transform: uppercase;
`

const Layout = styled.div`
  display: flex;
`

const Left = styled.div`
  flex: 1;

  ${CarouselWrapper} {
    height: 400px;
  }
`

const Right = styled.div`
  flex-basis: 420px;

  background-color: #f4f4f4;
  padding: 32px;
  margin: 10px;
  margin-top: 24px;
`

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  ${EventsWrapper} {
    margin: 10px;

    width: 50%;
    flex-basis: 50%;
  }
`

const Resume = styled.div`
  flex-basis: 48%;
  width: 48%;
  margin: 10px;
`

export default page(connect(state => ({
  loading: state.jobs.getIn(['city', 'loading']),
  loaded: state.jobs.getIn(['city', 'loaded']),
  error: state.jobs.getIn(['city', 'error']),
  jobs: state.jobs.getIn(['city', 'jobs']),
  events: state.jobs.getIn(['city', 'events']),
  blogs: state.jobs.getIn(['city', 'blogs'])
}))(CityCareers), { 
  title: 'Careers'
})
