import React, {Component} from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import {
    loadEpisodesList,
    loadYears,
    hasEpisodes,
    hasYears,
    setActiveYear,
    setCurrentPage
} from "../../redux/modules/podcastReducer";
import PodcastWrapper from '../../modules/Podcasts/Containers/PodcastWrapper'
import YearList from '../../modules/Podcasts/Containers/YearList'
import Container from "../../components/Container";

const getActualQuery = (year, page, isPage = false) => {
    if (!year) {
        page = year;
        year = null
    }

    if (!page) {
        page = year;
        year = null
    }

    if (!page) page = 1

    if (isPage) {
        return page
    } else {
        return year;
    }
}

@Page
export default class Podcasts extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState();
        let {year, page} = query
        const promises = [];

        const actualPage = getActualQuery(year, page, true);
        const actualYear = getActualQuery(year, page);

        promises.push(dispatch(setCurrentPage(actualPage)))
        promises.push(dispatch(setActiveYear(actualYear)))
        if (!hasEpisodes(state)) {
            promises.push(dispatch(loadEpisodesList(actualYear, actualPage)));
        }

        if (!hasYears(state)) {
            promises.push(dispatch(loadYears()));
        }

        await Promise.all(promises);
    }

    render() {
        return (
            <Container>
                <Wrapper>
                    <PodcastWrapper/>
                    <YearList/>
                </Wrapper>
            </Container>
        )
    }
}

const Wrapper = styled.div`
  display: flex;
`
const Title = styled.h1`
  color: red;
  text-align: center;
`