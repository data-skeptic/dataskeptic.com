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
  setActiveYear
} from "../../redux/modules/podcastReducer";
import PodcastWrapper from '../../modules/Podcasts/Containers/PodcastWrapper'
import YearList from '../../modules/Podcasts/Containers/YearList'
import Container from "../../components/Container";
@Page
export default class Podcasts extends Component {
  static async getInitialProps({store: {dispatch, getState}, query}) {
    const state = getState();
    const {year} = query
    const promises = [];
    if (year) {
      promises.push(dispatch(setActiveYear(year)))
    }

    if (!hasEpisodes(state)) {
      promises.push(dispatch(loadEpisodesList()));
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