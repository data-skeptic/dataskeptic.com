import React, {Component} from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import {
  loadEpisodesList,
  loadYears,
  hasEpisode,
  hasYears,
  setActiveYear
} from "../../redux/modules/podcastReducer";

@Page
export default class Podcasts extends Component {
  static async getInitialProps({store: {dispatch, getState}, query}) {
    const state = getState();
    const {year} = query
    const promises = [];
    if (year) {
      promises.push(dispatch(setActiveYear(year)))
    }

    if (!hasEpisode(state)) {
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
        <Title>Podcasts Page</Title>

        <Link href="/">Home</Link>
      </Container>
    )
  }
}

const Container = styled.div`

`

const Title = styled.h1`
  color: red;
  text-align: center;
`