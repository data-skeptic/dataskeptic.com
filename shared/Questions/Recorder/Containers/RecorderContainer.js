import React, { Component } from 'react'
import Wizard from '../../../Wizard'
import InitRecorder from '../Components/InitRecorder'
import LoadingRecorder from '../Components/LoadingRecorder'
import RecordingRecorder from '../Components/RecordingRecorder'
import ReviewRecord from '../Components/ReviewRecord'
import { steps } from '../../../Recorder'

class RecorderContainer extends Component {
  componentDidMount = () => {}
  tick = () => {
    this.setState({
      loadingTime: this.state.loadingTime + 1
    })
  }
  setActiveKey = key => {
    this.setState({ activeStep: key })
  }
  togglePaying = () => {
    this.setState({ isPaying: !this.state.isPaying })
  }
  goTo = key => {
    if (key === 'LOADING') {
      let timer = setInterval(this.tick, 1000)
      this.setState({ intervalTimer: timer })
    } else {
      clearInterval(this.state.intervalTimer)
      this.setState({ loadingTime: 0 })
    }
    this.setActiveKey(key)
  }

  constructor() {
    super()
    this.state = {
      steps: [],
      activeStep: 'INIT',
      loadingTime: 0,
      intervalTimer: '',
      isPaying: false
    }
  }

  componentWillUnmount() {
    // this.clearInterval(this.state.loadingTime);
  }

  render() {
    const { loadingTime, activeStep, isPaying } = this.state

    return (
      <div className="recorder-container">
        <section className={`test-buttons`}>
          <input type="text" value={activeStep} />
          <button type="button" onClick={() => this.goTo('INIT')}>
            INIT
          </button>
          <button type="button" onClick={() => this.goTo('LOADING')}>
            LOADING
          </button>
          <button type="button" onClick={() => this.goTo('RECORDING')}>
            RECORDING
          </button>
          <button type="button" onClick={() => this.goTo('VIEW_RECORD')}>
            VIEW_RECORD
          </button>
        </section>

        <Wizard activeKey={activeStep}>
          <InitRecorder key={'INIT'} />
          <LoadingRecorder key={`LOADING`} loadingTime={loadingTime} />
          <RecordingRecorder key={'RECORDING'} />
          <ReviewRecord
            key={`VIEW_RECORD`}
            isPaying={isPaying}
            togglePaying={this.togglePaying}
          />
        </Wizard>
      </div>
    )
  }
}

export default RecorderContainer
