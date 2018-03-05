import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'

import FilePreview from '../FilePreview/FilePreview'

import Debug from '../../../Debug'

const UploadFileTypeBox = ({ onDrop, onRemove, files }) => (
  <div className="upload-file-type-box">
    <Dropzone onDrop={onDrop} className="dropzone" activeClassName="active">
      <div>
        Try dropping some files here, or click to select files to upload.
      </div>
    </Dropzone>

    <div className="upload-files-preview row">
      {files.map((file, index) => (
        <FilePreview
          key={index}
          file={file}
          onRemoveClick={e => {
            e.preventDefault()
            onRemove(index)
          }}
        />
      ))}
    </div>
  </div>
)

UploadFileTypeBox.propTypes = {
  onDrop: PropTypes.func,
  onRemove: PropTypes.func,
  files: PropTypes.array
}

export default UploadFileTypeBox
