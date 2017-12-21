import React, {Component} from 'react'
import Link from '../../components/Link'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from "../../components/Container";
import {media} from "../../modules/styles";

@Page
export default class Press extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container title={`Press`}>
                <Wrapper>
                    <Title>Press</Title>
                    <Paragraph>Broadly, I'm available for comment on issues related to data science, artificial intelligence, machine learning, data visualization, big data, cloud computing, and technology.</Paragraph>
                    <Paragraph>I'm also eager to provide clarification, follow up, or deeper details related to any episodes of the show and the topics covered.</Paragraph>
                    <Box>
                        <About>
                            <img src="/static/img/png/kyle-polich.png" />
                            <Caption>
                                <p>Kyle Polich</p>
                                <p>Data Skeptic, Executive Producer</p>
                            </Caption>
                        </About>
                        <GetStarted>
                            <h2>Let's start a conversation</h2>
                            <Paragraph>if we haven't made contact yet, feel free to reach out to me via <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a>.</Paragraph>
                            <Paragraph>If I've previously agreed to be available for comment with you, schedule a time for us to chat via the link below.</Paragraph>

                            <BookMe>
                                <a href="https://calendly.com/polich">
                                    <BookWord>Book me on</BookWord>{' '}
                                    <BookLink>calendly.com/polich</BookLink>
                                </a>
                            </BookMe>
                        </GetStarted>
                    </Box>
                </Wrapper>
            </Container>
        )
    }
}

const Wrapper = styled.div`
    max-width:800px;
    margin:0 auto;
`

const Title = styled.h2`
    font-weight: 700;
    font-size: 32px;
`

const Paragraph = styled.p``

const Box = styled.div`
    border-width: 0px;
    padding: 10px;
    border-style: solid;
    border-color: #222;
    border-radius: 5px;
    background-color: #eee;
    min-height: 420px;
    margin-bottom: 100px;
    
    display: flex;

    ${media.phone`
        flex-direction: column;
    `};
`

const About = styled.div`
    flex-basis: 45%;
`

const Caption = styled.div`
    font-style: italic;
`

const GetStarted = styled.div`
    flex-basis: 45%;
`

const BookMe = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    
    a {
        background-color: #666;
        border-radius: 5px;
        padding: 10px;
        padding-left: 25px;
        padding-right: 25px;
    }
`

const BookWord = styled.span`color: #fff;`
const BookLink = styled.b`color: #ccf;`