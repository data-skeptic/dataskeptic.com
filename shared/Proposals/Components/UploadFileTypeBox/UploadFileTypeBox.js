import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';

import FilePreview from '../FilePreview/FilePreview';

import Debug from '../../../Debug';

const UploadFileTypeBox = ({onDrop, files}) => (
    <div className="upload-file-type-box">
        <Debug data={files} />

        <Dropzone onDrop={onDrop} className="dropzone" activeClassName="active">
            <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>

        <div className="upload-files-preview row">
            {files.map((file, index) => <FilePreview key={index} file={file}/>)}
        </div>
    </div>
);

UploadFileTypeBox.propTypes = {
    onDrop: PropTypes.func,
    files: PropTypes.array,
};

export default UploadFileTypeBox;