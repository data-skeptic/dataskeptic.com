import React, {Component} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';
import styled from 'styled-components'
import {Link} from 'react-router';

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

import GuestImage from "./GuestImage"

class EpisodePlayer extends Component {
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
    var episode = this.props.episode
    this.props.dispatch({type: "PLAY_EPISODE", payload: episode})
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

    let play_symb = <span>&#9658;</span>;
    if (oplayer.is_playing) {
      if (oplayer.episode.guid === episode.guid) {
        play_symb = <span>&#10073;&#10073;</span>
        if (!playback_loaded) {
          play_symb = <img src="/img/player-spinner.gif" width="14" height="14"/>
        }
      }
    }
    const date = moment(episode.pubDate).fromNow()
    var link = episode.link
    var i = link.indexOf('/blog/')
    link = link.substring(i, link.length)

    const guests = episode.related && episode.related.filter((r) => r.type === 'person')

    return (
    
      <PodcastBox>
        <ItemDate>{moment(episode.pubDate).format('MMMM D, Y')}</ItemDate>
        <Link to={link}><ItemTitle>{episode.title}</ItemTitle></Link>
        <PlayBox onClick={this.onClick.bind(this, episode)}>
          <Arrow>{play_symb}</Arrow>
          <PlayText>Play</PlayText>
          <PlayText>{oplayer.episode.duration}</PlayText>
        </PlayBox>
        { this.getViewMoreTextDiv(desc) }
        <Guests>
            {guests && guests.map((g, i) => <GuestImage key={i} {...g} />)}
        </Guests>
      </PodcastBox>
    )
  }
}

const Guests = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  clear: both;
`

export default connect(state => ({
    player: state.player
}))(EpisodePlayer)


