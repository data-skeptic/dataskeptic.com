import React from 'react'
import Page from '../hoc/Page'
import styled from 'styled-components'
import Container from '../components/Container'

@Page
export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }

    render() {
        const path = ''

        return (
            <Container title={"Page Not Found"}>
                <Inner>
                    <Title>Sorry, that page is not found.</Title>
                    <p>If you wouldn't mind, please drop a line to <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a> and let us know what you were looking for.</p>
                    <p>{path}</p>
                </Inner>
            </Container>
        )
    }
}

const Title = styled.h1`
  
`

const Inner = styled.div`
    max-width: 800px;
    margin: 0px auto;
    margin-top: 20px;
    flex-grow: 1;
    
    font-size: 15px;
`