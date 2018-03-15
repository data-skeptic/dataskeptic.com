import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { changePageTitle } from "../../Layout/Actions/LayoutActions"
import Carousel, {
  Wrapper as CarouselWrapper
} from "../../Common/Components/Carousel"
import {loadCareersCity, loadCareersCityData} from "../../reducers/JobsReducer";

const env = process.env.NODE_ENV === "dev" ? "dev" : "prod"
const config = require("../../../config/config.json")
const c = config[env]

class CityCareers extends Component {
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
    return (
      <Container className="careers_city_page">
        <Layout>
          <Left>
            <Carousel />
            <Row>
              <Events>events</Events>
              <Resume>resume</Resume>
            </Row>
          </Left>
          <Jobs>jobs</Jobs>
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
`

const Events = styled.div`
  flex-basis: 48%;
`

const Resume = styled.div`
  flex-basis: 48%;
`

export default connect(state => ({}))(CityCareers)
