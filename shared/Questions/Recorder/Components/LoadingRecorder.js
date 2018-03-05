import React from 'react'

const LoadingRecorder = ({ key, loadingTime }) => (
  <div key={key}>
    <div className="row">
      <div className="col-md-2">
        <button type={`button`} className={`initial-record-btn`}>
          {loadingTime}
        </button>
      </div>
    </div>
  </div>
)
export default LoadingRecorder
