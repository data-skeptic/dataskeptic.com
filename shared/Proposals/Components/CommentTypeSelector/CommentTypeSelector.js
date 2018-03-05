import React, { PropTypes } from 'react'
import classNames from 'classnames'

import { TEXT, UPLOAD, RECORDING } from '../../Constants/CommentTypes'

export const CommentTypeSelector = ({ active, onChoose }) => (
  <div className="comment-type-selector">
    <div className="btn-group btn-group-justified" role="group">
      <div className="btn-group" role="group">
        <div
          type="button"
          className={classNames('btn btn-default btn-type', {
            active: active === TEXT
          })}
          onClick={e => onChoose(TEXT, e)}
        >
          <div className="description">
            <h4 className="title">Comment</h4>
            <p className="subtitle">Post a few words</p>
          </div>
          <div className="icon icon-keyboard"> </div>
        </div>
      </div>
      <div className="btn-group" role="group">
        <div
          type="button"
          className={classNames('btn btn-default btn-type', {
            active: active === UPLOAD
          })}
          onClick={e => onChoose(UPLOAD, e)}
        >
          <div className="description">
            <div className="description">
              <h4 className="title">Upload</h4>
              <p className="subtitle">Drag or drop file</p>
            </div>
          </div>
          <div className="icon icon-upload"> </div>
        </div>
      </div>
      <div className="btn-group" role="group">
        <div
          type="button"
          className={classNames('btn btn-default btn-type', {
            active: active === RECORDING
          })}
          onClick={e => onChoose(RECORDING, e)}
        >
          <div className="description">
            <h4 className="title">Audio Comment</h4>
            <p className="subtitle">Record via microphone</p>
          </div>
          <div className="icon icon-record"> </div>
        </div>
      </div>
    </div>
  </div>
)

CommentTypeSelector.propTypes = {
  active: PropTypes.string,
  onChoose: PropTypes.func
}

export default CommentTypeSelector
