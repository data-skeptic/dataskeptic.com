import React from 'react'
import PlayerProgressBar from '../Components/PlayerProgressBar'
import TogglePlayButton from '../Components/TogglePlayButton'

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
  loaded,
  volumeSlider,
  onClose
}) => (
  <div className="thin-player-container">
    {!loaded && (
      <div className="loading">
        <div className="playback-loading preloader" />
      </div>
    )}

    <div className="">
      <div className="col-xs-9 col-sm-4 col-md-3 preview">
        <img src={preview} alt={title} />
        <div className="description">
          <p className="date">{date}</p>
          <p className="title">{title}</p>
        </div>
      </div>
      <div className="col-xs-4 col-sm-5 col-md-6 slider">
        <PlayerProgressBar
          playing={playing}
          progress={position}
          onChange={onSeek}
        />
        <div className="player-position-container">
          <span className="player-position">{realPos}</span>
        </div>
        <div className="player-duration-container">
          <span className="player-duration">{duration}</span>
        </div>
        {howler}
      </div>
      <div className="hidden-xs col-sm-2 col-md-2 volume">{volumeSlider}</div>
      <div className="col-xs-3 col-sm-1 col-md-1 pull-right button">
        <div className="close-player-button-wrapper">
          <button className="close-player-button" onClick={onClose}>
            <img src="https://s3.amazonaws.com/dataskeptic.com/img/svg/x.svg" />
          </button>
        </div>
        <TogglePlayButton playing={playing} onClick={onPlayToggle} />
      </div>
    </div>
  </div>
)

export default MiniPlayer
