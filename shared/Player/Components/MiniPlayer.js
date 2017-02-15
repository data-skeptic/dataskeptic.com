import React from 'react'

import PlayerProgressBar from '../Components/PlayerProgressBar'
import TogglePlayButton from '../Components/TogglePlayButton'

export const MiniPlayer = ({ playing = false, episode = {}, title, date, duration, position, playSymb, onPlayToggle, howler}) => (
    <div className="thin-player-container">
        <div className="">
            <div className="col-xs-9 col-sm-4 col-md-3 preview">
                <img src="http://static.libsyn.com/p/assets/c/6/c/9/c6c96779218f4fb3/deep-learning.png"></img>
                <div className="description">
                    <p className="date">November 11, 2016</p>
                    <p className="title">Unstructured Data for Finance</p>
                </div>
            </div>
            <div className="col-sm-7 col-md-offset-1 col-md-6 slider hidden-xs">
                {position}
                <PlayerProgressBar playing={playing} progress={position} />
                <div className="player-duration-container"><span className="player-duration">{duration}</span></div>
                {howler}
            </div>
            <div className="col-xs-3 col-sm-1 col-md-1 pull-right button">
                <TogglePlayButton playing={playing} />
            </div>
        </div>
    </div>
)
//
// <div className="player" className="thin-player">
//     <div className="player-inner">
//     <button className="episode-button-sm" onClick={onPlayToggle}>{playSymb}</button>
// <div className="player-title-container"><span className="player-title">{title}</span></div>
//
// </div>
// </div>

export default MiniPlayer