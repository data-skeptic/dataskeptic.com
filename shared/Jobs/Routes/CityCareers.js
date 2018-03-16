import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { changePageTitle } from "../../Layout/Actions/LayoutActions"

import Carousel, {
  Wrapper as CarouselWrapper
} from "../../Common/Components/Carousel"

import Events, {
  Wrapper as EventsWrapper
} from '../Containers/Events'

import { loadCareersCity } from "../../reducers/JobsReducer"

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
      title: "Careers | Data Skeptic"
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
    const { loading, loaded, error } = this.props
    let { jobs, events, blogs } = this.props

    events = events.concat(events).concat(events).concat(events)
    
    return (
      <Container className="careers_city_page">
        <code>
          {JSON.stringify({
            loading,
            loaded,
            error
          })}
        </code>
        <Layout>
          <Left>
            {/*<code>{JSON.stringify(jobs)}</code>*/}
            {/*<Carousel items={blogs} />*/}
            <Row>
              <Events events={events} />
              <Resume>resume</Resume>
            </Row>
          </Left>
          <Jobs>
            {/*<code>{JSON.stringify(jobs)}</code>*/}
          </Jobs>
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
    background: red;
  }
`

const Jobs = styled.div`
  flex: 0 0 320px;
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
  loading: state.jobs.getIn(["city", "loading"]),
  loaded: state.jobs.getIn(["city", "loaded"]),
  error: state.jobs.getIn(["city", "error"]),
  jobs: state.jobs.getIn(["city", "jobs"]),
  events: state.jobs.getIn(["city", "events"]),
  blogs: state.jobs.getIn(["city", "blogs"])
}))(CityCareers)
