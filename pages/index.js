import React, {Component} from 'react'
import Container from '../components/Container'
import Marker from '../components/Marker';
import Page from '../hoc/Page'
import Cards from '../modules/Home/Components/Cards';
import styled from 'styled-components'

@Page
export default class Dashboard extends Component {

    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []
        await Promise.all(promises)
    }

    render() {
        let {latestPost, latestEpisode, sponsor} = this.props

        latestPost = {
            name: 'The Latest on the Podcast',
            media: <img src="http://via.placeholder.com/45x45" alt="avatar"/>,
            title: 'Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft',
            description: 'This episode features discussion of database as a service, database migration, threat detection, R/python in SQL Server, and use cases',
            author: 'Kyle Polish',
            avatar: 'http://via.placeholder.com/45x45',
            date: 'June 12, 2017'
        }

        latestEpisode = {
            name: 'The Latest on the Podcast',
            media: <img src="http://via.placeholder.com/45x45" alt="avatar"/>,
            title: 'Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft',
            description: 'This episode features discussion of database as a service, database migration, threat detection, R/python in SQL Server, and use cases',
            author: 'Kyle Polish',
            avatar: 'http://via.placeholder.com/45x45',
            date: 'June 12, 2017'
        }

        return (
            <Container>
                <Intro>
                    <Marker>Data Skeptic</Marker>is your source for a perspective of scientific skepticism
                </Intro>

                <Cards
                    latestPost={latestPost}
                    latestEpisode={latestEpisode}
                    sponsor={sponsor}
                />
            </Container>
        )
    }
}
const Intro = styled.h1`
    font-size: 48px;
    padding: 6px 0px;
    padding-left: 50px;
    text-align: justify;
    margin-top: 85px;
    border-left: 4px solid ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.dark}
`