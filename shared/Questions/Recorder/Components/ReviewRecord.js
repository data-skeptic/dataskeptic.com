import React from 'react'

const ReviewRecord = ({ key, isPaying, togglePaying }) => (
  <div>
    <div className="row">
      <div className="col-md-2">
        <button
          type={`button`}
          className={`initial-record-btn`}
          onClick={togglePaying}
        >
          {!isPaying ? (
            <img src={`/img/svg/play-arrow.svg`} className={`play-btn`} />
          ) : (
            <img src={`/img/svg/pause-button.svg`} className={`play-btn`} />
          )}
        </button>
      </div>
    </div>
  </div>
)
export default ReviewRecord
