import React, { PropTypes } from 'react'

const FilePreview = ({ file, onRemoveClick }) => (
  <div className="upload-file-item-box col-xs-6 col-md-3">
    <div className="thumbnail">
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={onRemoveClick}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <img src={file.preview} />
    </div>
  </div>
)

FilePreview.propTypes = {
  onRemoveClick: PropTypes.func
}

export default FilePreview
