import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import Progress from './Progress'
import styled from 'styled-components'
import formatSeconds from './formatSeconds'

export default class Howler extends Component {
  setPosition = progress => {
    try {
      this.props.setPosition(progress)
      const position = progress * this.getDuration() / 100
      this.player.seek(position)
      this.setState({ progress: progress })
    } catch (e) {
      console.dir(e)
    }
  }
  loadCompleted = () => {
    const { position } = this.props
    this.player.seek(position)
    this.setState({
      loaded: true,
      interval: setInterval(this.updatePlayer, 1000)
    })
  }
  getSeek = () => this.player.seek()
  getCurrentTime = () => formatSeconds(this.getSeek())
  updatePlayer = () => {
    const currentPosition = this.getCurrentTime() || '00:00'
    const progress = this.getSeek() * 100 / this.getDuration() || 0

    this.setState({
      currentPosition: currentPosition,
      progress: progress.toFixed(2)
    })
  }
  end = () => alert('end')

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      currentPosition: formatSeconds(props.position) || '00:00',
      progress: 0,
      interval: null
    }
  }

  componentWillUnmount() {
    this.setPosition(this.getSeek())
    clearInterval(this.state.interval)
  }

  getDuration() {
    return this.player.duration()
  }

  getFormattedDuration() {
    return formatSeconds(this.getDuration())
  }

  render() {
    const { mp3, isPlaying } = this.props
    const { loaded, currentPosition, progress } = this.state
    return (
      <PlayerWrapper>
        <ReactHowler
          src={mp3}
          html5={true}
          playing={isPlaying}
          step={0.01}
          ref={ref => (this.player = ref)}
          onLoad={this.loadCompleted}
          onEnd={this.end}
          onLoadError={e => console.dir(e)}
          preload={true}
        />
        {loaded && (
          <PlayerData>
            <Time>{currentPosition}</Time>
            <Progress setPosition={this.setPosition} progress={progress} />
            <Time>{this.getFormattedDuration()}</Time>
          </PlayerData>
        )}
      </PlayerWrapper>
    )
  }
}

const PlayerWrapper = styled.div``
const PlayerData = styled.div`
  display: flex;
  align-items: center;
`
const Time = styled.div`
  padding: 0px 15px;
`
