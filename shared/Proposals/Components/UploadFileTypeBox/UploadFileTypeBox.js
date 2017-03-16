import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';

export const UploadFileTypeBox = ({onDrop}) => (
    <div>
        <Dropzone onDrop={onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
    </div>
);

UploadFileTypeBox.propTypes = {

};

export default UploadFileTypeBox;