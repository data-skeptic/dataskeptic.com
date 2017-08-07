import React from 'react'
import ReactSlider from 'react-slider'

const VolumeBar = ({value = 90, onChange}) => (
    <ReactSlider
        withBars
        className={'volume-slider-container'}
        barClassName={'volume-slider-bar'}
        min={1}
        step={1}
        max={100}
        defaultValue={value}
        onChange={onChange}
    >
        <div className="volume-slider-howler"/>
    </ReactSlider>
)

export default VolumeBar