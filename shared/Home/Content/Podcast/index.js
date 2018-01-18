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

  getViewMoreTextDiv (text='', href='') {
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

  // onClick(episode) {
  //   var episode = this.props.episode
  //   this.props.dispatch({type: "PLAY_EPISODE", payload: episode})
  // }

  render () {
    const { expanded } = this.state
    const { latest_episode } = this.props
    let href = 'blog' + latest_episode.prettyname
    console.log('podcast href', href)

    // var oplayer = this.props.player.toJS()
    // var episode = this.props.episode
    // var playback_loaded = oplayer.playback_loaded
    // if (!episode) {
    //     return <div>Loading episode</div>
    // }

    let play_symb = <span>&#9658;</span>;
    // if (oplayer.is_playing) {
    //     if (oplayer.episode.guid === episode.guid) {
    //         play_symb = <span>&#10073;&#10073;</span>
    //         if (!playback_loaded) {
    //             play_symb = <span>?</span>
    //         }
    //     }
    // }
    // var link = episode.link
    // var i = link.indexOf('/blog/')
    // link = link.substring(i, link.length)

    return (
      <Container>
        <PostTitle>LATEST PODCAST</PostTitle>
        <PodcastBox>
          <ItemDate>{moment(latest_episode.publish_date).format('MMMM D, Y')}</ItemDate>
          <Link to={href}><ItemTitle>{latest_episode.title}</ItemTitle></Link>
          {/* <PlayBox onClick={this.onClick.bind(this, episode)}> */}
          <PlayBox>
            <Arrow>{play_symb}</Arrow>
            <PlayText>Play</PlayText>
            <PlayText>15:59</PlayText>
          </PlayBox>
          { this.getViewMoreTextDiv(latest_episode.abstract, href) }
        </PodcastBox>
      </Container>
    )
  }
}

// export default connect(state => ({
//   player: state.player
// }))(Podcast)

export default Podcast