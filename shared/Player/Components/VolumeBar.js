import React from 'react'
import ReactSlider from 'react-slider'

const VolumeBar = ({volume = 90}) => (
    <ReactSlider
        withBars
        className={'volume-slider-container'}
        barClassName={'volume-slider-bar'}
    >
        <div className="volume-slider-howler"/>
    </ReactSlider>
)

export default VolumeBar