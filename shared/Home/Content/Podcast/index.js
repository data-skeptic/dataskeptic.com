import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostTitle, Container } from './style'
import EpisodePlayer from '../../../components/EpisodePlayer'

class Podcast extends Component {
  render() {
    var { latest_episode } = this.props
    return (
      <Container>
        <EpisodePlayer
          episode={latest_episode}
          desc={latest_episode.abstract}
        />
      </Container>
    )
  }
}

export default connect(state => ({
  episodes: state.episodes,
  cms: state.cms
}))(Podcast)
