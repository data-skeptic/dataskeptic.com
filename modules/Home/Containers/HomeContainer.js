import React, {Component} from 'react'
import styled from 'styled-components'
import {Form} from "react-final-form"
import {connect} from 'react-redux'
import SubscribeForm from '../Components/SubscribeForm'
import Container from '../../../components/Container'
import Marker from '../../../components/Marker'
import Cards from '../Components/Cards'
import {getDailySponsor, getLatestBlogPost, getLatestEpisode} from "../../../redux/modules/homeReducer";
import {media} from "../../styles";

@connect(
    state => ({
        latestPost: getLatestBlogPost(state),
        latestEpisode: getLatestEpisode(state),
        dailySponsor: getDailySponsor(state)
    }),
    {}
)
export default class HomeContainer extends Component {

    setEpisodeDescription = episodeDescription => ({__html: episodeDescription});

    render() {
        const {latestPost, latestEpisode, dailySponsor} = this.props
        return (
            <Container>
                <Intro>
                    <Marker>Data Skeptic</Marker> is your source for a perspective of scientific skepticism
                </Intro>

                <Cards
                    setEpisodeDescription={this.setEpisodeDescription}
                    latestPost={latestPost}
                    latestEpisode={latestEpisode}
                    sponsor={dailySponsor}
                />

                <SubscribeForm/>
            </Container>
        )
    }
}
const Intro = styled.h1`
    font-size: 48px;
    padding: 6px 0px;
    padding-left: 50px;
    margin-top: 85px;
    border-left: 4px solid ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.dark}

   ${media.phone`
        font-size: 22px;
        padding: 12px 0px;
        padding-left: 10px;
        border-left-width: 2px;
        margin-top: 15px;
   `};
`