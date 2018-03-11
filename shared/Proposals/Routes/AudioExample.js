import React, { Component } from 'react'
import AudioVolumeIndicator from '../../components/AudioVolumeIndicator'

class AudioExamplePage extends Component {
  static getPageMeta() {
    return {
      title: 'AudioExamplePage | Data Skeptic'
    }
  }

  render() {
    return (
      <div className="thank-you">
        <audio
          id="v"
          controls
          crossOrigin="anonymous"
          src="http://traffic.libsyn.com/dataskeptic/the-agent-model-of-intelligence.mp3?dest-id=201630"
        />

        <hr />

        <AudioVolumeIndicator
          audioId={'v'}
          width={600}
          height={350}
          barSpace={2}
          barWidth={10}
          capHeight={4}
        />
      </div>
    )
  }
}

export default AudioExamplePage
