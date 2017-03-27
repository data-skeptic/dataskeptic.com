import React from 'react'
import classNames from 'classnames';

import PlayButton from './PlayButton'
import PauseButton from './PauseButton'

export const TogglePlayButton = ({playing = false, disabled = false, onClick}) => (
    <button className={classNames('player-btn', {'disabled': disabled})} onClick={(e) => {
        e.preventDefault();
        if (disabled) return;
        onClick(e)
    }}>
        { playing
            ? <PauseButton />
            : <PlayButton />
        }
    </button>
);

export default TogglePlayButton