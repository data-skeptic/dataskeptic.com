import React, { Component } from 'react'
import Link from '../../components/Link'
import Icon from 'react-fontawesome'
import styled from 'styled-components'
import Page from '../../hoc/Page'
import Container from "../../components/Container";
import {loadSingleEpisode} from "../../redux/modules/podcastReducer";
import Podcast from '../../modules/Podcasts/Containers/PodcastSingle'
@Page
export default class PodcastDetails extends Component {
  static async getInitialProps({ store: { dispatch, getState }, query }) {
    const {year, name} = query;
    const prettyName = `${year}/${name}`
    const promises = []
    promises.push(dispatch(loadSingleEpisode(prettyName)))
    await Promise.all(promises)
  }

  render() {
    const { url: { query: { id } } } = this.props
    return (
      <Container>
        <Podcast />
      </Container>
    )
  }
}


const Title = styled.h1`
  color: red;
  text-align: center;
`