import React, { Component }  from 'react'
import {connect} from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router'
import {
  PostTitle,
  Container,
  PodcastBox,
  PlayBox,
  Arrow,
  PlayText,
  PodViewMore
} from './style'

import {
  ItemDate,
  ItemTitle,
  ItemDesc
 } from '../Blog/style'
 import EpisodePlayer from '../../../components/EpisodePlayer'
 import {changePageTitle} from '../../../Layout/Actions/LayoutActions';

class Podcast extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var dispatch = this.props.dispatch
    const title = 'Data Skeptic'
    dispatch(changePageTitle(title))
    dispatch({type: "CMS_GET_HOMEPAGE_CONTENT", payload: {dispatch} })
  }

  render () {

    var ocms = this.props.cms.toJS()
    var latest_episode_blog = ocms.latest_episode
    var guid = latest_episode_blog['guid']
    var oepisodes = this.props.episodes.toJS()
    var ep_map = oepisodes.ep_map
    var old_latest_episode = ep_map[guid]
    const { latest_episode } = this.props
    return (
      <Container>
        <PostTitle>LATEST PODCAST</PostTitle>
        <EpisodePlayer episode={old_latest_episode} desc={latest_episode.abstract}/>
      </Container>
    )
  }
}

export default connect(state => ({
    episodes: state.episodes, 
    cms: state.cms
}))(Podcast)