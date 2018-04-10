import React, { Component } from 'react'
import styled from 'styled-components'
import { changePageTitle } from '../../Layout/Actions/LayoutActions'
import { container } from '../../styles'
import { connect } from 'react-redux'

class CareersJobsAdd extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    const { title } = CareersJobsAdd.getPageMeta(this.props)
    dispatch(changePageTitle(title))
  }

  static getPageMeta() {
    return {
      title: 'Careers Jobs Add | Data Skeptic'
    }
  }

  render() {
    return <Container>CareersJobsAdd</Container>
  }
}

const Container = styled.div`
  ${container};
`

export default connect(state => ({}))(CareersJobsAdd)
