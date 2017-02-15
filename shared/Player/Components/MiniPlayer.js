import React from 'react'

import PlayerProgressBar from '../Components/PlayerProgressBar'
import TogglePlayButton from '../Components/TogglePlayButton'

export const MiniPlayer = ({ realPos=0, playing = false, title='[No episode loaded yet]', date='', duration='--:--', position='--:--', onPlayToggle, howler}) => (
    <div className="thin-player-container">
        <div className="">
            <div className="col-xs-9 col-sm-4 col-md-3 preview">
                <img src="http://static.libsyn.com/p/assets/c/6/c/9/c6c96779218f4fb3/deep-learning.png"></img>
                <div className="description">
                    <p className="date">{date}</p>
                    <p className="title">{title}</p>
                </div>
            </div>
            <div className="col-sm-7 col-md-offset-1 col-md-6 slider">
                <PlayerProgressBar playing={playing} progress={position} />
                <div className="player-position-container"><span className="player-position">{realPos}</span></div>
                <div className="player-duration-container"><span className="player-duration">{duration}</span></div>
                {howler}
            </div>
            <div className="col-xs-3 col-sm-1 col-md-1 pull-right button">
                <TogglePlayButton playing={playing} onClick={onPlayToggle} />
            </div>
        </div>
    </div>
)

export default MiniPlayer