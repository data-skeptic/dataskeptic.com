import React, {Component} from 'react'
import styled from 'styled-components'
import Page from '../../hoc/Page'


@Page
export default class Services extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container>
                store page
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
const ServiceWrapper = styled.div`
  max-width:800px;
  margin:0 auto;
`