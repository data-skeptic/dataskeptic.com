import React from 'react'

import PlayButton from './PlayButton'
import PauseButton from './PauseButton'

export const TogglePlayButton = ({ playing=false }) => (
    <button className="player-btn">
        { playing
            ? <PlayButton playing={playing} />
            : <PauseButton playing={playing} />
        }
    </button>
)

export default TogglePlayButton