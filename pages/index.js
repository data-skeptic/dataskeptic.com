import React, {Component} from 'react'
import Container from '../components/Container'
import Marker from '../components/Marker';
import Page from '../hoc/Page'
import Cards from '../modules/Home/Components/Cards';
import styled from 'styled-components'
import {
    getDailySponsor,
    getLatestBlogPost,
    getLatestEpisode,
    loadAll,
    hasHomeData
} from "../redux/modules/homeReducer";
import SubscribeForm from "../modules/Home/Components/SubscribeForm";
import { Form } from "react-final-form"
@Page
export default class Dashboard extends Component {

    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []
        if(!hasHomeData(state)){
            promises.push(dispatch(loadAll()))
        }
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
            name: 'The Latest on the Blog',
            media: <img src="http://via.placeholder.com/45x45" alt="avatar"/>,
            title: 'Everything I`ve learned about the USC/L.A. Times poll',
            description: 'In statistics, two random variables might depend on one another. We call this conditional dependence... ',
            author: 'Christine Zhang',
            avatar: 'http://via.placeholder.com/45x45',
            date: 'June 9,  2017'
        }
        sponsor={
            name: 'Daily sponsor',
            media:'http://via.placeholder.com/45x45',
            title:'Thanks to Brilliant for sponsoring this week`s episode of Data Skeptic',
            promo:'Please visit http://brilliant.org/dataskeptics but only if you`re clever'

        }

        return (
            <Container>
                <Intro>
                    <Marker>Data Skeptic</Marker> is your source for a perspective of scientific skepticism
                </Intro>

                <Cards
                    latestPost={latestPost}
                    latestEpisode={latestEpisode}
                    sponsor={sponsor}
                />
                <Form
                    onSubmit={(data) => alert(data)}
                    render={SubscribeForm} />
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