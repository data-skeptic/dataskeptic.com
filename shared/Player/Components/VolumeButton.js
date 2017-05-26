import React from 'react'

const VolumeButton = ({silent = false, onClick}) => (
    <button onClick={onClick} className="volume-button pull-left">
        <div className={'volume-icon ' + (silent ? 'off' : 'on')}/>
    </button>
)

export default VolumeButton