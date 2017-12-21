import React, {Component} from 'react'
import Container from '../../components/Container'
import Page from '../../hoc/Page'
import styled from 'styled-components'
import Link from '../../components/Link'

@Page
export default class Snl extends Component {

    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []
        await Promise.all(promises)
    }

    render() {
        return (
            <Container title={"Snl"}>
                <Inner>
                    <Title>Causal Impact</Title>
                    <p>We're going to regularly add a few pieces of content about Causal Impact as they come up on Data Skeptic.  Check back later for more interesting things!</p>
                    <p>To reach out to the podcast, please visit our <Link href={'/contact-us'}><b>Contact Us</b></Link>  page.</p>

                    <ul>
                        <li><Link href="/blog/episodes/2016/causal-impact">Podcast episode</Link></li>
                        <li><Link href="http://snl.dataskeptic.com/">Shinny App</Link></li>
                    </ul>
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
`