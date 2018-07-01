import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getCurrentPlaying,
  getIsPlaying,
  resetPlayer,
  getIsVisible,
  getPosition,
  setPosition,
  play,
  pause
} from '../../redux/modules/playerReducer'
import styled from 'styled-components'
import moment from 'moment'
import Progress from './Progress'
import Ionicon from 'react-ionicons'
import Howler from './Howler'
@connect(
  state => ({
    currentPlaying: getCurrentPlaying(state),
    isPlaying: getIsPlaying(state),
    isVisible: getIsVisible(state),
    position: getPosition(state)
  }),
  { resetPlayer, play, pause, setPosition }
)
export default class Player extends Component {
  setPosition = progress => {
    this.props.setPosition(progress)
  }
  reset = () => {
    this.props.resetPlayer()
  }
  play = () => {
    console.log("p0")
    this.props.play()
    console.log("p1")
  }
  pause = () => {
    console.log("p2")
    this.props.pause()
    console.log("p3")
  }

  constructor() {
    super()
    this.state = {
      progress: 0,
      volume: 0.8
    }
  }

  render() {
    let { currentPlaying, isPlaying, isVisible, position } = this.props
    const { volume } = this.state

    if (!isVisible) {
      return <div />
    }
    var mp3 = currentPlaying.mp3

    return (
      <PlayerWrapper show={isVisible}>
        <PodcastBlock>
          <PodcastCover>
            <img src={currentPlaying.img} alt="" />
          </PodcastCover>
          <PodcastInfo>
            <Date>
              {moment(currentPlaying.pubDate).format('MMMM D, YYYY')}{' '}
            </Date>
            <PodcastTitle>{currentPlaying.title}</PodcastTitle>
          </PodcastInfo>
        </PodcastBlock>
        <PlayerBlock>
          <Howler
            mp3={mp3}
            isPlaying={isPlaying}
            position={position}
            setPosition={this.setPosition}
          />
        </PlayerBlock>
        <VolumeBlock>volume</VolumeBlock>
        <MediaBlock>
          {isPlaying ? (
            <MediaButton onClick={this.pause}>
              <Ionicon icon={'md-pause'} fontSize={'42px'} />
            </MediaButton>
          ) : (
            <MediaButton onClick={this.play}>
              <Ionicon icon={'md-play'} fontSize={'42px'} />
            </MediaButton>
          )}
        </MediaBlock>
      </PlayerWrapper>
    )
  }
}

const PlayerWrapper = styled.div`
    width: 100%;
    height: 64px;
    display: ${props => (props.show ? 'flex' : 'none')}
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: 0 1px 15px hsla(0,0%,57%,.1);
    position: sticky; 
    top: 0px;
    align-items: center;
`

const MediaButton = styled.div`
  height: 60px;
  margin-right: 5px;
  cursor: pointer;

  > svg {
    height: 60px;
    padding-right: 10px;
  }
`

const Date = styled.div`
  color: #a2a6a6;
  margin-bottom: 2px;
  font-size: 12px;
`

const PodcastCover = styled.div`
  img {
    height: 64px;
  }
`

const PodcastBlock = styled.div`
  flex-basis: 25%;
  display: flex;
  align-items: center;
`

const PlayerBlock = styled.div`
  flex-basis: 50%;
  audio {
    width: 100%;
  }
`
const VolumeBlock = styled.div`
  flex-basis: 16%;
`
const MediaBlock = styled.div`
  flex-basis: 9%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    height: 60px;
  }
`

const PodcastTitle = styled.div`
  font-size: 15px;
`
const PodcastInfo = styled.div`
  margin-left: 24px;
`
