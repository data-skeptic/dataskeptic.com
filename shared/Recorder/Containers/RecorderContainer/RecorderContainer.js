import React, { Component, PropTypes } from 'react'
import { v4 } from 'uuid'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'

import { START, UPLOAD, RESUME, STOP } from '../../Constants/actions'
import { float32ToInt16 } from '../../Helpers/Converter'

const INITIAL_CHUNK_ID_VAL = 0
const INITIAL_DURATION_VAL = '00:00:00'

import Recorder from '../../Components/Recorder/Recorder'
import RecordingTimeTracker from '../../Components/RecordingTimeTracker/RecordingTimeTracker'

export class RecorderContainer extends Component {
  static propTypes = {
    onReady: PropTypes.func,
    onRecording: PropTypes.func,
    onReview: PropTypes.func,
    onSubmitting: PropTypes.func,
    onComplete: PropTypes.func,
    onError: PropTypes.func
  }

  constructor() {
    super()

    this.state = {
      recordId: 'default',
      chunkId: INITIAL_CHUNK_ID_VAL,
      recording: false,
      duration: INITIAL_DURATION_VAL
    }

    this.togglePlaying = this.togglePlaying.bind(this)
    this.onChunkProcessing = this.onChunkProcessing.bind(this)

    this.startTimeCounter = this.startTimeCounter.bind(this)
    this.stopTimeCounter = this.stopTimeCounter.bind(this)
    this.updateDuration = this.updateDuration.bind(this)
  }

  componentWillUnmount() {
    this.stopRecording()
  }

  generateRandomRecordId() {
    return v4()
  }

  isInitialized() {
    return this.state.chunkId > INITIAL_CHUNK_ID_VAL
  }

  initializeRecorder() {
    const BinaryClient = require('binaryjs-client').BinaryClient
    const hostname = window.location.hostname
    this.client = new BinaryClient(`ws://${hostname}:9001`)

    this.client.on('open', () => {
      console.log('[Recording]', 'connection open')
      this.Stream = this.client.createStream({
        id: this.state.recordId,
        chunkId: this.state.chunkId
      })

      this.props.onReady()

      if (!navigator.getUserMedia) {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
      }

      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true }, this.onChunkProcessing, e => {
          this.handleError('Error capturing audio.')
        })
      } else {
        this.handleError('Audio recording is not supported in this browser.')
      }
    })

    this.client.on('error', () => {
      this.handleError('Server unreachable.')
    })
  }

  onChunkProcessing(stream) {
    this.setState({
      startedAt: new Date(),
      recording: true
    })

    this.props.onRecording()

    this.browserStream = stream
    const audioContext = window.AudioContext || window.webkitAudioContext
    const context = new audioContext()

    // the sample rate is in context.sampleRate
    let audioInput = context.createMediaStreamSource(stream)

    const bufferSize = 2048
    let recorder = context.createScriptProcessor(bufferSize, 1, 1)
    this.recorder = recorder
    this.startTimeCounter()

    recorder.onaudioprocess = e => {
      if (!this.state.recording) return

      const left = e.inputBuffer.getChannelData(0)
      this.uploadChunk(float32ToInt16(left))
    }

    audioInput.connect(recorder)
    recorder.connect(context.destination)
  }

  startTimeCounter() {
    this.timeCounter = setInterval(this.updateDuration, 1000)
  }

  stopTimeCounter() {
    if (this.timeCounter) {
      clearInterval(this.timeCounter)
      this.timeCounter = null
    }
  }

  updateDuration() {
    const then = this.state.startedAt
    const now = new Date()

    const duration = moment
      .utc(
        moment(now, 'DD/MM/YYYY HH:mm:ss').diff(
          moment(then, 'DD/MM/YYYY HH:mm:ss')
        )
      )
      .format('HH:mm:ss')

    this.setState({
      duration
    })
  }

  uploadChunk(convertedChunk) {
    this.Stream.write(convertedChunk)
  }

  resumeRecording() {
    this.startRecordingNextChunk()
  }

  startRecording() {
    this.setState({
      recordId: this.generateRandomRecordId()
    })

    if (!this.isInitialized()) {
      this.initializeRecorder()
    }
  }

  stopRecording() {
    this.stopTimeCounter()

    this.setState({
      recording: false,
      chunkId: INITIAL_CHUNK_ID_VAL,
      duration: INITIAL_DURATION_VAL
    })

    if (this.recorder) {
      this.recorder.disconnect()
    }

    if (this.client) {
      this.client.close()
    }

    if (this.browserStream) {
      this.stopStreams(this.browserStream)
    }

    this.props.onStop()
    this.recordingComplete()
  }

  recordingComplete() {
    const { id } = this.state

    // dummy
    this.setState({
      uploaded: true
    })

    if (this.props.recordingComplete) {
      this.props.recordingComplete(id)
    }

    this.props.onComplete(id)
  }

  stopStreams(stream) {
    for (let track of stream.getTracks()) {
      track.stop()
    }
  }

  startRecordingNextChunk() {
    const chunkId = this.state.chunkId + 1
    this.setState({ chunkId })
  }

  handleError(error) {
    this.props.onError(error)
    this.setState({ error: error })
  }

  togglePlaying() {
    const recording = this.state.recording

    if (recording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }
  }

  getInfoMessage() {
    if (!isEmpty(this.state.error)) return false

    if (this.state.recording) {
      return <RecordingTimeTracker duration={this.state.duration} />
    } else if (this.state.uploaded) {
      return (
        <div className="text-success">
          <i className="fa fa-check-circle" aria-hidden="true" /> Uploaded!
        </div>
      )
    }

    return (
      <div className="text-muted">
        Recording will start when you click the record button to the left of
        this message.{' '}
        <i>
          You will have a chance to review your recording before submitting.
        </i>
      </div>
    )
  }

  render() {
    const { recording, error, duration } = this.state

    return (
      <div className="recording-container">
        <Recorder
          recording={recording}
          error={error}
          startComponent={<i className="fa fa-microphone icon">&nbsp;</i>}
          stopComponent={<i className="fa fa-circle icon">&nbsp;</i>}
          onClick={this.togglePlaying}
          info={this.getInfoMessage()}
        />
      </div>
    )
  }
}

export default RecorderContainer
