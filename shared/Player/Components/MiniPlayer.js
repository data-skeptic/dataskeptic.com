import React from 'react'

import PlayerProgressBar from '../Components/PlayerProgressBar'
import TogglePlayButton from '../Components/TogglePlayButton'

export const MiniPlayer = ({ realPos=0, playing = false, preview, title='[No episode loaded yet]', date='', duration='--:--', position='--:--', onPlayToggle, howler, volumeSlider}) => (
    <div className="thin-player-container">
        <div className="">
            <div className="col-md-3 preview">
                <img src={preview} alt={title}/>
                <div className="description">
                    <p className="date">{date}</p>
                    <p className="title">{title}</p>
                </div>
            </div>
            <div className="col-md-6 slider">
                <PlayerProgressBar playing={playing} progress={position} />
                <div className="player-position-container"><span className="player-position">{realPos}</span></div>
                <div className="player-duration-container"><span className="player-duration">{duration}</span></div>
                {howler}
            </div>
            <div className="col-md-2 volume">
                {volumeSlider}
            </div>
            <div className="col-xs-3 col-sm-1 col-md-1 pull-right button">
                <TogglePlayButton playing={playing} onClick={onPlayToggle} />
            </div>
        </div>
    </div>
)

export default MiniPlayer