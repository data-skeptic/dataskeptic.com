import React, { PropTypes } from 'react'
import classNames from 'classnames'

export const Recorder = ({
  recording = false,
  error,
  info,
  onClick,
  startComponent = 'Start',
  stopComponent = 'Stop'
}) => (
  <div className="recorder">
    <div className="row">
      <button
        className={classNames('btn btn-default btn-recorder', {
          recording: recording
        })}
        type="button"
        onClick={onClick}
      >
        {recording ? stopComponent : startComponent}
      </button>

      <div className="messages">
        {info ? <div className="info">{info}</div> : null}

        {error ? <div className="text-danger">{error}</div> : null}
      </div>
    </div>
  </div>
)

Recorder.propTypes = {
  recording: PropTypes.bool,
  error: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onClick: PropTypes.func,

  startComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  stopComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}

export default Recorder
