import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

const DEV_MODE = process.env.NODE_ENV !== 'production'

export class Debug extends Component {
  static propTypes = {
    data: PropTypes.any
  }

  constructor() {
    super()
    this.state = {
      open: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { data } = this.props
    const { open } = this.state

    if (!DEV_MODE) return <div> </div>

    return (
      <div
        className={classNames('panel panel-debug panel-default', {
          closed: !open
        })}
      >
        <div className="panel-heading" onClick={this.toggle}>
          <span>{!open ? 'Debug' : 'Close'}</span>
        </div>
        <div className="panel-body">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

export default Debug
