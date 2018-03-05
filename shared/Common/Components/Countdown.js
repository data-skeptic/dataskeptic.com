import React, { Component, PropTypes } from 'react'

import moment from 'moment'

export class Countdown extends Component {
  static propTypes = {
    onDeadlineReached: PropTypes.func
  }

  constructor() {
    super()

    this.state = {
      diff: '00:00:00:00'
    }

    this.tick = this.tick.bind(this)
  }

  tick() {
    if (!this.props.to) {
      this.stopTick()
      return
    }

    const now = moment(new Date())
    const end = moment(this.props.to || 0) // another date
    const diff = moment
      .utc(
        moment(end, 'DD/MM/YYYY HH:mm:ss').diff(
          moment(now, 'DD/MM/YYYY HH:mm:ss')
        )
      )
      .format('DD:HH:mm:ss')

    if (now > end) {
      this.stopTick()
      this.props.onDeadlineReached()
    } else {
      this.setState({ diff: diff })
    }
  }

  componentDidMount() {
    this.startTick()
  }

  componentWillReceiveProps(nextProps) {
    const diff = moment(nextProps.to).diff(moment(this.props.to))
    if (diff !== 0) {
      this.stopTick()
      this.startTick()
    }
  }

  startTick() {
    this.interval = setInterval(this.tick, 1000)
    this.tick()
  }

  stopTick() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    this.setState({
      diff: '00:00:00:00'
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  formatTime() {
    const { diff } = this.state
    return diff.toString().split(':')
  }

  render() {
    const [d, h, m, s] = this.formatTime()

    return (
      <div className="countdown">
        <div className="number days">
          <hr />
          {d}
        </div>
        <div className="number hours">
          <hr />
          {h}
        </div>
        <div className="number minutes">
          <hr />
          {m}
        </div>
        <div className="number seconds">
          <hr />
          {s}
        </div>
      </div>
    )
  }
}

export default Countdown
