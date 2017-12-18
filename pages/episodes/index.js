import React, { Component } from 'react'
import Href from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'

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
                <Title>Episodes Page</Title>

                <Link href="/">Home</Link>
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