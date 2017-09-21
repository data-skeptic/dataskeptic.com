import React, { Component } from 'react'
import Link from '../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../hoc/Page'

import DemoForm from '../modules/Pickup/Containers/DemoForm'

@Page
export default class Form extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState()
    const promises = []

    await Promise.all(promises)
  }

  submit = (data) => {
    console.dir(data)
  }

  render() {
    return (
      <Container>
        <Title>Form Page</Title>

        <DemoForm onSubmit={this.submit}/>

        <Link href="/test">Form</Link>
      </Container>
    )
  }
}

const Container = styled.div`

`

const Title = styled.h1`
  color: red;
  text-align: center;
`
