import React, { Component } from 'react'

import VolumeBar from '../Components/VolumeBar'
import VolumeButton from '../Components/VolumeButton'

class VolumeBarContainer extends Component {
  constructor() {
    super()

    this.onVolumeBarChange = this.onVolumeBarChange.bind(this)
  }

  onVolumeBarChange(value) {
    const volume = value / 100

    this.props.onChange(volume)
  }

  toggleMute() {
    if (this.props.muted) {
      this.props.onUnmute()
    } else {
      this.props.onMute()
    }
  }

  render() {
    const { volume, muted } = this.props

    const value = volume * 100
    const isSilent = muted ? muted : volume <= 0.2
    return (
      <div className="volume-bar-container">
        <VolumeButton silent={isSilent} onClick={e => this.toggleMute()} />
        <VolumeBar onChange={this.onVolumeBarChange} value={value} />
      </div>
    )
  }
}

export default VolumeBarContainer
