import React, { Component }  from 'react'
import moment from 'moment'
import {
  PostTitle,
  Container,
  PodcastBox,
  PlayBox,
  Arrow,
  PlayText
} from './style'

import {
  ItemDate,
  ItemTitle,
  ItemDesc,
  ViewMore,
  ArrowRight
 } from '../Blog/style'

class Podcast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.expandedText = this.expandedText.bind(this);
  }

  expandedText () {
    this.setState({ expanded: true });
  }

  getViewMoreTextDiv (text='') {
    if ( text.length > 200) {
      if ( this.state.expanded ) {
        return (
          <div>
            <ItemDesc>{text}</ItemDesc>
          </div>
        )
      } else {
        return (
          <div>
            <ItemDesc>{text.substring(0,200)}...</ItemDesc>
            <ViewMore onClick={this.expandedText}>View More</ViewMore>
            <ArrowRight />
          </div>
        )
      }
    } else {
      return (
        <div>
          <ItemDesc>{text}</ItemDesc>
        </div>
      )
    }
  }

  render () {
    const { expanded } = this.state
    const { latest_episode } = this.props
    return (
      <Container>
        <PostTitle>LATEST PODCAST</PostTitle>
        <PodcastBox>
          <ItemDate>{moment(latest_episode.publish_date).format('MMMM D, Y')}</ItemDate>
          <ItemTitle>{latest_episode.title}</ItemTitle>
          <PlayBox>
            <Arrow />
            <PlayText>Play</PlayText>
            <PlayText>15:59</PlayText>
          </PlayBox>
          { this.getViewMoreTextDiv(latest_episode.abstract) }
        </PodcastBox>
      </Container>
    )
  }
}

export default Podcast