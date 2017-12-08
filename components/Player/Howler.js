import React, {Component} from 'react'
import ReactHowler from 'react-howler'
import Progress from "./Progress";
import styled from 'styled-components'
import formatSeconds from './formatSeconds'
export default class Howler extends Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false,
      currentPosition: formatSeconds(props.position) || "00:00",
      progress: 0,
      interval: null
  
    }
  }
  
  setPosition = (progress) => {
    this.props.setPosition(progress)
  }
  
  componentWillUnmount() {
    this.setPosition(this.getSeek())
    clearInterval(this.state.interval)
  }
  
  loadCompleted = () => {
    const {position} = this.props
    this.player.seek(position)
    this.setState({
      loaded: true,
      interval: setInterval(this.updatePlayer, 1000)
    })
    
    
  }
 
  getSeek = () => this.player.seek();
  getCurrentTime = () => formatSeconds(this.getSeek());
  
  updatePlayer = () => {
    const currentPosition = this.getCurrentTime()
    const progress = this.getSeek() * 100 / this.getDuration()
    
    this.setState({
      currentPosition: currentPosition,
      progress: progress.toFixed(2)
    })
  }
  
  getDuration () {
    return this.player.duration()
  }
  getFormattedDuration () {
    return formatSeconds(this.getDuration())
  }
  
  render () {
    const {mp3, isPlaying} = this.props
    const {loaded, currentPosition, progress} = this.state;
    console.log(loaded)
    return (
      <PlayerWrapper>
     
            <ReactHowler
              src={mp3}
              html5={true}
              playing={isPlaying}
              ref={(ref) => (this.player = ref)}
              onLoad={this.loadCompleted}
            />
            {loaded &&
              <PlayerData>
                <Time>{currentPosition}</Time>
                <Progress progress={progress}/>
                <Time>{this.getFormattedDuration()}</Time>
              </PlayerData>}
            
            
    
      </PlayerWrapper>
    )
  }
}

const PlayerWrapper = styled.div`


`
const PlayerData = styled.div`
  display: flex;
  align-items: center;
`
const Time = styled.div`
  padding: 0px 15px;
`