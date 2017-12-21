import React, {Component} from 'react'
import Link from '../../components/Link'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from "../../components/Container";
import {media} from "../../modules/styles";

@Page
export default class Coaching extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container title={`Coaching`}>
                <Wrapper>
                    <Title>Professional development coaching</Title>
                    <Paragraph>I remember when I left school to enter the job market. There was so much I didn't know! I worked hard and got good grades, but I realize that was only half the recipe for success. I had to learn about how to interview, how to negotiate, when to make a career move, and what skills I needed to make myself more attractive to employers. It was a long and slow process. In retrospect, I wish I had a mentor to help me along the way.</Paragraph>
                    <Paragraph>Many years later, I find myself in a position to help people like that. I bring my industry experience, knowledge of data science, and connections in the industry to the table to help people prepare for and execute their next career move.</Paragraph>
                    <Paragraph>My services include a weekly 1 hour Skype session where we define your goals, discuss your questions, and I share relevant knowledge, contacts, and references. With most of the people I work with, this means technical walkthroughs where I teach them tools like SQL, sk-learn, dplyr, Spark, etc. Other times we focus more on interview preparation or portfolio building. Basically, I'm here to develop a custom plan that works for you.</Paragraph>
                    <Paragraph>In addition to our hour weekly checkin, I'm happy to have some email back and forth or a Slack discussion when we're both online. We'll usually set goals in each Skype session, so this is helpful if there are stumbling blocks along the way and we don't lose a week.</Paragraph>
                    <Paragraph>Overall, my vision is to help you find a career you want to pursue, identify any skill gaps, teach those skill gaps, and coach you through rounds of interviews until you have an offer letter in your hand. I can often make personal introductions when I have relevant industry contacts.</Paragraph>
                    <Paragraph>My standard rate is $550 / month.</Paragraph>
                    <Paragraph>Your next question is likely to be "Ok, but how many months is this going to take?" Ultimately, that depends on you. I don't yet know your starting point or finishing line. That's something we can discuss on our first chat. I should be able to give you a realistic time frame after an initial discussion. I've worked with people as short as one month and as long as 9 months. Largely, the variance is your existing technical background and the amount of time you can put in per week.</Paragraph>
                    <Paragraph>Let me help you push your career forward!</Paragraph>

                    <Box>
                        <About>
                            <img src="/static/img/png/kyle-polich.png" />
                            <Caption>
                                <p>Kyle Polich</p>
                                <p>Data Skeptic, Executive Producer</p>
                            </Caption>
                        </About>
                        <GetStarted>
                            <h2>Let's get started</h2>
                            <Paragraph>Schedule me right now for our first session. If you're not completely satisified, I'll wave the fee and we'll part friends.</Paragraph>
                            <Paragraph>I look forward to helping you achieve your objectives as a data scientist.</Paragraph>

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