import React, { Component } from 'react'
import Container from '../components/Container'
import Page from '../hoc/Page'
import Home from '../modules/Home/Container/Home'

@Page
export default class Dashboard extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const state = getState()
    const promises = []
    await Promise.all(promises)
  }

  render() {
    return (
      <Container>
        <Home/>
      </Container>
    )
  }
}
