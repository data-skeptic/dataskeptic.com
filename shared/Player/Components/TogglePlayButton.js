import React from 'react'
import classNames from 'classnames';

import PlayButton from './PlayButton'
import PauseButton from './PauseButton'

import Loading from '../../Common/Components/Loading'

export const TogglePlayButton = ({playing = false, disabled = false, onClick}) => {
    if (disabled) {
        return <Loading/>
    }

    return (
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
}

export default TogglePlayButton