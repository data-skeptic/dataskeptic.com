import React from 'react'

const RecordingRecorder = ({ key }) => (
  <div key={key}>
    <div className="row">
      <div className="col-md-2">
        <button type={`button`} className={`initial-record-btn`}>
          <div className={`stop-btn`} />
        </button>
        <div className="time">00:00:00</div>
      </div>
      <div className="col-md-10">
        <div className={`wave-container`} />
      </div>
    </div>
  </div>
)
export default RecordingRecorder
