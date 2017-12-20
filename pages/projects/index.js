import React, {Component} from 'react'
import Link from '../../components/Link'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from "../../components/Container";
import {media} from "../../modules/styles";

@Page
export default class Projects extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        await Promise.all(promises)
    }

    render() {
        return (
            <Container title={`Projects`}>
                <Wrapper>
                    <Boxes>
                        <Box>
                            <Card>
                                <Preview src="/img/png/openhouse.png"/>
                                <Title>OpenHouseProject.co</Title>
                                <Description>OpenHouse makes analysis grade transactional home sales data available via web and
                                    API.</Description>
                                <LinkArea>
                                    <Link href="http://openhouseproject.co">OpenHouseProject.co</Link>
                                </LinkArea>
                            </Card>
                        </Box>
                        <Box>
                            <Card>
                                <Preview src="/img/png/snl-impact.png"/>
                                <Title>SNL Causal Impact</Title>
                                <Description>As an appendix to our Causal Impact episode, we teamed up with <a
                                    href="http://github.com/kjblakemore">Karen Blakemore</a> to create a Shiny webapp to
                                    interact with the Saturday Night Live analysis.</Description>
                                <LinkArea>
                                    <Link href="/l/snl-impact">dataskeptic.com/l/snl-impact</Link>
                                </LinkArea>
                            </Card>
                        </Box>
                    </Boxes>
                    <Also>
                        If you like our work, perhaps we can collaborate. Visit our <Link
                        href="/services">Services</Link> page for details.
                    </Also>
                </Wrapper>
            </Container>
        )
    }
}

const Wrapper = styled.div`
    max-width:800px;
    margin:0 auto;
`

const Boxes = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ${media.phone`
        flex-direction: column;
    `};
`

const Box = styled.div`
    flex:0 0 45%;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0 0;
    background: #fafafa;
    border: 1px solid #d7d9d9;
`

const Card = styled.div`
    text-align: center;
`

const Preview = styled.img``
const Title = styled.div`
    font-weight: 700;
    font-size: 12pt;
    text-align: center;
`

const Description = styled.div`margin: 0 0 10.5px;`
const LinkArea = styled.div`width: 100%; text-align: center;`

const Also = styled.div`
    text-align: center;
    padding: 20px 0px;
    
    > a {
        text-decoration: underline;
    }
`