import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { changePageTitle } from "../../Layout/Actions/LayoutActions"

class Careers extends Component {
  static getPageMeta() {
    return {
      title: "Careers | Data Skeptic"
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { title } = Careers.getPageMeta(this.props)
    dispatch(changePageTitle(title))
  }

  render() {
    return (
      <Container>
        <Title>Careers</Title>
        <Text>Data Skeptic is asking listeners to send us their resumes for an upcoming project. Submit your resume and we'll send you a personalized analysis which compares your resume to other submissions.</Text>
        <Text>If you're concerned about privacy, feel free to remove your contact information from PDF you upload.</Text>
      </Container>
    )
  }
}

const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 15px;
`

const Title = styled.h2``

const Text = styled.p``

export default connect(state => ({}))(Careers)
