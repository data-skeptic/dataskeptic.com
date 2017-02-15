import React from 'react'

import PlayButton from './PlayButton'
import PauseButton from './PauseButton'

export const TogglePlayButton = ({ playing=false, onClick }) => (
    <button className="player-btn" onClick={onClick}>
        { playing
            ? <PauseButton />
            : <PlayButton />
        }
    </button>
)

export default TogglePlayButton