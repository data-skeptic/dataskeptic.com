import React from 'react'
import cn from 'classnames'
import PlayerProgressBar from '../Components/PlayerProgressBar'
import TogglePlayButton from '../Components/TogglePlayButton'
import moment from 'moment/moment'

import styled from 'styled-components'

const ignore = e => {
  e.preventDefault()
  e.stopImmediatePropagation()
  e.stopPropagation()
  return false
}

export const MiniPlayer = ({
  realPos = 0,
  playing = false,
  preview,
  title = '[No episode loaded yet]',
  date = '',
  duration = '--:--',
  position = '--:--',
  onPlayToggle,
  howler,
  onSeek,
  loaded = false,
  volumeSlider,
  onClose
}) => (
  <Container className="thin-player-container">
    <Preview>
      <img src={preview} alt={title} />
      <Description>
        <Date>{moment(date).format('MMMM D, Y')}</Date>
        <Title>{title}</Title>
      </Description>
    </Preview>
    <Howler>
      <PlayerProgressBar
        playing={playing}
        progress={position}
        onChange={onSeek}
        disabled={!loaded}
      />
      <div className="player-position-container">
        <span className="player-position">{realPos}</span>
      </div>
      <div className="player-duration-container">
        <span className="player-duration">{duration}</span>
      </div>
      {howler}
    </Howler>
    <Volume className="volume">{volumeSlider}</Volume>
    <Buttons className="button">
      <TogglePlayButton
        playing={playing}
        disabled={!loaded}
        onClick={onPlayToggle}
      />
      <div className="close-player-button-wrapper">
        <button className="close-player-button" onClick={onClose}>
          <img src="https://s3.amazonaws.com/dataskeptic.com/img/svg/x.svg" />
        </button>
      </div>
    </Buttons>
  </Container>
)

export default MiniPlayer

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
  box-shadow: 0 1px 15px hsla(0, 0%, 57%, 0.1);
`

const Preview = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: row;

  padding-right: 16px;
  flex-basis: 250px;

  img {
    width: 64px;
    height: 64px;
  }
  
  @media (max-width: 900px) {
    max-width: 400px;
  }

  @media (max-width: 760px) {
    max-width: 200px;
  }
`

const Description = styled.div`
  font-size: 12px;
  line-height: 14px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 16px;
  padding-right: 16px;

  width: 100%;
`

const Date = styled.div`
  color: #a2a6a6;
`
const Title = styled.div`
  color: #575959;
  overflow-x: hidden;
  height: 1em;
  margin: 0px;

  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Howler = styled.div`
  margin: 0px 15px;
  flex-grow: 10;

  @media (max-width: 760px) {
    position: absolute;
    padding: 0;
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;

    margin: 0px;
    
    .player-progress-bar {
      margin: 0px;
      padding: 0px;
    }

    .player-position-container,
    .player-duration-container {
      display: none;
    }
  }
`

const Volume = styled.div`
  flex-grow: 4;
  margin: 0px 15px;
  min-height: 20px;

  @media (max-width: 760px) {
    display: none;
  }
`

const Buttons = styled.div`
  flex-basis: 120px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
