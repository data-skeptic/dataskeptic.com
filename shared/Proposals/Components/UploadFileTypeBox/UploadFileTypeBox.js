import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';

import FilePreview from '../FilePreview/FilePreview';

const UploadFileTypeBox = ({wrapperClass='', multiple=true, onDrop, onRemove, files = []}) => (
    <div className={`upload-file-type-box ${wrapperClass}`}>
        <Dropzone onDrop={onDrop} className="dropzone" activeClassName="active" multiple={multiple}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>

        <div className="upload-files-preview row">
            {files.map((file, index) =>
                <FilePreview key={index} file={file} onRemoveClick={(e) => {
                    e.preventDefault();
                    onRemove(index);
                }}
                />
            )}
        </div>
    </div>
);

UploadFileTypeBox.propTypes = {
    onDrop: PropTypes.func,
    onRemove: PropTypes.func,
    files: PropTypes.array,
};

export default UploadFileTypeBox;