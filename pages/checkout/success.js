import React, {Component} from 'react'
import Page from '../../hoc/Page'
import styled from 'styled-components'
import Container from '../../components/Container'
import Ionicon from 'react-ionicons'

@Page
export default class CheckoutSuccess extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container global title={`Payment Complete`}>
                <Wrapper>
                    <Ionicon icon="ios-checkmark-circle" fontSize="35px" color="#333333"/>
                    <Title>Thank you!</Title>
                    <Complete>Payment Complete.</Complete>
                </Wrapper>
            </Container>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 80vh;
`

const Title = styled.h1`
    margin: 8px 0px 0px 0px;
`

const Complete = styled.p`
    color: green;
`