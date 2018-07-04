import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { Link } from 'react-router'

import {
  Container,
  PodcastBox,
  PlayBox,
  Arrow,
  PlayText,
  PodViewMore
} from '../../shared/Home/Content/Podcast/style'

import {
  ItemDate,
  ItemTitle,
  ItemDesc
} from '../../shared/Home/Content/Blog/style'

import GuestImage from '../Podcasts/Components/GuestImage'

class EpisodePlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.expandedText = this.expandedText.bind(this)
  }

  expandedText() {
    this.setState({ expanded: true })
  }

  getViewMoreTextDiv(text = '') {
    if (text.length > 200) {
      if (this.state.expanded) {
        return (
          <div>
            <ItemDesc>{text}</ItemDesc>
          </div>
        )
      } else {
        return (
          <div>
            <ItemDesc>{text.substring(0, 200)}...</ItemDesc>
            <PodViewMore onClick={this.expandedText}>View More</PodViewMore>
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

  onClick(episode) {
    var dispatch = this.props.dispatch
    dispatch({ type: 'PLAY_EPISODE', payload: episode, dispatch })
  }

  render() {
    const { expanded } = this.state
    var oplayer = this.props.player.toJS()
    var episode = this.props.episode
    var desc = this.props.desc
    var playback_loaded = oplayer.playback_loaded
    if (!episode) {
      return <div>Loading episode</div>
    }

    let play_symb = <span>&#9658;</span>
    if (oplayer.is_playing) {
      if (oplayer.episode.guid === episode.guid) {
        play_symb = <span>&#10073;&#10073;</span>
        if (!playback_loaded) {
          if (!oplayer.is_playing) {
            play_symb = (
              <img src="/img/player-spinner.gif" width="14" height="14" />
            )            
          }
        }
      }
    }
    const date = moment(episode.pubDate).fromNow()
    var link = episode.link
    if (link == undefined) {
      link = ''
    }
    var i = link.indexOf('/blog/')
    link = link.substring(i, link.length)

    const guests =
      episode.related && episode.related.filter(r => r.type === 'person')

    return (
      <PodcastBox>
        <ItemDate>{moment(episode.pubDate).format('MMMM D, Y')}</ItemDate>
        <ItemTitle>
          <Link to={link} className="no-line">
            {episode.title}
          </Link>
        </ItemTitle>
        <PlayBox onClick={this.onClick.bind(this, episode)}>
          <Arrow>{play_symb}</Arrow>
          <PlayText>Play</PlayText>
          <PlayText>{oplayer.episode && oplayer.episode.duration}</PlayText>
        </PlayBox>
        {this.getViewMoreTextDiv(desc)}
        <Guests>
          {guests && guests.map((g, i) => <GuestImage key={i} {...g} />)}
        </Guests>
      </PodcastBox>
    )
  }
}

const Guests = styled.div`
  padding: 15px 0px 4px 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  clear: both;

  > * {
    border-color: #f4f4f4;
  }
`

export default connect(state => ({
  player: state.player
}))(EpisodePlayer)
