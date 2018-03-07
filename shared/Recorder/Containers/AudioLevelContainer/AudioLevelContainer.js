import React, { Component } from 'react'

import AudioLevel from '../../Components/AudioLevel/AudioLevel'
import AudioBar from '../../Components/AudioBar/AudioBar'

export class AudioLevelContainer extends Component {
  static propTypes = {}

  constructor() {
    super()
  }

  initBars(count = 1) {
    let bars = []
    for (let i = 0; i < count; i++) {
      bars.push(<AudioBar />)
    }

    return bars
  }

  render() {
    const { count } = this.props
    const bars = this.initBars(count)

    return (
      <div className="audio-level-container">
        <AudioLevel>{bars}</AudioLevel>
      </div>
    )
  }
}

export default AudioLevelContainer
