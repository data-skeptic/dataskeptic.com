import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { changePageTitle } from '../../Layout/Actions/LayoutActions'

import Blogs, {
  Wrapper as CarouselWrapper
} from '../Containers/Blogs'

import Events, { Wrapper as EventsWrapper } from '../Containers/Events'
import Jobs from '../Containers/Jobs'

import { loadCareersCity } from '../../reducers/JobsReducer'
import UploadResume from "../Forms/UploadResume";


const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const config = require('../../../config/config.json')
const c = config[env]

const FILES_BUCKET = c['files']['site_bucket']


class CityCareers extends Component {
  static defaultProps = {
    blogs: [],
    events: [],
    jobs: [],
    loading: false,
    loaded: false,
    error: null
  }

  static getPageMeta() {
    return {
      title: 'Careers | Data Skeptic'
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { title } = CityCareers.getPageMeta(this.props)
    dispatch(changePageTitle(title))

    const cityId = this.props.params.id
    this.props.dispatch(loadCareersCity(cityId))
  }

  render() {
    const { loading, loaded, error, submitted, submitting, notify } = this.props
    let { jobs, events, blogs } = this.props

    events = events
      .concat(events)
      .concat(events)
      .concat(events)
    
    return (
      <Container className="careers_city_page">
        <Layout>
          <Left>
            <Blogs blogs={blogs} />
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
  width: 320px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${EventsWrapper} {
    flex-basis: 68%;
  }
`

const Resume = styled.div`
  flex-basis: 28%;
`

export default connect(state => ({
  loading: state.jobs.getIn(['city', 'loading']),
  loaded: state.jobs.getIn(['city', 'loaded']),
  error: state.jobs.getIn(['city', 'error']),
  jobs: state.jobs.getIn(['city', 'jobs']),
  events: state.jobs.getIn(['city', 'events']),
  blogs: state.jobs.getIn(['city', 'blogs'])
}))(CityCareers)
