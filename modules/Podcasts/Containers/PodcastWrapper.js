import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {getEpisodes, getActiveYear} from '../../../redux/modules/podcastReducer'
import {setCurrentPlaying} from '../../../redux/modules/playerReducer'
import PodcastListItem from '../Components/PodcastListItem'

@connect(
  state => ({
      episodes: getEpisodes(state),
      year: getActiveYear(state)
  }),
  {setCurrentPlaying}
)
export default class PodcastWrapper extends Component {

  render() {
    const {episodes} = this.props;
    return (
      <Wrapper>
        {episodes.length && episodes.map(episode => <PodcastListItem play={this.props.setCurrentPlaying} key={episode.guid} post={episode}/>)}
      </Wrapper>
    )
  }
}

const CategoryTitle = styled.h2`
  text-transform: capitalize;
  padding: 0;
  font-family: "SF Light";
  font-size: 26px;
  color: #3a3b3b;
`

const Wrapper = styled.div`
    margin-top:20px;
    flex-grow: 1;
    flex-basis: 70%;
    width: 70%;
    overflow: hidden;
`
