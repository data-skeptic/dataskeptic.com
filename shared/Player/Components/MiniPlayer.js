import React from 'react'
import cn from 'classnames'
import PlayerProgressBar from '../Components/PlayerProgressBar'
import TogglePlayButton from '../Components/TogglePlayButton'

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
  <div className={cn('thin-player-container', { loading: !loaded })}>
    <div className="">
      <div className="col-xs-9 col-sm-4 col-md-3 preview">
        <img src={preview} alt={title} />
        <div className="description">
          <p className="date">{date}</p>
          <p className="title">{title}</p>
        </div>
      </div>
      <div
        className={cn('col-xs-4 col-sm-5 col-md-6 slider', {
          disabled: !loaded
        })}
        onClick={e => !loaded && ignore(e)}
      >
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
      </div>
      <div
        onClick={e => !loaded && ignore(e)}
        className={cn('hidden-xs col-sm-2 col-md-2 volume', {
          disabled: !loaded
        })}
      >
        {volumeSlider}
      </div>
      <div className="col-xs-3 col-sm-1 col-md-1 pull-right button">
        <div className="close-player-button-wrapper">
          <button className="close-player-button" onClick={onClose}>
            <img src="https://s3.amazonaws.com/dataskeptic.com/img/svg/x.svg" />
          </button>
        </div>
        <TogglePlayButton
          playing={playing}
          disabled={!loaded}
          onClick={onPlayToggle}
        />
      </div>
    </div>
  </div>
)

export default MiniPlayer
