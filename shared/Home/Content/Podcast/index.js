import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostTitle, Container } from './style'
import EpisodePlayer from '../../../components/EpisodePlayer'

class Podcast extends Component {
  render() {
    var ocms = this.props.cms.toJS()
    var latest_episode_blog = ocms.latest_episode
    var guid = latest_episode_blog['guid']
    var oepisodes = this.props.episodes.toJS()
    var ep_map = oepisodes.ep_map
    console.log('guid!!!')
    console.log(guid)
    var old_latest_episode = ep_map[guid]
    console.log(old_latest_episode)
    var { latest_episode } = this.props
    console.log(latest_episode)
    return (
      <Container>
        <PostTitle>LATEST PODCAST</PostTitle>
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
