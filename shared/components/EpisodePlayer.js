import React, {Component} from 'react'
import {connect} from 'react-redux';
import moment from 'moment';

import {Link} from 'react-router';

import Loading from "../Common/Components/Loading"
import Error from "../Common/Components/Error"
import {loadEpisode, clearEpisode} from "../utils/redux_loader"

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
      </PodcastBox>
    )
  }
}

export default connect(state => ({
    player: state.player
}))(EpisodePlayer)


